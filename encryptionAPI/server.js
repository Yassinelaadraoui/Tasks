
const http = require('http');

const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app); //set app as a request handler

server.listen(port);
