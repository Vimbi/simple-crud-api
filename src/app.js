const http = require("http");
const { personRouter } = require('./services/routes');

const server = http.createServer((req, res) => {
  personRouter(req, res);
});

module.exports = server;