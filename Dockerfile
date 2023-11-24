FROM node:latest

WORKDIR /app

COPY . .

RUN npm install
# RUN npm run build

# run the builded web site
CMD ["npm", "run", "preview"]
