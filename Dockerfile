FROM node:lts

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run prod:build

EXPOSE 48080

CMD ["node", "./dist/src/index.js"]