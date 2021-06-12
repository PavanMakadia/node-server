FROM node:alpine3.13

# Create Working dir and set it.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy pakage*.json files to working dir
COPY package*.json /usr/src/app/

# Insall api dependencies
RUN npm install

# Copy source code to working dir 
COPY . /usr/src/app

# Expose ports
EXPOSE 9000

# Run Command
CMD ["node", "server.js"]