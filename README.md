# Habits Tracker - Frontend

Uma aplicação moderna de frontend em React + TypeScript para rastreamento de hábitos, construída com Vite.

## 📋 Sobre o Projeto

Este é o frontend de um sistema de gerenciamento de hábitos que permite aos usuários criar, editar, visualizar e gerenciar seus hábitos pessoais. A aplicação utiliza autenticação JWT e oferece uma interface responsiva e intuitiva.

## ✨ Funcionalidades

- 🔐 **Autenticação de Usuários**: Registro e login com JWT
- 🛡️ **Rotas Protegidas**: Acesso restrito a usuários autenticados
- 📝 **CRUD de Hábitos**: Criar, ler, atualizar e excluir hábitos
- 🔍 **Filtros Avançados**: Filtrar hábitos por status, frequência e nome
- ⚡ **Gerenciamento de Estado**: Loading global e tratamento de erros
- 📱 **Design Responsivo**: Interface adaptável para diferentes dispositivos
- 🎨 **UI Moderna**: Interface limpa e intuitiva

## 🛠️ Tecnologias Utilizadas

- **React 18.2.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.2.2** - Superset do JavaScript com tipagem estática
- **Vite 5.0.8** - Build tool e dev server rápido
- **React Router DOM 6.20.0** - Roteamento para aplicações React
- **Axios 1.6.2** - Cliente HTTP para requisições à API
- **ESLint** - Linter para manter qualidade do código

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior
- **npm** (geralmente vem com o Node.js) ou **yarn**
- Um backend API rodando (padrão: `https://mini-projeto-mongo-db.vercel.app`)

### Verificando as versões

```bash
node --version  # Deve ser >= 18.0.0
npm --version   # Deve ser >= 9.0.0
```

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/ArthurAdrianoMM/MiniProjeto-Frontend.git
cd MiniProjeto-Frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente (Opcional)

O projeto já está configurado para usar o backend em produção (`https://mini-projeto-mongo-db.vercel.app`). Se você quiser usar um backend local ou diferente, crie um arquivo `.env` na raiz do projeto:

```bash
# Criar arquivo .env
touch .env
```

Adicione a seguinte variável ao arquivo `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

**Nota**: Se você não criar o arquivo `.env`, a aplicação usará automaticamente o backend de produção.

### 4. Verifique a instalação

```bash
npm run build
```

Se o build for concluído com sucesso, a instalação está correta!

## 💻 Uso

### Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

O servidor de desenvolvimento inclui:
- ✨ Hot Module Replacement (HMR) - atualizações instantâneas
- 🔍 Source maps para debugging
- ⚡ Build rápido e otimizado

### Build para Produção

Para criar uma build de produção otimizada:

```bash
npm run build
```

Os arquivos de produção serão gerados na pasta `dist/`.

### Preview da Build de Produção

Para testar a build de produção localmente antes de fazer deploy:

```bash
npm run preview
```

Isso iniciará um servidor local servindo os arquivos da pasta `dist/`.

### Linting

Para verificar a qualidade do código:

```bash
npm run lint
```

## 📖 Como Usar a Aplicação

### 1. Registro de Usuário

1. Acesse a aplicação
2. Clique em "Registrar" ou navegue para `/register`
3. Preencha:
   - Nome completo
   - Email
   - Senha (mínimo de caracteres conforme backend)
4. Clique em "Registrar"

### 2. Login

1. Na página de login (`/login`), insira:
   - Email
   - Senha
2. Clique em "Entrar"
3. Você será redirecionado para a página de hábitos

### 3. Gerenciar Hábitos

Na página principal (`/habits`), você pode:

#### Criar um Novo Hábito
- Clique em "+ Novo Hábito"
- Preencha:
  - **Nome** (obrigatório)
  - **Descrição** (opcional)
  - **Frequência**: Diário, Semanal, Quinzenal ou Mensal
  - **Status**: Ativo/Inativo
- Clique em "Criar"

#### Filtrar Hábitos
Use a barra lateral de filtros para:
- Filtrar por **Status**: Todos, Ativos ou Inativos
- Filtrar por **Frequência**: Todas ou uma frequência específica
- Buscar por **Nome**: Digite para buscar hábitos por nome
- **Limpar Filtros**: Remove todos os filtros aplicados

#### Editar um Hábito
- Clique no botão "Editar" no card do hábito
- Modifique os campos desejados
- Clique em "Atualizar"

#### Ativar/Desativar um Hábito
- Clique em "Ativar" ou "Desativar" no card do hábito
- O status será atualizado imediatamente

#### Excluir um Hábito
- Clique no botão "Excluir" no card do hábito
- Confirme a exclusão no diálogo

### 4. Logout

Clique no botão "Sair" no canto superior direito para fazer logout.

## 🗂️ Estrutura do Projeto

```
MiniProjeto-Frontend/
├── public/                 # Arquivos estáticos públicos
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Loader.tsx     # Componente de loading
│   │   └── ProtectedRoute.tsx  # Componente de rota protegida
│   ├── context/           # Contextos React
│   │   ├── AuthContext.tsx    # Contexto de autenticação
│   │   └── LoaderContext.tsx   # Contexto de loading global
│   ├── hooks/             # Custom hooks
│   │   └── useApi.ts      # Hook para chamadas à API
│   ├── pages/             # Páginas da aplicação
│   │   ├── Login.tsx      # Página de login
│   │   ├── Register.tsx   # Página de registro
│   │   └── Habits.tsx     # Página principal de hábitos
│   ├── services/          # Serviços
│   │   └── api.ts         # Cliente API e endpoints
│   ├── types/             # Definições de tipos TypeScript
│   │   └── index.ts       # Interfaces e tipos
│   ├── utils/             # Funções utilitárias
│   │   ├── constants.ts   # Constantes da aplicação
│   │   └── storage.ts     # Gerenciamento de localStorage
│   ├── App.tsx            # Componente principal
│   ├── App.css            # Estilos globais
│   └── main.tsx           # Ponto de entrada
├── index.html             # HTML principal
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── vite.config.ts         # Configuração Vite
├── vercel.json            # Configuração Vercel
└── README.md              # Este arquivo
```

## 🌐 Rotas da Aplicação

- `/` - Redireciona para `/habits`
- `/login` - Página de login (pública)
- `/register` - Página de registro (pública)
- `/habits` - Página principal de hábitos (protegida)

## 🚢 Deploy

### Deploy no Vercel (Recomendado)

O projeto está configurado para deploy automático no Vercel:

1. **Via Dashboard do Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório GitHub
   - O Vercel detectará automaticamente as configurações do projeto
   - Clique em "Deploy"

2. **Via CLI do Vercel**:
   ```bash
   # Instalar Vercel CLI globalmente
   npm install -g vercel
   
   # Fazer deploy
   vercel
   
   # Deploy em produção
   vercel --prod
   ```

### Configuração do Vercel

O arquivo `vercel.json` já está configurado com:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`
- Rewrites para SPA (Single Page Application)

### Variáveis de Ambiente no Vercel

Se necessário, você pode configurar variáveis de ambiente no Vercel:
- `VITE_API_BASE_URL` - URL do backend API (opcional, já tem valor padrão)

## 🔧 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Cria uma build de produção |
| `npm run preview` | Preview da build de produção |
| `npm run lint` | Executa o linter ESLint |

## 📡 API Backend

A aplicação consome a API backend em:
- **Produção**: `https://mini-projeto-mongo-db.vercel.app`
- **Desenvolvimento**: Configurável via `.env` (padrão: `http://localhost:3000`)

### Endpoints Utilizados

- `POST /api/register` - Registro de usuário
- `POST /api/login` - Login de usuário
- `GET /api/profile` - Perfil do usuário autenticado
- `GET /api/habits` - Listar hábitos (com filtros opcionais)
- `POST /api/habits` - Criar hábito
- `GET /api/habits/:id` - Obter hábito por ID
- `PUT /api/habits/:id` - Atualizar hábito
- `PATCH /api/habits/:id` - Atualização parcial de hábito
- `DELETE /api/habits/:id` - Excluir hábito
- `GET /health` - Health check da API

## 🐛 Solução de Problemas

### Erro de Build no TypeScript

Se encontrar erros de TypeScript durante o build:

```bash
# Verificar erros
npm run build

# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problemas com CORS

Se encontrar erros de CORS, verifique se o backend está configurado para aceitar requisições do frontend.

### Token Expirado

Se o token JWT expirar, você será automaticamente redirecionado para a página de login.

## 📝 Licença

Este projeto é parte de um miniprojeto acadêmico.

## 👥 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Desenvolvido com ❤️ usando React, TypeScript e Vite

