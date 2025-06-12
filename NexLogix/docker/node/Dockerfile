FROM node:22

# 1) Directorio de trabajo
WORKDIR /app

# 2) Copiar archivos de dependencias e instalar
COPY package*.json ./
RUN npm install

# 3) Copiar el resto del frontend y (si quieres) construir
COPY . .

# 4) Exponer el puerto Vite (5173)
EXPOSE 5173

# 5) Comando por defecto (modo dev; ajusta si sirves estático)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
