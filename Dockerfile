# Gunakan image Node.js
FROM node:18-slim

# Set direktori kerja di dalam container
WORKDIR /app

# Mengunduh file key.json dari Google Cloud Storage saat build image
RUN apt-get update && apt-get install -y wget

RUN wget -O key.json https://storage.cloud.google.com/savemoney-api-buckets/key.json

# Salin dependensi package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install 

# Salin sisa proyek ke dalam container
COPY . .

EXPOSE 3000

ENV API_KEY=AIzaSyB1Mg6U8LF92nUX1tGx7eM7TqFtxyz_2vA
ENV AUTH_DOMAIN=save-money-91d0a.firebaseapp.com
ENV PROJECT_ID=save-money-91d0a
ENV STORAGE_BUCKET=save-money-91d0a.appspot.com
ENV MESSAGING_SENDER_ID=28506334403
ENV APP_ID=1:28506334403:web:99ad266775a80640aa6e76
ENV MEASUREMENT_ID=G-ETKFBV8K1N


# Perintah untuk memulai aplikasi
CMD [ "node", "app.js" ]
