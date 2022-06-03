FROM node:lts-alpine
WORKDIR /app/client
COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn build

EXPOSE 5000
CMD ["npx", "serve", "-s", "build"]