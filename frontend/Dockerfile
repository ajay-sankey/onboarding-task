FROM node:20-bookworm-slim

RUN apt update && \
    apt upgrade -y

WORKDIR /frontend

COPY package.json .

RUN npm install

COPY public .
COPY src .
COPY .eslintrc.cjs .
COPY index.html .
COPY vite.config.js .

CMD ["npm", "run", "dev"]
