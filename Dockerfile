# Gunakan image Node.js
FROM node:18-slim

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin dependensi package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install --only=production

# Salin sisa proyek ke dalam container
COPY . .

# Perintah untuk memulai aplikasi
CMD [ "node", "app.js" ]
