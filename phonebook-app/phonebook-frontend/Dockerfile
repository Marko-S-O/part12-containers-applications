# Frontend configuration
# Stage 1: Build
FROM node:20 AS build-stage 
WORKDIR /usr/src/app/phonebook-frontend
COPY package*.json ./
COPY . ./
RUN npm ci
RUN npm run build

# Stage 2: Web Server
FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/phonebook-frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]