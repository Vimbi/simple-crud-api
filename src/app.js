const http = require("http");
const { personRouter } = require('./services/routes');
const splitUrl = require('./utils/splitUrl');
// const { URL, URLSearchParams } = require("url");
// const options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/person',
//   method: 'GET'
// }

const server = http.createServer((req, res) => {
  // splitUrl(req); TODO get path to person
  personRouter(req, res);


  // if ( method === 'GET') {
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/html')
    // res.end(`<h1>${req.url}</h1>`)
    // // res.write('Hello!');
  // }

  // switch (req.url) {
  //   case '/person':
  //     // res.write('Hello!');
  //     res.statusCode = 200
  //     res.setHeader('Content-Type', 'text/html')
  //     res.end(`<h1>${req.url}</h1>`)
  //     res.write('Hello!');
  //     break;
  //   default:
  //     res.write('')
  // }
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  // res.end(`<h1>${req.url}</h1>`)
  // console.log('Someone connected');
});

module.exports = server;