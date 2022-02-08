const validator = require('validator');
const chalk = require('chalk');
const getNotes = require('./notes.js');

const command = process.argv[2];
if(command === 'add') {
    console.log('addind note.');
} else if (command === 'remove') {
    console.log('removing')
}
// const msg = getNotes();
// console.log(msg);

// console.log(validator.isEmail('sarita@abcd.com'));
// const warning = chalk.hex('#FFBBBB');
// console.log(warning.inverse('success!'));

// console.log(process.argv[2])
// const add = require('./utils.js');
// const fs = require('fs');
// fs.writeFileSync('notes.txt', 'This file was created using note!');
// fs.appendFileSync('notes.txt', ' Appended this using node.');
// const sum = add(4, -2);
// console.log('app.js', sum);