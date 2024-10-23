# Backend configuration
FROM node:20
WORKDIR /usr/src/app/phonebook-backend
COPY package*.json ./
RUN npm install
COPY . ./
ENV DEBUG=playground:*
EXPOSE 3000
CMD ["npm", "run", "dev"]