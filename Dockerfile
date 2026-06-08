FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# O --host é obrigatório no Docker para o Vite funcionar para quem está de fora
CMD ["npm", "run", "dev", "--", "--host"]