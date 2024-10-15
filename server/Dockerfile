# build and run stage
FROM node:18.20.4-alpine
WORKDIR /app
COPY package.json package-lock.json . 
RUN npm install 
COPY . .
CMD ["npm","start"]
EXPOSE 3000 