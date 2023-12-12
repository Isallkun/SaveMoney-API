# Gunakan image Node.js
FROM node:18-slim

# Set direktori kerja di dalam container
WORKDIR /app

# Mengunduh file key.json dari Google Cloud Storage saat build image
RUN apt-get update && apt-get install -y wget

RUN wget -O key.json https://storage.googleapis.com/savemoney-api-buckets/key.json


# Salin dependensi package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install 

# Salin sisa proyek ke dalam container
COPY . .

EXPOSE 3000


# Perintah untuk memulai aplikasi
CMD [ "node", "app.js" ]
