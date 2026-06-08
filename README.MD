# Not Fat

## Visão geral

O Not Fat é uma aplicação full stack para acompanhamento de rotina alimentar, hidratação e hábitos de saúde. A interface foi construída com React + Vite, enquanto o backend utiliza Node.js + Express com MySQL para persistir usuários, refeições, alimentos e consumo diário de água.

O projeto atualmente oferece:

- autenticação com conta Google;
- cadastro e acompanhamento de alimentos por refeição;
- visualização do histórico de consumo de água;
- cálculo de meta diária de hidratação;
- perfil do usuário com edição do nome;
- cards informativos sobre suplementos.

---

## Objetivo do projeto

Auxiliar o usuário a organizar melhor sua rotina alimentar, manter o controle das refeições, acompanhar a hidratação e acessar dicas práticas sobre suplementação e saúde.

---

## Tecnologias utilizadas

### Frontend

- React 19
- Vite 8
- React Router DOM
- Tailwind CSS
- Lucide React
- Google OAuth React
- Font Awesome

### Backend

- Node.js
- Express
- MySQL2
- CORS
- Dotenv
- Google Auth Library

---

## Arquitetura e estrutura do projeto

```text
Projeto-web/
├── frontend/
│   └── src/
│       ├── componentes/
│       │   ├── card/              # lista de refeições e adição de alimentos
│       │   ├── Editarperfil/      # tela de edição do perfil
│       │   ├── extraInfo/         # cards informativos de suplementos
│       │   ├── modal/             # modal para adicionar alimentos
│       │   └── navegacao/         # sidebar principal
│       ├── contexts/
│       │   ├── AuthContext.jsx    # autenticação global
│       │   └── PrivateRoute.jsx   # rotas protegidas
│       └── pages/
│           ├── Home/              # tela inicial
│           ├── Agua/              # acompanhamento de hidratação
│           ├── Profile/           # tela de perfil
│           ├── login/             # login com Google
│           └── telaCompletaEditarPerfil/
├── backend/
│   ├── app.js                    # API Express
│   ├── setup-db.js               # criação das tabelas MySQL
│   └── package.json
├── package.json                   # scripts e dependências do frontend
└── vite.config.js                # configuração do Vite
```

---

## Funcionalidades principais

### 1. Autenticação

- Login com Google OAuth via frontend.
- O backend valida o token recebido e cria ou recupera o usuário no banco.
- O contexto de autenticação mantém o usuário conectado no armazenamento local.

### 2. Refeições

- A tela inicial exibe as refeições: Desjejum, Café da manhã, Almoço, Lanche da tarde, Jantar e Ceia.
- É possível abrir cada refeição, visualizar os alimentos cadastrados e remover itens.
- O modal de adição permite buscar alimentos e definir a quantidade desejada.

### 3. Hidratação

- A página “Água” mostra o consumo de hoje e o histórico recente.
- O usuário pode registrar volumes personalizados e verificar o percentual da meta diária.
- Há uma calculadora de meta diária com base no peso e nível de atividade.

### 4. Perfil e edição

- A página de perfil exibe nome e e-mail do usuário autenticado.
- A tela de edição permite atualizar o nome completo.
- O menu lateral destaca a seção “Perfil” também na tela de edição.

### 5. Conteúdo informativo

- A home possui cards com dicas sobre Whey Protein, Creatina, Pré-treino e Hipercalórico.

---

## Rotas principais

### Frontend

- `/login` — tela de autenticação
- `/` — tela inicial com refeições e informações
- `/profile` — perfil do usuário
- `/agua` — acompanhamento de hidratação
- `/editar-perfil` — edição do perfil

### Backend (API)

- `POST /login` — autenticação e cadastro/recuperação do usuário
- `POST /adicionar` — adicionar alimentos a uma refeição
- `GET /alimentos` — listar alimentos disponíveis
- `GET /usuario/:idUsuario` — consultar dados do usuário
- `GET /refeicao/:idUsuario/:idRefeicao` — listar itens de uma refeição
- `DELETE /refeicao/:idUsuario/:idRefeicao/:idAlimento` — remover alimento da refeição
- `PUT /usuario/:idUsuario` — atualizar o nome do usuário
- `POST /agua` — registrar consumo de água
- `GET /agua/:idUsuario` — consultar consumo hoje e histórico

---

## Variáveis de ambiente

### Frontend

No arquivo `.env` da raiz, configure:

- `VITE_GOOGLE_CLIENT_ID`

### Backend

No arquivo `.env` da pasta `backend/`, configure:

- `db_host`
- `db_port`
- `db_user`
- `db_password`
- `db_database`
- `PORT`
- `DB_SSL_CA` (necessário em ambientes com SSL do MySQL)

Observação: o projeto também pode manter as variáveis do Google no backend caso você queira ampliar a integração futura.

---

## Pré-requisitos

- Node.js 18+ ou compatível
- npm
- banco MySQL ativo
- uma conta Google válida para autenticação OAuth

---

## Como executar o projeto

### 1. Instalar dependências

Na raiz do projeto:

```bash
npm install
```

No backend:

```bash
cd backend
npm install
```

### 2. Configurar as variáveis de ambiente

Crie os arquivos `.env` necessários:

- raiz: `VITE_GOOGLE_CLIENT_ID=...`
- backend: `db_host=...`, `db_port=...`, `db_user=...`, `db_password=...`, `db_database=...`, `PORT=3000`

### 3. Preparar o banco de dados

Você pode usar o script abaixo para criar as tabelas iniciais:

```bash
cd backend
node setup-db.js
```

### 4. Iniciar o backend

```bash
cd backend
npm start
```

O backend ficará disponível em `http://localhost:3000` por padrão.

### 5. Iniciar o frontend

Na raiz do projeto:

```bash
npm run dev
```

O Vite normalmente abrirá a aplicação em `http://localhost:5173`.

---

## Fluxo de uso típico

1. Acesse `/login` e faça login com Google.
2. O sistema cria ou recupera o usuário no banco.
3. Na tela inicial, adicione alimentos às refeições desejadas.
4. Acompanhe a hidratação na página `/agua`.
5. Consulte ou edite seus dados no perfil.

---

## Observações importantes

- O backend depende de um banco MySQL configurado corretamente.
- A autenticação Google exige um `client ID` válido e uma configuração correta no frontend.
- O arquivo `.env` não deve ser compartilhado publicamente.
- Para desenvolvimento local, confirme se o backend e o frontend estão rodando em portas diferentes e com a URL correta configurada nas chamadas fetch.

---

## Resumo

O Not Fat combina uma interface moderna em React com uma API em Express e banco MySQL para oferecer um fluxo completo de acompanhamento alimentar, hidratação e gestão de perfil, com foco em experiência prática e usabilidade.
