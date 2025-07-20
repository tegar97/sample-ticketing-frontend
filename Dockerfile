FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "start"]
