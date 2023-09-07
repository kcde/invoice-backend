FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install && npm install -g typescript 
RUN npm run build
USER node
CMD [ "npm", "start" ]
EXPOSE 1234




