const restify = require('restify');
const serveStatic = require('serve-static-restify');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const pos = require('pos');
const tagger = new pos.Tagger();

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/', restify.serveStatic({
  directory: './',
  file: 'index.html',
}));

server.get('/book/:name', (req, res, next) => {
  const textFromFile = fs.readFileSync(path.join(__dirname, `books/${req.params.name}`)).toString();
  let words = _.split(textFromFile, /[*$%&?!:\n,)'.;<>="\-—(/ \t#\d]/);

  let dictionary = {};
  _.forEach(words, (word) => {
    if (!dictionary[word]) {
      dictionary[word] = 1;
    }
    else {
      dictionary[word]++;
    }
  });

  delete dictionary[''];
  delete dictionary[`'`];
  delete dictionary[`"`];

  let valueSortedWords = [];
  for (let key in dictionary) {
    let [taggedWord] = tagger.tag([key]);
    const tag = taggedWord[1];
    valueSortedWords.push([key, dictionary[key], tag]);
  }
  valueSortedWords.sort((a, b) => b[1] - a[1]);

  let alphabetSortedWords = [];
  for (let key in dictionary) {
    let [taggedWord] = tagger.tag([key]);
    const tag = taggedWord[1];
    alphabetSortedWords.push([key, dictionary[key], tag]);
  }
  alphabetSortedWords.sort((a, b) => a[0] > b[0] ? 1 : -1 );

  let alphaAndValueSortedArrays = [];
  alphaAndValueSortedArrays.push(valueSortedWords, alphabetSortedWords);


  res.send(200, alphaAndValueSortedArrays);
  // const fileText = JSON.stringify();
  return next();
})

server.pre(serveStatic(__dirname));
server.listen(3005,
  () => console.log(`${server.name} listening at ${server.url}`)
);
