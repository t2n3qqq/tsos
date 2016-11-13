const pos = require('pos');
const tagger = new pos.Tagger();

console.dir(tagger.tag(['saw']));
