FROM node:12
WORKDIR /app/server/services/tv-series
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3010
CMD ["node", "app.js"]