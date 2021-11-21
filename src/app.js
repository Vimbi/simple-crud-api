const http = require("http");
const { URL, URLSearchParams } = require("url");

// const options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/person',
//   method: 'GET'
// }

const server = http.createServer((req, res) => {

  const { method, url } = req;
  // const { searchParams } = new URL(url);
  const searchParams = new URLSearchParams(url);
  // const searchParams = new URLSearchParams(url);

  if ( method === 'GET' && searchParams.has('id')) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(`<h1>${req.url}</h1>`)
    res.write('Hello!');
  }

  switch (req.url) {
    case '/person':
      // res.write('Hello!');
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(`<h1>${req.url}</h1>`)
      res.write('Hello!');
      break;
    default:
      res.write('')
  }
  // res.statusCode = 200
  // res.setHeader('Content-Type', 'text/html')
  // res.end(`<h1>${req.url}</h1>`)
  // console.log('Someone connected');
});

module.exports = server;