FROM node:12
WORKDIR /app/server/services/movies
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3005
CMD ["node", "app.js"]