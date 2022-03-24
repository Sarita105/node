const fs = require('fs');
const chalk = require('chalk');

const getNotes =  ()=> {
    return 'notes...';
};
const readNote = (title) => {
 const notes = loadNotes();
 if(notes.length === 0) {
     console.log(chalk.inverse.red('no note available!'));
 } else if(notes.find(n => n.title === title)){
    const note = notes.find(n => n.title === title);
console.log(chalk.green.inverse('title: ' +note.title +', desc:' +note.body))
 } else {
     console.log(chalk.blue.inverse('could not find your note. please add.'));
 }
};
const listNotes = () => {
    const notes = loadNotes();
    if(notes.length === 0) {
        console.log(chalk.red.inverse('no note found!'));
    } else {
        const heading = chalk.hex('#FFBBBB');
        console.log(heading.inverse('Your Notes'));
        notes.forEach(element => console.log(element.title));
    }
};
const removeNote = (title) => {
    const notes = loadNotes();
    if(notes.length === 0) {
        console.log(chalk.red.inverse('no available note'));
    } else if(notes.some( n => n.title === title)) {
        const duplicate = notes.filter(note=> note?.title !== title);
        saveNotes(duplicate);
        console.log(chalk.green.inverse('removed note'))
    } else {
        console.log(chalk.blue.inverse('no such note available'))
    }
   
}
const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicate = notes.filter(note=> note.title === title);
//   debugger
  if(duplicate.length === 0) {
    notes.push({
        title: title,
        body: body
    });
    saveNotes(notes);
console.log(chalk.green.inverse('added note'))
  } else {
      console.log(chalk.red.inverse('note taken'));
  }
}

const saveNotes = (notes) => {
const dataJson = JSON.stringify(notes);
fs.writeFileSync('notes.json',dataJson);
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(e) {
        return [];
    }
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes:listNotes,
    readNote:readNote
};