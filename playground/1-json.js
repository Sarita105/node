const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
// }

// const bookJson = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJson);
// console.log(bookJson);

// const parsedData = JSON.parse(bookJson);
// console.log(parsedData.author);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJson = dataBuffer.toString();
const data = JSON.parse(dataJson);
console.log(data.author);