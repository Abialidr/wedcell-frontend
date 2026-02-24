FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm i @next/swc-linux-x64-gnu@12.1.5
RUN npm run build
CMD ["npm", "start"]
