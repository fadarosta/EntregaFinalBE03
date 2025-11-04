# Usa Node.js 18 (versión LTS)
FROM node:18-alpine

# Directorio dentro del contenedor
WORKDIR /app

# Copia package.json primero (para caché de dependencias)
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm ci --only=production

# Copia todo el código fuente
COPY . .

# Puerto que usará la app
EXPOSE 8080

# Comando para iniciar la app
CMD ["node", "src/app.js"]