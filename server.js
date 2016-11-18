const restify = require('restify');
const serveStatic = require('serve-static-restify');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const pos = require('pos');
const tagger = new pos.Tagger();
const jParser = require('./jparser.js');

const server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.bodyParser());

server.get('/', restify.serveStatic({
  directory: './',
  file: 'index.html',
}));

server.get('/file/:name', (req, res, next) => {

// ./data/F1.DXT
// ./data/P6_Gor/ch1.bin
  fs.readFile(path.join(__dirname, `files/${req.params.name}`), (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(data.length);
    console.log(data.offset);
    const parser = new jParser(data, {
      magic: {
        fileName: ['string', 4],
        chanelsNumber: 'int32',
        chanelPoints: 'int32',
        spectralLines: 'int32',
        sliceFrequency: 'int32',
        frequencyResolution: 'float32',
        dataBlockReceiveTime: 'float32',
        totalReceiveTime: 'int32',
        receivedBlocksNumberUser: 'int32',
        dataSize: 'int32',
        receivedBlocksNumberSystem: 'int32',
        max: 'float32',
        min: 'float32',
        values: ['array', 'float32', (data.length - 52)/4]
      }
    });
    // console.log(parser.parse('magic'));
    // const fileText = JSON.stringify(parser.parse('magic'));
    res.send(200, parser.parse('magic'));
    // return parser.parse('magic');
    return next();
  });
});

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

server.pre(serveStatic(path.join(__dirname, 'client')));
server.listen(3005,
  () => console.log(`${server.name} listening at ${server.url}`)
);
