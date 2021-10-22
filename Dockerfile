FROM node:12-alpine

WORKDIR /usr/src/app

COPY . ./

ENV TZ=America/Sao_Paulo

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm i && npm run build

EXPOSE 4200

CMD npm run start