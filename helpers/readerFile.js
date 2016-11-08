const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../example.txt');

const data = fs.readFileSync(filePath).toString();

export default data;
