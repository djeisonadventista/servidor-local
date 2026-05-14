# 1. Especifica  versao de sistema operacional base
FROM node:20-alpine

# 2. Define a pasta onde o codigo vai ser executado
WORKDIR /app

# 3. Copia os arquivos package.json e package-lock.json para a pasta /app
COPY package*.json ./

# 4. Instala as dependencias
RUN npm install

# 5. Copia o código-fonte para a pasta /app
COPY . .

# 6. Informar a porta que a aplicacao vai usar
EXPOSE 8080

# 7. Comando para executar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]