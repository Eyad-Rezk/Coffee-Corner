FROM node:latest
WORKDIR /app
COPY package*.json  /app/
RUN npm i
COPY . .
RUN npm run build
EXPOSE 4000
CMD [ "npm", "start" ]