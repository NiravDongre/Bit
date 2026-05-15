

FROM node:22

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=4000

EXPOSE 4000

CMD [ "npm", "start" ]