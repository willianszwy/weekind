# Weekind - Cultive seus hábitos com serenidade

Uma Progressive Web App (PWA) inspirada nos princípios de design da Calm, focada em bem-estar e mindfulness para o rastreamento de hábitos semanais.

## 🧘‍♀️ Filosofia

Weekind foi criado com base nos princípios de design calmo e minimalista, proporcionando uma experiência tranquila e centrada para o desenvolvimento de hábitos saudáveis. A interface suave e os tons azuis calmantes criam um ambiente digital propício à reflexão e ao crescimento pessoal.

## ✨ Funcionalidades

- 📅 **Visualização Semanal Intuitiva**: Navegue pelos meses com uma interface limpa e minimalista
- 🎯 **Rastreamento Mindful**: Adicione hábitos diários ou personalizados com foco na intenção
- 📊 **Progresso Visual Suave**: Barras de progresso e indicadores visuais não invasivos
- 💾 **Armazenamento Persistente**: Seus dados ficam seguros localmente no navegador
- 📱 **Experiência PWA Completa**: Instale como um app nativo com notificações
- 🎨 **Design Inspirado na Calm**: Interface com glassmorphism sutil, tons azuis e tipografia elegante
- 🌱 **Foco no Bem-estar**: Mensagens motivacionais e design centrado no usuário

## 🛠️ Stack Tecnológica

- **React 18** - Framework principal
- **Vite** - Build tool otimizada
- **Tailwind CSS** - Estilização utilitária
- **Inter & Playfair Display** - Tipografia elegante do Google Fonts
- **PWA + Service Worker** - Experiência nativa
- **LocalStorage** - Persistência de dados
- **Lucide React** - Ícones minimalistas
- **CSS Custom Properties** - Paleta de cores calmantes

## 📦 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Weekind.git
cd Weekind
```

2. Instale as dependências:
```bash
npm install
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra http://localhost:5173 no navegador

## 🏗️ Build para Produção

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

## 🌐 Deploy no GitHub Pages

### Configuração Automática

O projeto está configurado para deploy automático via GitHub Actions:

1. Faça push para a branch `main`
2. O workflow será executado automaticamente
3. O site será publicado em `https://seu-usuario.github.io/Weekind/`

### Deploy Manual

```bash
npm run deploy
```

## 📱 Como Usar

### Visualização do Calendário
- Use as setas para navegar entre os meses
- Cada linha representa uma semana
- O emoji mostra a performance da semana:
  - ⭐ = 50% ou mais dos hábitos cumpridos
  - 😢 = Menos de 50% dos hábitos cumpridos

### Gerenciamento de Hábitos
1. Clique em uma semana para abrir a visualização detalhada
2. Clique em "Novo Hábito" para adicionar um hábito
3. Escolha entre:
   - **Diário**: Todos os dias da semana
   - **Personalizado**: Selecione dias específicos
4. Clique nos quadrados para marcar como concluído (verde) ou não concluído (vermelho)
5. Use o ícone de lixeira para remover hábitos

## 📂 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── AddHabitForm.jsx # Formulário de adição de hábitos
│   ├── CalendarView.jsx # Visualização do calendário
│   └── WeekView.jsx     # Visualização detalhada da semana
├── hooks/               # Hooks customizados
│   └── useHabits.js     # Hook para gerenciamento de hábitos
├── utils/               # Utilitários
│   └── dateUtils.js     # Funções relacionadas a datas
├── styles/              # Estilos globais
│   └── index.css        # CSS com Tailwind
└── App.jsx              # Componente principal
```

## 🔧 Configuração PWA

O projeto inclui configuração completa de PWA:

- **Manifest**: `public/manifest.json`
- **Service Worker**: Configurado via Vite PWA Plugin
- **Ícones**: Adicione `pwa-192x192.png` e `pwa-512x512.png` na pasta `public/`

## 🎨 Paleta de Cores Calm

A identidade visual foi inspirada na filosofia de design da Calm, utilizando tons que promovem tranquilidade:

### Cores Principais
```css
/* Azuis Calmantes */
--calm-blue-50: #f0f9ff;   /* Background suave */
--calm-blue-400: #38bdf8;  /* Acentos interativos */
--calm-blue-500: #0ea5e9;  /* Tema principal */

/* Teal Sereno */
--calm-teal-400: #2dd4bf;  /* Progresso positivo */
--calm-teal-500: #14b8a6;  /* Estados ativos */

/* Cinzas Suaves */
--calm-slate-600: #475569; /* Texto secundário */
--calm-slate-800: #1e293b; /* Texto principal */
```

### Customização
Para alterar as cores, edite:
- `src/styles/index.css` - Variáveis CSS
- `vite.config.js` - Cores do PWA
- `public/manifest.json` - Tema do navegador

### Tipografia
- **Inter**: Texto principal (300-700 weights)
- **Playfair Display**: Títulos e elementos de destaque (400-600 weights)

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se encontrar algum problema, abra uma issue no GitHub.