# Not Fat

## Visão geral

O projeto Not Fat é uma aplicação full stack voltada para acompanhamento de refeições, cadastro de alimentos e informações sobre suplementos. A interface foi construída com React + Vite, e o backend foi desenvolvido com Node.js + Express para autenticação e integração com um banco MySQL.

O sistema atual oferece:

- login com conta Google;
- visualização e gerenciamento de refeições;
- adição e remoção de alimentos por refeição;
- perfil do usuário com dados básicos;
- tela de edição do perfil;
- seção informativa com dicas sobre suplementos.

---

## Objetivo do projeto

Auxiliar o usuário a organizar melhor sua rotina alimentar, registrar alimentos por refeição e acessar informações úteis sobre hábitos e suplementação relacionados à saúde e ao desempenho.

---

## Tecnologias utilizadas

### Frontend

- React 19
- Vite 8
- React Router DOM
- Tailwind CSS
- Lucide React
- Font Awesome
- Google OAuth React

### Backend

- Node.js
- Express
- MySQL2
- CORS
- Dotenv
- Google Auth Library
- JWT (preparado para autenticação com tokens)

---

## Estrutura do projeto

```text
Projeto-web/
├── frontend/
│   └── src/
│       ├── componentes/         # componentes reutilizáveis
│       ├── contexts/            # autenticação e rotas privadas
│       ├── pages/               # telas principais
│       └── assets/              # imagens e ícones
├── backend/
│   ├── app.js                  # servidor Express e rotas
│   └── package.json            # dependências do backend
├── package.json                # dependências e scripts do frontend
└── vite.config.js             # configuração do Vite
```

---

## Funcionalidades principais

### 1. Autenticação

- Login realizado com Google OAuth.
- O token recebido pelo frontend é validado no backend.
- O usuário é criado ou localizado no banco de dados com base no email.

### 2. Refeições

- O usuário pode visualizar as refeições cadastradas: Desjejum, Café da manhã, Almoço, Lanche da tarde, Jantar e Ceia.
- É possível adicionar alimentos à refeição selecionada.
- Também é possível excluir itens já adicionados.

### 3. Perfil do usuário

- Exibe nome e email do usuário autenticado.
- Possui tela de edição para atualizar o nome.

### 4. Informações adicionais

- A home exibe blocos informativos com dicas sobre suplementos como Whey Protein, Creatina, Pré-treino e Hipercalórico.

---

## Rotas principais

### Frontend

- `/login` — tela de autenticação
- `/` — página inicial com refeições e informações
- `/profile` — perfil do usuário
- `/editar-perfil` — edição de dados do perfil

### Backend (API)

- `POST /login` — autenticação do usuário
- `POST /adicionar` — adicionar alimento a uma refeição
- `GET /alimentos` — listar alimentos disponíveis
- `GET /usuario/:idUsuario` — buscar usuário por ID
- `GET /refeicao/:idUsuario/:idRefeicao` — listar alimentos de uma refeição
- `DELETE /refeicao/:idUsuario/:idRefeicao/:idAlimento` — remover alimento
- `PUT /usuario/:idUsuario` — atualizar nome do usuário

---

## Variáveis de ambiente

### Frontend

O projeto utiliza a variável:

- `VITE_GOOGLE_CLIENT_ID`

Ela deve ser configurada no arquivo `.env` da raiz do projeto.

### Backend

O backend depende de variáveis como:

- `db_host`
- `db_port`
- `db_user`
- `db_password`
- `db_database`
- `PORT`
- `DB_SSL_CA` (quando necessário)

Essas configurações ficam no arquivo `.env` dentro da pasta `backend/`.

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

Para rodar este projeto, é necessário ter o **Docker** e o **Docker Compose** instalados na máquina.

## Como rodar a aplicação
1. Abra o terminal na pasta raiz do projeto.
2. Execute o seguinte comando:

```bash
   docker-compose up --build
```

### 2. Configurar variáveis de ambiente

Crie os arquivos `.env` conforme necessário:

- raiz: `VITE_GOOGLE_CLIENT_ID=...`
- backend: variáveis de conexão com o banco e credenciais do Google, se aplicável

### 3. Iniciar o backend

```bash
cd backend
npm start
```

O servidor será iniciado normalmente na porta `3000`.

### 4. Iniciar o frontend

Na raiz do projeto:

```bash
npm run dev
```

O painel do Vite geralmente será aberto em `http://localhost:5173`.

---

## Observações importantes

- O backend depende de um banco MySQL ativo para funcionar corretamente.
- A autenticação com Google exige um `client ID` válido configurado no projeto.
- O arquivo `.env` com credenciais sensíveis não deve ser compartilhado publicamente.

---

## Resumo

Este projeto combina uma interface moderna em React com uma API em Express e banco MySQL para oferecer uma experiência prática de controle alimentar, autenticação segura e consulta de informações úteis para a rotina de treino e alimentação.
