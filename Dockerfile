FROM node:10.15.3-alpine
WORKDIR /usr/app/maana-service
COPY . /usr/app/maana-service

RUN yarn install && \
  yarn run build

EXPOSE 8050

CMD ["npm", "run", "start"]
