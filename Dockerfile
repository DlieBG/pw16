FROM node:20 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY svelte.config.js .
COPY tsconfig.json .
COPY vite.config.ts .
COPY .svelte-kit/tsconfig.json .svelte-kit/
COPY .env .

COPY src src
COPY static static

RUN npm run build

ENTRYPOINT ["node", "build"]
