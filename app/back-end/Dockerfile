FROM node:16.14

WORKDIR /back-end

COPY package*.json ./

RUN ["npm", "i"] 

COPY . ./

CMD ["npm", "start"]