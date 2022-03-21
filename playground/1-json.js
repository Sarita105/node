const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataStr = dataBuffer.toString();
const data = JSON.parse(dataStr);

data.name = "Sarita";
data.age = 25;

const dJson = JSON.stringify(data);
fs.writeFileSync('1-json.json',dJson);
// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
// }

// const bookJson = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJson);
// console.log(bookJson);

// const parsedData = JSON.parse(bookJson);
// console.log(parsedData.author);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJson = dataBuffer.toString();
// const data = JSON.parse(dataJson);
// console.log(data.author);