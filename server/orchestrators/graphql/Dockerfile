FROM node:12
WORKDIR /app/server/orchestrator/graphql
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5010
CMD ["node", "app.js"]

