# NOT FAT

Aplicação full stack para gerenciamento de refeições, controle de hidratação e acesso a informações nutricionais e suplementação.

---

## Visão Geral

O Not Fat foi desenvolvido para auxiliar usuários a manterem uma rotina alimentar mais organizada, permitindo registrar refeições, controlar o consumo diário de água e acessar conteúdos informativos relacionados à saúde e desempenho físico.

A aplicação utiliza React no frontend, Node.js com Express no backend e MySQL para armazenamento dos dados.

---

## Principais Funcionalidades

###  Autenticação

- Login com Google OAuth
- Validação do token no backend
- Cadastro automático do usuário
- Persistência da sessão

###  Gerenciamento de Refeições

- Visualização das refeições do dia
- Adição de alimentos
- Remoção de alimentos
- Expansão e recolhimento das refeições
- Atualização dinâmica dos dados

###  Controle de Hidratação

- Registro de consumo diário de água
- Adição rápida de quantidades pré-definidas
- Adição personalizada em mililitros
- Meta diária baseada no peso corporal
- Ajuste por nível de atividade física
- Histórico de consumo

###  Histórico de Consumo

- Visualização dos últimos 7 dias
- Visualização dos últimos 15 dias
- Visualização dos últimos 30 dias
- Comparação entre consumo e meta diária

###  Perfil

- Visualização dos dados do usuário
- Atualização do nome
- Sincronização com banco de dados
- Atualização automática da sessão

###  Informações Nutricionais

- Whey Protein
- Creatina
- Pré-Treino
- Vitaminas
- Recomendações gerais de suplementação

---

## Tecnologias Utilizadas

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
- JWT

### DevOps

- Docker
- Docker Compose

---

## Estrutura do Projeto

```text
Projeto-web/
├── frontend/
│   └── src/
│       ├── componentes/
│       ├── contexts/
│       ├── pages/
│       └── assets/
│
├── backend/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
│
├── Dockerfile
├── docker-compose.yml
├── package.json
└── vite.config.js
```

---

## Rotas Frontend

| Rota | Descrição |
|--------|------------|
| /login | Tela de autenticação |
| / | Dashboard principal |
| /profile | Perfil do usuário |
| /editar-perfil | Edição do perfil |
| /agua | Controle de hidratação |

---

## Rotas Backend

| Método | Endpoint | Descrição |
|----------|------------|------------|
| POST | /login | Autenticação |
| POST | /adicionar | Adicionar alimento |
| POST | /agua | Registrar consumo de água |
| GET | /alimentos | Listar alimentos |
| GET | /usuario/:idUsuario | Buscar usuário |
| GET | /refeicao/:idUsuario/:idRefeicao | Buscar alimentos da refeição |
| GET | /agua/:idUsuario | Buscar consumo de água |
| PUT | /usuario/:idUsuario | Atualizar usuário |
| DELETE | /refeicao/:idUsuario/:idRefeicao/:idAlimento | Remover alimento |

---

## Variáveis de Ambiente

### Frontend

```env
VITE_GOOGLE_CLIENT_ID=
```

### Backend

```env
db_host=
db_port=
db_user=
db_password=
db_database=
PORT=
DB_SSL_CA=
```

---

## Execução Local

### Instalar Dependências

```bash
npm install

cd backend
npm install
```

### Iniciar Backend

```bash
cd backend
npm start
```

### Iniciar Frontend

```bash
npm run dev
```

---

## Execução com Docker

### Construir e iniciar os containers

```bash
docker-compose up --build
```

### Endereços

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

## Observações

- É necessário possuir um banco MySQL configurado.
- O login requer credenciais válidas do Google OAuth.
- Os arquivos `.env` não devem ser enviados ao repositório.
- O Docker Compose permite executar toda a aplicação com um único comando.

---

## Objetivo

O Not Fat busca oferecer uma experiência simples e intuitiva para acompanhamento alimentar e controle de hidratação, reunindo em uma única plataforma ferramentas úteis para organização da rotina, monitoramento de hábitos e acesso a conteúdos informativos relacionados à saúde e suplementação.
