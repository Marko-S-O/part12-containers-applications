# Frontend configuration
FROM node:20
WORKDIR /usr/src/app/phonebook-frontend
COPY package*.json ./
COPY . ./
RUN npm ci
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build-stage /usr/src/app/phonebook-frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]