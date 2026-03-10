import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs/promises";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, "public", "videos");
    if (!existsSync(uploadDir)) {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure public/videos exists for static serving
  const videosDir = path.join(__dirname, "public", "videos");
  if (!existsSync(videosDir)) {
    await fs.mkdir(videosDir, { recursive: true });
  }

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "VGOIRE Server is healthy" });
  });

  app.get("/api/videos", async (req, res) => {
    try {
      const serviceId = req.query.serviceId as string;
      const dataPath = path.join(__dirname, "videos_data.json");
      if (!existsSync(dataPath)) return res.json([]);
      
      const data = await fs.readFile(dataPath, "utf-8");
      const videosObj = JSON.parse(data);
      res.json(videosObj[serviceId] || []);
    } catch (error) {
      res.json([]);
    }
  });

  app.post("/api/videos/upload", upload.single("video"), async (req, res) => {
    try {
      if (!(req as any).file) return res.status(400).json({ error: "No file uploaded" });
      const { serviceId } = req.body;
      const videoUrl = `/videos/${(req as any).file.filename}`;
      
      const dataPath = path.join(__dirname, "videos_data.json");
      let videosObj = {};
      if (existsSync(dataPath)) {
        const data = await fs.readFile(dataPath, "utf-8");
        videosObj = JSON.parse(data);
      }
      
      if (!videosObj[serviceId]) videosObj[serviceId] = [];
      videosObj[serviceId].push(videoUrl);
      
      await fs.writeFile(dataPath, JSON.stringify(videosObj, null, 2));
      res.json({ success: true, url: videoUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to upload video" });
    }
  });

  app.post("/api/videos/delete", express.json(), async (req, res) => {
    try {
      const { serviceId, videoUrl } = req.body;
      const dataPath = path.join(__dirname, "videos_data.json");
      if (!existsSync(dataPath)) return res.status(404).json({ error: "No videos found" });
      
      const data = await fs.readFile(dataPath, "utf-8");
      const videosObj = JSON.parse(data);
      
      if (videosObj[serviceId]) {
        videosObj[serviceId] = videosObj[serviceId].filter((url: string) => url !== videoUrl);
        await fs.writeFile(dataPath, JSON.stringify(videosObj, null, 2));
        
        // Optionally delete the file from disk
        const fileName = videoUrl.split("/").pop();
        const filePath = path.join(__dirname, "public", "videos", fileName);
        if (existsSync(filePath)) {
          await fs.unlink(filePath);
        }
      }
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  app.post("/api/videos/url", express.json(), async (req, res) => {
    try {
      const { serviceId, videoUrl } = req.body;
      const dataPath = path.join(__dirname, "videos_data.json");
      let videosObj = {};
      if (existsSync(dataPath)) {
        const data = await fs.readFile(dataPath, "utf-8");
        videosObj = JSON.parse(data);
      }
      
      if (!videosObj[serviceId]) videosObj[serviceId] = [];
      videosObj[serviceId].push(videoUrl);
      
      await fs.writeFile(dataPath, JSON.stringify(videosObj, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to add video URL" });
    }
  });

  app.get("/api/faq", async (req, res) => {
    try {
      const lang = (req.query.lang as string) || "en";
      const fs = await import("fs/promises");
      const data = await fs.readFile(path.join(__dirname, "faq_data.json"), "utf-8");
      const faqObj = JSON.parse(data);
      res.json(faqObj[lang] || faqObj["en"] || []);
    } catch (error) {
      res.json([]);
    }
  });

  app.post("/api/faq", express.json({ limit: '10mb' }), async (req, res) => {
    try {
      const { lang, items, allTranslations } = req.body;
      const fs = await import("fs/promises");
      const filePath = path.join(__dirname, "faq_data.json");
      
      let faqObj = {};
      try {
        const data = await fs.readFile(filePath, "utf-8");
        faqObj = JSON.parse(data);
      } catch (e) {
        // File might not exist yet
      }

      if (allTranslations) {
        faqObj = allTranslations;
      } else if (lang && items) {
        faqObj[lang] = items;
      } else {
        // Fallback for old structure
        faqObj["en"] = req.body;
      }

      await fs.writeFile(filePath, JSON.stringify(faqObj, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to save FAQ data" });
    }
  });

  // Serve uploaded videos statically
  app.use("/videos", express.static(path.join(__dirname, "public", "videos")));

  if (process.env.NODE_ENV === "production") {
    // Serve static files from the dist directory
    app.use(express.static(path.join(__dirname, "dist")));

    // Handle SPA routing: serve index.html for all non-API routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  } else {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
