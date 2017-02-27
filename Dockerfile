FROM node:4-onbuild
EXPOSE 8888

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

CMD ["npm", "start"]