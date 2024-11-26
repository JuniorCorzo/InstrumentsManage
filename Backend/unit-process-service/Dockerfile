FROM node:22

WORKDIR /usr/app
COPY package.json .
RUN npm install

COPY . .
CMD npm run start