# Backend configuration
FROM node:20
WORKDIR /usr/src/app/todo-backend
COPY package*.json ./
RUN npm ci
COPY . ./
ENV DEBUG=playground:*
EXPOSE 3000
CMD ["npm", "run", "dev"]