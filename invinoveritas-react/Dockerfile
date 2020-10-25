FROM node

WORKDIR /app/invinoveritas-react
COPY package.json /app/invinoveritas-react

#Install dependencies
RUN npm install

#Install react-bootstrap dependency
RUN npm install react-bootstrap@0.32.4 --save

#Install bootstrap dependency
RUN npm install --save bootstrap

#Install react-router-dom dependency
RUN npm install react-router-dom

#Install react-script-tag dependency
# RUN npm install react-script-tag

#Install little-loader dependency
# RUN npm install little-loader --save

# react-native-web: the main source of magic in this app. 
# This library will convert our react-native components into web elements.
#Install react-native-web dependency
RUN npm install react-native-web --save

#Install js-cookie dependency
RUN npm install js-cookie --save

# todo.....
RUN npm install react-router-last-location
RUN npm install react-socks

EXPOSE 3000
CMD ["npm", "start"]
