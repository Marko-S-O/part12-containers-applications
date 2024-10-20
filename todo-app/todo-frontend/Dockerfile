# Frontend configuration
# Stage 1: Build
FROM node:20 AS build-stage 
WORKDIR /usr/src/app/todo-frontend
COPY package*.json ./
COPY . ./
ENV VITE_BACKEND_URL=http://localhost:3000
RUN npm ci
RUN npm run build

# Stage 2: Service
FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/todo-frontend/dist /usr/share/nginx/html
ENV VITE_BACKEND_URL=http://localhost:3000
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]