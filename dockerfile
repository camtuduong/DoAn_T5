# Sử dụng Node.js phiên bản 22 làm base image
FROM node:22

# Expose cổng 3000 để ứng dụng có thể truy cập
EXPOSE 3000

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file package.json và package-lock.json trước để cài đặt dependencies
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Lệnh để chạy ứng dụng
CMD ["node", "app.js"]