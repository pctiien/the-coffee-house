## build stage
FROM node:18.20.4-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . . 
RUN npm run build

## run stage
FROM nginx:1.24.0-alpine AS run

RUN rm -rf /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
