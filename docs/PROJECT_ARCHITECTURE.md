# 🏗️ VGOIRE-APP - Documentação Técnica Completa

**Última atualização:** 30 de Março de 2026  
**Status:** ✅ Production Ready  
**Stack:** React 19 + TypeScript + Vite + React Router + Tailwind CSS

---

## 📑 Índice

1. [Visão Geral](#visão-geral)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estrutura de Pastas](#estrutura-de-pastas)
4. [Componentes Principais](#componentes-principais)
5. [Sistema de Rotas](#sistema-de-rotas)
6. [Fluxo de Dados](#fluxo-de-dados)
7. [Configurações e Constantes](#configurações-e-constantes)
8. [Como Rodar](#como-rodar)
9. [Padrões de Código](#padrões-de-código)
10. [Guia para Contribuir](#guia-para-contribuir)

---

## 👁️ Visão Geral

**VGOIRE-APP** é uma aplicação web de soluções globais premium que oferece:

- 🌐 **Traduções Juramentadas** (16+ idiomas)
- 🧳 **Planejamento de Viagens** (voos, hotéis, carros, cruzeiros)
- 📚 **Educação** (Aulas de inglês/espanhol, preparação para exames)
- 📺 **Legendagem** (Inglês, Espanhol, Português)

**Tipo:** Single Page Application (SPA)  
**Deploy:** GitHub Pages, Vercel, Netlify  
**Acesso:** https://vgoire.github.io/VGOIRE-APP/

---

## 🛠️ Stack Tecnológico

### **Frontend**
| Tecnologia | Versão | Propósito |
|------------|--------|----------|
| React | 19.0.0 | UI Framework |
| TypeScript | ~5.8.2 | Type Safety |
| Vite | 6.2.0 | Build Tool & Dev Server |
| React Router | 7.13.2 | Roteamento SPA |
| Tailwind CSS | 4.1.14 | Styling |
| Motion | 12.23.24 | Animações |
| Lucide React | 0.546.0 | Ícones |

### **Dependências Externas**
| Biblioteca | Versão | Propósito |
|-----------|--------|----------|
| Firebase | 12.9.0 | Backend (opcional) |
| Google GenAI | 1.29.0 | IA (opcional) |

### **DevDependencies**
- ESLint (linting)
- TypeScript (compilação)
- Autoprefixer (CSS)

---

## 📁 Estrutura de Pastas

```
VGOIRE-APP/
│
├── public/                    # Arquivos estáticos
│   └── manifest.json         # Metadados da app
│
├── src/
│   ├── App.tsx               # Componente raiz com rotas
│   ├── main.tsx              # Entrada da aplicação
│   ├── index.css             # Estilos globais
│   ├── constants.ts          # Configurações e dados
│   │
│   └── [Componentes em App.tsx]
│       ├── LanguageSelector  # Seletor de idioma
│       ├── SplashScreen      # Animação inicial
│       ├── ServiceCard       # Card do serviço
│       ├── ServiceDetail     # Página de detalhes
│       ├── Home              # Página inicial
│       └── ServicePage       # Rota de detalhes
│
├── docs/
│   ├── REFACTORING_SUMMARY.md    # Resumo de mudanças
│   └── PROJECT_ARCHITECTURE.md   # Este arquivo
│
├── .env.example              # Variáveis de exemplo
├── .gitignore               # Git ignore
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── tailwind.config.ts       # Configuração Tailwind
├── index.html               # HTML raiz
├── README.md                # Documentação geral
│
└── faq_data.json            # Dados de FAQ
```

---

## 🧩 Componentes Principais

### **Hierarquia de Componentes**

```
App (Routes)
├── Home (/)
│   ├── SplashScreen
│   ├── LanguageSelector
│   ├── ServiceCard (×6 serviços)
│   └── Modal de Privacidade
│
└── ServicePage (/service/:id)
    └── ServiceDetail
        ├── Botão Voltar Fixo
        ├── LanguageSelector
        └── Conteúdo Detalhado
```

### **1. App.tsx - Componente Raiz**

**Responsabilidade:** Gerenciar rotas e estado global

```tsx
- Routes (/)
- Routes (/service/:id)
- Routes (*) → fallback
- State: lang, showSplash
```

**Exports:**
- `App` (default export)
- `Home` (componente)
- `ServicePage` (componente)
- `ServiceDetail` (componente)
- `ServiceCard` (componente)
- `SplashScreen` (componente)
- `LanguageSelector` (componente)

### **2. LanguageSelector**

**Props:**
```tsx
{
  currentLang: Language;      // idioma atual
  onSelect: (lang: Language) => void;  // callback
}
```

**Funcionalidades:**
- Dropdown com 18 idiomas
- Suporte RTL (árabe, hebraico)
- Click-outside para fechar
- Animação Motion

### **3. SplashScreen**

**Props:**
```tsx
{
  onComplete: () => void;     // callback ao terminar
  lang: Language;             // idioma
}
```

**Comportamento:**
- Animação de 2.5 segundos
- Logo + texto de tagline
- Apenas aparece na primeira visita (estado global)

### **4. ServiceCard**

**Props:**
```tsx
{
  service: Service;           // dados do serviço
  lang: Language;             // idioma atual
  onClick: () => void;        // ao clicar
}
```

**Funcionalidades:**
- Cards responsivos (grid 1 col mobile, 2 col tablet, 3 col desktop)
- Alguns cards ocupam mais espaço (google_rates, vgoire_videos)
- Hover animations
- ID único: `service-card-{id}`

### **5. ServiceDetail**

**Props:**
```tsx
{
  service: Service;
  lang: Language;
  onBack: () => void;
  onLangChange: (lang: Language) => void;
}
```

**Componentes Internos:**
- Botão voltar fixo no topo
- Header com imagem
- Descrição
- Gallery (slides)
- Partners
- FAQ
- Botão WhatsApp
- Botão de plataforma externa

### **6. Home**

**Props:**
```tsx
{
  lang: Language;
  setLang: (lang: Language) => void;
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
}
```

**Funcionalidades:**
- Navegação sticky
- Header com branding
- Grid de serviços
- Footer
- Modal de privacidade
- **Restauração de scroll por ID**

### **7. ServicePage**

**Props:**
```tsx
{
  lang: Language;
  setLang: (lang: Language) => void;
}
```

**Funcionalidades:**
- Extrai `:id` da URL
- Busca serviço no array
- Renderiza `ServiceDetail`
- Fallback para home se inválido

---

## 🛣️ Sistema de Rotas

### **Rotas Implementadas**

```
GET /
  → Home (/src/App.tsx)
  → Lista de 6 serviços
  → Splash screen na primeira visita

GET /service/:id
  → ServicePage (/src/App.tsx)
  → Detalhes do serviço específico
  → Exemplo: /service/google_rates

GET * (qualquer outra)
  → Navigate to /
  → Fallback para home
```

### **Componentes Envolvidos**

```tsx
<BrowserRouter>               // src/main.tsx
  <App>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/service/:id" element={<ServicePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </App>
</BrowserRouter>
```

### **Navegação Programática**

```tsx
// Navegar para serviço
const navigate = useNavigate();
navigate(`/service/${service.id}`);

// Voltar para home
navigate('/');

// Com replace (não adiciona histórico)
navigate('/', { replace: true });
```

---

## 📊 Fluxo de Dados

### **Diagrama de Fluxo**

```
┌─────────────────┐
│   App (Raiz)    │
│  - lang         │
│  - showSplash   │
└────────┬────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
┌─────────┐  ┌──────────────┐
│  Home   │  │ ServicePage  │
│ - Rota  │  │   - Rota     │
│   /     │  │  /service/:id│
└────┬────┘  └──────┬───────┘
     │               │
     ▼               ▼
┌────────────┐  ┌──────────────┐
│ Cards Grid │  │ServiceDetail │
│ onClick    │  │  - Detalhes  │
│  Save ID   │  │  - Voltar    │
└────────────┘  └──────────────┘
     │               │
     │ localStorage  │ navigate('/')
     │ "lastServiceId"
     │
     └───────────────┘
          │
     scrollIntoView()
```

### **Fluxo de Scroll Inteligente**

```
1. PÁGINA INICIAL (Home)
   - Usuário scrolls para baixo
   - Todos os cards têm id="service-card-{id}"

2. CLIQUE EM CARD
   - onClick() handler
   - localStorage.setItem('lastServiceId', service.id)
   - navigate(`/service/${service.id}`)

3. NAVEGAR PARA DETALHES (ServicePage)
   - Mostra ServiceDetail
   - Botão voltar fixo no topo

4. APERTAR VOLTAR
   - handleBack() → navigate('/')
   - Volta para Home

5. HOME RENDERIZA DE NOVO
   - useEffect verifica localStorage
   - Se lastServiceId existe:
     - Encontra elemento: document.getElementById(`service-card-${id}`)
     - element.scrollIntoView({ behavior: 'smooth', block: 'center' })
     - localStorage.removeItem('lastServiceId')
```

### **Fluxo de Estado de Idioma**

```
Home recebe: lang, setLang (como props)
  ↓
LanguageSelector onSelect
  ↓
setLang(selected) → Atualiza App state
  ↓
Todos componentes recebem novo lang
  ↓
UI_STRINGS[lang] → Renders novo idioma
```

### **Fluxo de Splash Screen**

```
App Initial Load
  ↓
showSplash = true (estado global)
  ↓
Home renderiza SplashScreen
  ↓
2.5 segundos passam
  ↓
SplashScreen onComplete()
  ↓
setShowSplash(false)
  ↓
Home renderiza HomePage (sem splash)
  ↓
Usuárionavega e volta
  ↓
showSplash ainda é false
  ↓
Não renderiza splash novamente ✅
```

---

## ⚙️ Configurações e Constantes

### **src/constants.ts**

#### **Types**

```tsx
type Language = 'en' | 'es' | 'pt' | 'zh' | 'he' | 'ar' | ... (18 total)

interface Service {
  id: string;                    // Identificador único
  icon: LucideIcon;             // Ícone Lucide
  image: string;                // URL imagem
  externalPlatformLink?: string; // Link externo (opcional)
  slides?: string[];             // Galeria de imagens
  videos?: string[];             // Vídeos (opcional)
  partners?: {                   // Parceiros (opcional)
    name: string;
    image: string;
  }[];
  faqItems?: {                   // FAQ (opcional)
    question: string;
    answer: string;
  }[];
  translations: Record<Language, {
    title: string;
    description: string;
    faqItems?: { question: string; answer: string }[];
  }>;
}
```

#### **Constantes**

```tsx
// WhatsApp
WHATSAPP_NUMBER = "5569981232697"
WHATSAPP_BASE_URL = "https://wa.me/{number}"

// URLs Externas
TRAVEL_PLATFORM_URL
OFFICIAL_WEBSITE_URL = "https://tevgoire.com.br/"

// Idiomas (18 total)
LANGUAGES = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  // ... mais 16 idiomas
]

// Strings UI (em cada idioma)
UI_STRINGS[lang] = {
  tagline: string;
  visitWebsite: string;
  privacyPolicy: string;
  // ... mais strings
}

// Serviços (array principal)
SERVICES: Service[] = [
  {
    id: 'google_rates',
    // dados do serviço
  },
  // ... 6 serviços total
]
```

### **Variáveis de Ambiente**

```bash
# .env.example
VITE_GEMINI_API_KEY=your_key_here
VITE_FIREBASE_PROJECT_ID=...
```

---

## 🚀 Como Rodar

### **Prérequitos**

- Node.js 16+
- npm ou yarn

### **Instalação**

```bash
# 1. Clone o repositório
git clone https://github.com/vgoire/VGOIRE-APP.git
cd VGOIRE-APP

# 2. Instale dependências
npm install

# 3. (Opcional) Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas chaves
```

### **Desenvolvimento**

```bash
# Inicia dev server com HMR (Hot Module Reload)
npm run dev

# Acessa em http://localhost:5173
```

### **Build para Produção**

```bash
# Cria build otimizado em /dist
npm run build

# Testa build localmente
npm run preview
```

### **Linting**

```bash
# Verifica erros TypeScript
npm run lint
```

---

## 📐 Padrões de Código

### **Componentes Funcionais com Hooks**

```tsx
// ✅ Padrão usado
import { useState, useEffect } from 'react';

const MyComponent = ({ prop }: { prop: string }) => {
  const [state, setState] = useState('initial');
  
  useEffect(() => {
    // Side effects aqui
  }, [dependency]);
  
  return <div>{state}</div>;
};
```

### **TypeScript Types**

```tsx
// ✅ Props bem tipadas
interface ComponentProps {
  label: string;
  onClick: () => void;
  items: Item[];
}

const Component: React.FC<ComponentProps> = ({ label, onClick, items }) => {
  // Implementation
};

// ✅ Ou com arrow function type
const Component = ({ label, onClick }: {
  label: string;
  onClick: () => void;
}) => {
  // Implementation
};
```

### **Tailwind CSS**

```tsx
// ✅ Classes Tailwind (não inline styles)
<button className="bg-vgoire-gold hover:brightness-110 active:scale-95 px-4 py-2 rounded-full transition-all">
  Click me
</button>

// ✅ Componentes customizados em index.css
.gold-button {
  @apply bg-gradient-to-r from-[#D4AF37] via-[#F9E29C] to-[#D4AF37] text-vgoire-blue font-bold py-3 px-6 rounded-full transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-vgoire-gold/30 border border-vgoire-gold/50 uppercase tracking-wider;
}
```

### **Animações Motion**

```tsx
// ✅ Motion para animações suaves
import { motion, AnimatePresence } from 'motion/react';

<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 1.05 }}
  transition={{ duration: 0.3 }}
>
  Conteúdo animado
</motion.div>

// ✅ AnimatePresence para animações ao montar/desmontar
<AnimatePresence mode="wait">
  {condition ? <Component /> : <OtherComponent />}
</AnimatePresence>
```

### **Condicionais**

```tsx
// ✅ Ternário simples
{isLoading ? <Spinner /> : <Content />}

// ✅ Lógica complexa em componente separado
{renderContent()}

// ✅ Conditional rendering
{items.length > 0 && <ItemList items={items} />}
```

### **Iterações**

```tsx
// ✅ Sempre use key prop e função de callback
{items.map((item, idx) => (
  <div key={item.id} onClick={() => handleClick(item.id)}>
    {item.name}
  </div>
))}
```

---

## 🔧 Guia para Contribuir

### **Adicionar um Novo Serviço**

**Passo 1:** Adicionale em `src/constants.ts`

```tsx
const SERVICES: Service[] = [
  // ... serviços existentes
  {
    id: 'novo_servico',        // ID único, sem espaços
    icon: IconeDeLucide,        // Ícone Lucide React
    image: 'url_imagem.jpg',
    externalPlatformLink: 'https://...',
    slides: ['url1', 'url2'],
    translations: {
      en: {
        title: 'Service Title',
        description: 'Service description...'
      },
      es: {
        title: 'Título del servicio',
        description: 'Descripción del servicio...'
      },
      // ... outros idiomas
    }
  }
];
```

**Passo 2:** Atualizar todos os idiomas em `UI_STRINGS`

```tsx
export const UI_STRINGS: Record<Language, any> = {
  en: { /* ... */ },
  es: { /* ... */ },
  // ... todos 18 idiomas
};
```

**Passo 3:** Teste localmente com `npm run dev`

### **Adicionar um Novo Idioma**

**Passo 1:** Adicione em `Language` type

```tsx
type Language = 'en' | 'es' | ... | 'novo_idioma';
```

**Passo 2:** Adicione em `LANGUAGES` array

```tsx
LANGUAGES.push({
  code: 'novo_idioma',
  name: 'Nome do Idioma',
  dir: 'ltr' // ou 'rtl' para árabe, hebraico, persa
});
```

**Passo 3:** Adicione traduções em `UI_STRINGS`

```tsx
UI_STRINGS['novo_idioma'] = {
  tagline: 'Tradução',
  privatePolicy: 'Tradução',
  // ... todas as strings
};
```

**Passo 4:** Adicione traduções em todos `Service.translations`

```tsx
SERVICES.forEach(service => {
  service.translations['novo_idioma'] = {
    title: 'Tradução',
    description: 'Tradução',
    // ...
  };
});
```

### **Modificar a Home (página inicial)**

**Localização:** `src/App.tsx` → `Home` component

**Estrutura:**
- Splash screen
- Navbar sticky
- Header com logo
- Grid de cards
- Footer
- Modal de privacidade

### **Modificar ServiceDetail (página de serviço)**

**Localização:** `src/App.tsx` → `ServiceDetail` component

**Estrutura:**
- Botão voltar fixo
- Header com imagem
- Descrição
- Slides/galeria
- Partners
- FAQ
- Botões de ação (WhatsApp, plataforma externa)

### **Verificar Tipos**

```bash
npm run lint
```

Se houver erros, o TypeScript os apontará.

### **Commit Message**

```
feat: Descrever a feature adicionada
fix: Corrigir um bug
docs: Atualizar documentação
style: Mudar estilos
refactor: Refatorar código
chore: Atualizações de dependencies
```

---

## 🎨 Cores Padrão

```css
/* Tailwind Config */
--color-vgoire-blue: #001F3F    /* Azul escuro */
--color-vgoire-gold: #D4AF37    /* Ouro */
--color-vgoire-green: #39FF14   /* Verde neon */
```

---

## 🔐 Segurança

- ✅ URLs sanitizadas com `rel="noopener noreferrer"` para links externos
- ✅ TypeScript para type safety
- ✅ ESC keys para fechar modals
- ✅ Click-outside para fechar dropdowns

---

## 📱 Responsividade

**Breakpoints Tailwind:**
- `mobile`: < 640px (sm)
- `tablet`: 640px - 1024px (md)
- `desktop`: > 1024px (lg)

**Grid de Cards:**
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3 colunas

---

## 🚢 Deploy

### **GitHub Pages**
```bash
npm run build
# Push para branch gh-pages
```

### **Vercel**
```bash
vercel
```

### **Netlify**
```bash
npm run build
# Deploy /dist folder
```

---

## 📚 Recursos Úteis

- **React Docs:** https://react.dev
- **TypeScript Docs:** https://www.typescriptlang.org
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Motion (Framer):** https://motion.dev
- **Lucide Icons:** https://lucide.dev

---

## ❓ FAQ do Projeto

### **Onde estão os componentes?**
Todos os componentes estão em `src/App.tsx` (arquivo único com múltiplos componentes).

### **Como adicionar uma página nova?**
Crie um novo componente no `App.tsx` e adicione uma rota em `<Routes>`.

### **Como compartilhar um link direto para um serviço?**
URL: `https://vgoire.github.io/VGOIRE-APP/#/service/google_rates`

### **Qual é o motivo da state global de splash?**
Para que não repita ao voltar entre páginas (melhor UX).

### **Por que usar ID para scroll?**
Mais confiável que salvar posição Y, funciona mesmo se layout mudar.

---

## 📞 Contato

**Website:** https://tevgoire.com.br/  
**WhatsApp:** https://wa.me/5569981232697  
**Play Store:** TBD  

---

**Documentação completa e sempre atualizada! 🚀**
