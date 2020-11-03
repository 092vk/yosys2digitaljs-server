# Dockerfile

FROM node:10.16.0
RUN apt-get update -qq
RUN apt-get install -y yosys
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY ./ ./
EXPOSE 3040
ENV NODE_ENV=production
CMD [ "npm", "run", "server" ]