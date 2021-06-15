# node-server

### NodeJs Simple Application 
NodeJS simple application with health api, logging, routes, middlewars like compression convict and implemented with Express.

#### Install Dependencies
    npm install

#### Start Application with
    node server --env development

### To Run With Docker

#### Build the image    
    Docker build -t node-server:v1 .

#### Run the Container
    Docker run -p 9000:9000 -it node-server:v1
    
#### Health API URL
    http://localhost:9000/health
