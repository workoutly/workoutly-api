FROM node:16.14-alpine as workoutly-api

WORKDIR /app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

# ===============================

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:dev"]
