# node-server

### NodeJs Simple Application 

#### Install Dependencies
    npm install

#### Start Application with
    node server --env development

### To Run With Docker

#### Build the image    
    Docker build -t node-server:v1 .

#### Run the Container
    Docker run -p 9000:9000 -it node-server:v1