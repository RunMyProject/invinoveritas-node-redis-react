# Author: Edoardo Sabatini
# @26/10/2020
# ######################## 
#
FROM node

WORKDIR /usr/src/app/invinoveritas-react

COPY package*.json ./

#Install dependencies
RUN npm install

#Install react-bootstrap dependency
RUN npm install react-bootstrap@0.32.4

#Install bootstrap dependency
RUN npm install bootstrap

#Install react-router-dom dependency
RUN npm install react-router-dom

#react-native-web: the main source of magic in this app. 
#This library will convert our react-native components into web elements.
#Install react-native-web dependency
RUN npm install react-native-web

#Install js-cookie dependency
RUN npm install js-cookie

EXPOSE 3000

CMD ["npm", "start"]
