FROM node:18 as build

WORKDIR /app

RUN npm install -g serve

COPY dist /app/dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
