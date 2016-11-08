const restify = require('restify');
const serveStatic = require('serve-static-restify');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/', restify.serveStatic({
  directory: './',
  file: 'index.html',
}));

// server.get('/', (req, res, next) => {
//   console.log('Hello');
//   res.send(200);
//   return next();
// });

server.listen(3005,
  () => console.log(`${server.name} listening at ${server.url}`)
);
