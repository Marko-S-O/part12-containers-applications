# Frontend configuration
# Stage 1: Build
FROM node:20 AS build-stage 
WORKDIR /usr/src/app/todo-frontend
COPY package*.json ./
COPY . ./
RUN npm ci
RUN npm run build

# Stage 2: Testing
FROM build-stage AS test-stage
WORKDIR /usr/src/app/todo-frontend
RUN npm test

# Stage 3: Web Server
FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/todo-frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]