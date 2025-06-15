# Estágio 1: Build da Aplicação
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm install --only=production

COPY . .

RUN npm run build

# Estágio 2: Imagem Final de Produção
FROM node:20-alpine

WORKDIR /usr/src/app

# Copia as dependências e a aplicação compilada do estágio de build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# O comando que será executado para iniciar a aplicação
CMD ["node", "dist/main"]