# 🤖 Guia Rápido para Agentes de IA

**Para:** Agentes de IA, novos desenvolvedores, pessoas que querem entender rapidamente o projeto

---

## ⚡ Em 2 Minutos

**O que é?**  
VGOIRE-APP é um site de soluções premium (traduções, viagens, educação) feito com React + TypeScript.

**Stack:**
- Frontend: React 19, TypeScript, Vite
- Roteamento: React Router
- Styling: Tailwind CSS
- Animações: Motion (Framer)
- Ícones: Lucide React

**URL:** https://vgoire.github.io/VGOIRE-APP/

---

## 📂 Arquivos Importantes

| Arquivo | O que faz |
|---------|----------|
| `src/App.tsx` | **Tudo está aqui!** Componentes + Rotas |
| `src/main.tsx` | Entrada da app + BrowserRouter |
| `src/index.css` | Estilos globais + componentes custom |
| `src/constants.ts` | Dados de serviços, idiomas, strings |
| `package.json` | Dependências e scripts |
| `vite.config.ts` | Configuração build |
| `tailwind.config.ts` | Cores e temas |

---

## 🎯 Estrutura do Código

### **Componentes em App.tsx**

```
App (Routes)
├── Home (/) - Página inicial com cards
├── ServicePage (/service/:id) - Detalhes do serviço
├── ServiceDetail - Conteúdo expandido
├── ServiceCard - Card individual
├── SplashScreen - Animação inicial (2.5s)
└── LanguageSelector - Seletor de idioma
```

### **Rotas**

```
/ ......................... Home (lista de serviços)
/service/:id .............. Detalhes do serviço
/* ........................ Fallback para home
```

---

## 🔄 Fluxo Principal

```
1. Usuário acessa site
   ↓
2. Vê SplashScreen (2.5s)
   ↓
3. Carrega Home com 6 serviços
   ↓
4. Clica em um serviço
   ↓
5. localStorage salva ID do card
   navigate('/service/id')
   ↓
6. Mostra ServiceDetail
   com botão voltar fixo
   ↓
7. Aperta voltar
   ↓
8. Volta para Home
   scrollIntoView() leva ao card
   ✅ Sem recarregar
```

---

## 📋 Constantes (src/constants.ts)

### **Tipos Principais**

```tsx
type Language = 'en' | 'es' | 'pt' | 'zh' | 'he' | 'ar' | ...  // 18 idiomas

interface Service {
  id: string;
  icon: LucideIcon;
  image: string;
  translations: {
    [lang]: { title, description, faqItems }
  }
  // ... outros campos opcionais
}
```

### **Arrays Principais**

```tsx
SERVICES[]           // 6 serviços
LANGUAGES[]          // 18 idiomas com suporte RTL
UI_STRINGS[lang]     // Todas as strings traduzidas
```

### **URLs Externas**

```tsx
WHATSAPP_BASE_URL         // https://wa.me/5569981232697
OFFICIAL_WEBSITE_URL      // https://tevgoire.com.br/
TRAVEL_PLATFORM_URL       // Plataforma de viagens
```

---

## 🎨 Cores (Customizadas no Tailwind)

```css
vgoire-blue   = #001F3F   (azul escuro)
vgoire-gold   = #D4AF37   (ouro)
vgoire-green  = #39FF14   (verde neon)
```

**Uso:** `className="bg-vgoire-blue text-vgoire-gold"`

---

## 🛣️ Como Navegar no Código

### **Preciso adicionar um novo serviço:**
1. Abra `src/constants.ts`
2. Adicione em `SERVICES` array
3. Adicione traduções em `UI_STRINGS` para todos os 18 idiomas

### **Preciso modificar Home:**
1. Abra `src/App.tsx`
2. Encontre componente `Home`
3. Seção: "renderiza lista de cards"

### **Preciso modificar página de serviço:**
1. Abra `src/App.tsx`
2. Encontre componente `ServiceDetail`
3. Seção: "header com imagem", "FAQ", etc

### **Preciso mexer com animações:**
1. Abra `src/App.tsx`
2. Procure por `<motion.` tags
3. Veja exemplos de `initial`, `animate`, `exit`, `transition`

### **Preciso mexer com roteamento:**
1. Abra `src/App.tsx` (final do arquivo)
2. Encontre `export default function App()`
3. Veja `<Routes>` com as 3 rotas

---

## 📊 Estado da App

```tsx
// Global (App.tsx)
lang         = 'en'       // Idioma atual (18 opções)
showSplash   = true/false // Splash apareceu?

// Local (Home.tsx)
showPrivacy  = true/false // Modal de privacidade
isOpen       = true/false // Dropdown de idioma

// Local (ServiceDetail.tsx)
Nenhum state local significante
```

---

## 🧭 Navegação Programática

```tsx
// Ir para serviço
const navigate = useNavigate();
navigate(`/service/google_rates`);

// Voltar
navigate('/');

// Voltar com scroll automático
localStorage.setItem('lastServiceId', id);
navigate('/');
// Home fará: document.getElementById(...).scrollIntoView()

// Redirect (útil para IDs inválidos)
<Navigate to="/" replace />
```

---

## 🔗 Componentes Importantes

### **LanguageSelector**
- Dropdown com 18 idiomas
- Suporta RTL (árabe, hebraico)
- Click-outside para fechar

### **SplashScreen**
- Executa por 2.5 segundos
- Mostra logo + tagline
- Não repete ao navegar (estado global)

### **ServiceCard**
- `id="service-card-{serviceId}"` (importante para scroll!)
- Grid responsivo
- Alguns cards ocupam 2-3 colunas

### **ServiceDetail**
- Botão voltar **fixo no topo**
- Imagem grande
- Slides, partners, FAQ
- WhatsApp + link externo

---

## 🚀 Scripts Úteis

```bash
npm install      # Instalar dependências
npm run dev      # Dev server (localhost:5173)
npm run build    # Build para produção
npm run preview  # Testa build localmente
npm run lint     # Checa TypeScript
```

---

## ✅ Checklist para Contribuir

- [ ] Leia `PROJECT_ARCHITECTURE.md` para detalhes completos
- [ ] Rodar `npm run dev` localmente
- [ ] Fazer mudanças
- [ ] Rodar `npm run lint` para verificar erros
- [ ] Testar em mobile/tablet/desktop
- [ ] Git commit com "feat/fix/docs: descrição"
- [ ] Push para branch

---

## ❓ Perguntas Frequentes (IA)

**P: Por que todo código está em um único arquivo App.tsx?**  
R: Apenas 6-7 componentes. Para projeto pequeno, fica mais fácil manter. Se crescer, pode refatorar para arquivos separados.

**P: Por que usar state global para splash?**  
R: Para não repetir ao navegar entre rotas. Melhora UX e performance.

**P: Por que scroll por ID em vez de salvar posição Y?**  
R: ID é mais confiável - funciona mesmo se layout mudar. Y puro é brittle.

**P: Como funciona o RTL (árabe, hebraico)?**  
R: CSS usa `dir="rtl"` no div principal. Tailwind respeita automaticamente com `[dir="rtl"]` selectors.

**P: Todos os dados estão em constants.ts?**  
R: Sim! Nenhuma chamada de API para dados estáticos. Tudo é hardcoded.

**P: E se houver uma API backend no futuro?**  
R: Mude `SERVICES` para uma chamada `useEffect` com `fetch()`. Mesma estrutura.

**P: Por que usar TypeScript?**  
R: Type safety. Menos bugs e melhor autocomplete.

**P: Como testar um novo idioma?**  
R: Mude a prop `lang` para 'novo_idioma' no App. Ou clique no seletor.

---

## 🔍 Debugging Rápido

### **Componente não renderiza?**
1. Verifique condicional (if/ternário)
2. Verifique chave (key prop)
3. Console.log o state

### **Scroll não funciona?**
1. Verifique localStorage.getItem('lastServiceId')
2. Verifique id do elemento: `id="service-card-google_rates"`
3. Inspecione DOM: elemento existe?

### **Idioma não muda?**
1. Verifique `setLang()` foi chamado
2. Verifique `UI_STRINGS[lang]` tem a tradução
3. Verifique componente recebe `lang` como prop

### **Build falha?**
```bash
npm run lint     # Vê erros TypeScript
npm run build    # Vê erro exato
```

---

## 📞 Referência Rápida

| Preciso... | Vou para... |
|----------|-----------|
| Adicionar serviço | `src/constants.ts` → `SERVICES[]` |
| Adicionar idioma | `src/constants.ts` → `LANGUAGES[]` e `UI_STRINGS` |
| Mudar cores | `tailwind.config.ts` |
| Mudar animação | `src/App.tsx` → `<motion.>` tags |
| Adicionar rota | `src/App.tsx` → `<Routes>` |
| Adicionar componente | `src/App.tsx` → novo componente |
| Mudar estilos | `src/index.css` ou `className=""` |

---

## 🎁 Dicas de Ouro

1. **Use localStorage para persistência**: `localStorage.setItem()` e `localStorage.getItem()`
2. **Use sessionStorage para dados temporários**: Limpa ao fechar aba
3. **SEMPRE coloque key em map()**: `{list.map((item) => <div key={item.id}>`
4. **Tailwind é seu melhor amigo**: Evite CSS inline
5. **Motion faz UI bonita**: Use para animações suaves
6. **TypeScript salva vidas**: Fixe tipos, menos bugs
7. **RTL é automático**: Apenas use `dir={isRtl ? 'rtl' : 'ltr'}`

---

**Pronto para contribuir?** 🚀

Comece pelo `PROJECT_ARCHITECTURE.md` para detalhes completos!
