FROM node:16.14

WORKDIR /front-end

COPY package*.json ./

RUN ["npm", "i"] 

COPY . ./

CMD ["npm", "run", "dev"]