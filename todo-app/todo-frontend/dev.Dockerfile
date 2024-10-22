FROM node:20-bullseye
WORKDIR /usr/src/app
ENV VITE_BACKEND_URL=http://localhost:3000
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

