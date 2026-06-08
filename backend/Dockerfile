FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependência primeiro (boa prática)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código do backend
COPY . .

# Expõe a porta que o seu backend usa (estou assumindo 3000)
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["node", "app.js"]