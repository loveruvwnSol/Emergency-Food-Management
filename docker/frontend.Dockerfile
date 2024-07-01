FROM node:lts

COPY ./frontend/package.json /home/frontend/package.json
COPY ./frontend/package-lock.json /home/frontend/package-lock.json

WORKDIR /home/frontend

RUN npm install