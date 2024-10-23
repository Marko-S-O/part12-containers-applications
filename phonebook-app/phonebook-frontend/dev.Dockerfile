FROM node:20
WORKDIR /usr/src/app/phonebook-frontend
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]