const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');

yargs.version("1.1.0");

// create yarg command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
})
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})
yargs.command({
    command: 'list',
    describe: 'list of notes',
    handler: function () {
        console.log('list of notes')
    }
})
yargs.command({
    command: 'read',
    describe: 'read a note',
    handler: function () {
        console.log('read a note')
    }
})
//console.log(yargs.argv)
yargs.parse();

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