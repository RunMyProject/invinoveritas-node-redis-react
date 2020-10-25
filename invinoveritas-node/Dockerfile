#Specify a base image
FROM node:alpine

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
RUN npm install

#Install async dependency
RUN npm install async

#Install CORS dependency
RUN npm install cors

#Install uuid dependency
RUN npm install uuid

#Install lodash dependency
RUN npm install lodash

#Copy remaining files
COPY ./ ./

#Default command
CMD ["npm","start"]
