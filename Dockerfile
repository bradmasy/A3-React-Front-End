FROM node:alpine

WORKDIR /app
COPY package.json .

RUN npm install

COPY . .

CMD ["npx","nodemon","server.js"]
