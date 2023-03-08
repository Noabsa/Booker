FROM node:18

WORKDIR /server
COPY package-lock.json package.json ./
RUN npm ci

ADD config config
ADD controllers controllers
ADD models models
ADD routes routes
ADD app.js app.js

EXPOSE 3030
CMD ["app.js"]