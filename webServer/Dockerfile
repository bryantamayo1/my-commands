FROM node:20.18.0-alpine
WORKDIR /webServer
COPY . ./
RUN npm install
EXPOSE 3020
CMD ["npm", "start"]