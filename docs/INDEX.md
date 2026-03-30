# 📖 Documentação - VGOIRE-APP

**Bem-vindo à documentação técnica do VGOIRE-APP!**

Este diretório contém toda a documentação do projeto. Escolha o documento mais adequado para seu caso:

---

## 📚 Documentos Disponíveis

### 1. **AI_QUICK_GUIDE.md** 🤖
**Para:** Agentes de IA, leitura rápida, primeiros passos

- ⚡ Resumo em 2 minutos
- 📂 Arquivos importantes
- 🎯 Componentes principais
- 🔄 Fluxo principal
- ❓ FAQ para IA
- 🔍 Debugging rápido

**Tempo de leitura:** 5-10 min  
**Ideal para:** Primeira visita, entender rápido

---

### 2. **PROJECT_ARCHITECTURE.md** 🏗️
**Para:** Desenvolvedores novos, entender arquitetura completa

- 👁️ Visão geral do projeto
- 🛠️ Stack tecnológico detalhado
- 📁 Estrutura de pastas comentada
- 🧩 Componentes com props e funcionalidades
- 🛣️ Sistema de rotas
- 📊 Fluxo de dados (diagramas)
- 📐 Padrões de código
- 🔧 Guia para contribuir

**Tempo de leitura:** 20-30 min  
**Ideal para:** Entender como tudo funciona, contribuir com features

---

### 3. **REFACTORING_SUMMARY.md** 📋
**Para:** Histórico de mudanças, o que foi alterado e por quê

- 📊 Alterações de antes vs depois
- 📈 Impacto das mudanças
- 🔧 Como testar
- ✅ Checklist de implementação

**Tempo de leitura:** 15-20 min  
**Ideal para:** Revisar mudanças, entender contexto histórico

---

## 🎯 Como Usar Esta Documentação

### **Seu Caso:** Sou um agente de IA processando este projeto
→ Leia: **AI_QUICK_GUIDE.md** (5 min) + **PROJECT_ARCHITECTURE.md** (20 min)

### **Seu Caso:** Quero adicionar um novo serviço
→ Leia: **PROJECT_ARCHITECTURE.md** seção "Guia para Contribuir"

### **Seu Caso:** Quero entender por que coisas mudaram
→ Leia: **REFACTORING_SUMMARY.md**

### **Seu Caso:** Sou novo desenvolvedor
→ Leia na ordem: AI_QUICK_GUIDE → PROJECT_ARCHITECTURE → REFACTORING_SUMMARY

### **Seu Caso:** Preciso fazer um fix rápido
→ Leia: **AI_QUICK_GUIDE.md** seção "Referência Rápida"

---

## 🚀 Quick Start (30 segundos)

```bash
# 1. Instale
npm install

# 2. Rode
npm run dev

# 3. Abra http://localhost:5173
```

---

## 📊 Estrutura do Projeto

```
VGOIRE-APP/
├── src/
│   ├── App.tsx              ← TODOS OS COMPONENTES AQUI
│   ├── main.tsx             ← Entry point
│   ├── index.css            ← Estilos globais
│   └── constants.ts         ← Dados e configurações
│
├── docs/
│   ├── INDEX.md             ← Você está aqui
│   ├── AI_QUICK_GUIDE.md    ← Para agentes de IA
│   ├── PROJECT_ARCHITECTURE.md ← Documentação completa
│   └── REFACTORING_SUMMARY.md ← Histórico de mudanças
│
└── [arquivos config]
```

---

## 🧠 O Que Você Precisa Saber

### **Tecnologia**
- React 19 + TypeScript = Type-safe UI components
- Vite = Dev/build super rápido
- React Router = Navegação SPA sem reloads
- Tailwind CSS = Styling utilitário

### **Arquitetura**
- **Arquivo principal:** `src/App.tsx` (todos componentes lá)
- **Dados:** `src/constants.ts` (hardcoded, sem API backend)
- **Rotas:** 3 rotas (`/`, `/service/:id`, fallback)
- **Estado:** Global na App, props para componentes

### **18 Idiomas**
- Incluindo suporte RTL (árabe, hebraico)
- Todas as strings em `UI_STRINGS`
- Cada serviço tem traduções

### **Scroll Inteligente**
- Ao clicar card: salva ID em localStorage
- Ao voltar: usa `scrollIntoView()` para voltar pro card
- Muito mais confiável que salvar posição Y

---

## 🔑 Arquivos-Chave

| Arquivo | Linhas | Propósito |
|---------|--------|----------|
| `src/App.tsx` | ~600 | Tudo (componentes + rotas) |
| `src/constants.ts` | ~300 | Dados, strings, configurações |
| `src/main.tsx` | ~10 | Entry point |
| `src/index.css` | ~50 | Estilos globais |
| `package.json` | ~50 | Dependências e scripts |

---

## 💡 Conceitos-Chave

### **SPA (Single Page Application)**
Aplicação web que **não recarrega a página** ao navegar. Muda URL e renderiza novo conteúdo.

### **React Router**
Gerencia rotas sem reloads. Permite URLs como `/service/google_rates`.

### **Estado Global**
Estado na `App` que é passado como props para componentes. Exemplo: `lang`, `showSplash`.

### **Props**
Argumentos passados para componentes. Exemplo: `<Home lang="en" setLang={setLang} />`.

### **Hooks**
Funções React como `useState`, `useEffect`, `useNavigate`, `useParams`.

### **Motion**
Biblioteca para animações suaves. Exemplo: `<motion.div initial={{}} animate={{}} />`.

### **Tailwind CSS**
Framework CSS utilitário. Estilos via classes. Exemplo: `className="bg-blue-500 text-white"`.

---

## ❓ FAQ Geral

**P: Preciso editar código?**  
R: Abra `src/App.tsx` e `src/constants.ts`. Lá está 95% do projeto.

**P: Onde estão os componentes?**  
R: Todos em `src/App.tsx`. Se crescer o projeto, podem separar em arquivos diferentes.

**P: Como adicionar novo serviço?**  
R: Edit `src/constants.ts` → `SERVICES` array. Veja `PROJECT_ARCHITECTURE.md`.

**P: Como mudar cores?**  
R: Edit `tailwind.config.ts` ou use classes Tailwind.

**P: Como testar localmente?**  
R: `npm run dev` → abre http://localhost:5173

**P: Erro de TypeScript?**  
R: `npm run lint` mostra erros. Fix-os ou edite `tsconfig.json`.

---

## 🔗 Links Úteis

- **GitHub:** https://github.com/vgoire/VGOIRE-APP
- **Live:** https://vgoire.github.io/VGOIRE-APP/
- **Website:** https://tevgoire.com.br/
- **Play Store:** TBD

---

## 🎓 Recursos de Aprendizado

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Motion](https://motion.dev)

---

## ✅ Checklist da Primeira Visita

- [ ] Li o `AI_QUICK_GUIDE.md` (rápido)
- [ ] Li o `PROJECT_ARCHITECTURE.md` (detalhado)
- [ ] Rodei `npm install`
- [ ] Rodei `npm run dev`
- [ ] Testei a aplicação no navegador
- [ ] Abri `src/App.tsx` e entendi a estrutura
- [ ] Abri `src/constants.ts` e vi os dados
- [ ] Rodei `npm run lint` 
- [ ] Estou pronto para contribuir!

---

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Erro ao instalar | `rm package-lock.json node_modules && npm install` |
| Porta 5173 ocupada | `npm run dev -- --port 3000` |
| Erro de tipos | `npm run lint` para ver erros |
| Build falha | `npm run build` para ver erro exato |
| Componente não renderiza | Verifique condicional e chave (key) |

---

## 📞 Contato

**Precisa de ajuda?**
- Abra uma issue no GitHub
- WhatsApp: +55 69 9812-32697

---

**Última atualização:** 30 de Março de 2026  
**Status:** ✅ Documentação Completa

---

## 🎉 Bem-vindo ao VGOIRE-APP!

Agora você está pronta/pronto para:
- ✅ Entender toda a arquitetura
- ✅ Rodar a aplicação localmente
- ✅ Fazer modificações
- ✅ Contribuir com novas features
- ✅ Guardar código para agentes de IA

**Comece agora:** Leia o `AI_QUICK_GUIDE.md` ou `PROJECT_ARCHITECTURE.md`! 🚀
