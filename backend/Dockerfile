FROM node:14-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 9999

# Start the Node.js app
CMD ["node", "app.js"]
