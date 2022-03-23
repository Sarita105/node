const fs = require('fs');
const chalk = require('chalk');

const getNotes = function () {
    return 'notes...';
};
const removeNote = function(title) {
    const notes = loadNotes();
    if(notes.length === 0) {
        console.log(chalk.red.inverse('no available note'));
    } else if(notes.some( n => n.title === title)) {
        const duplicate = notes.filter(function(note){
            return note?.title !== title;
        });
        saveNotes(duplicate);
        console.log(chalk.green.inverse('removed note'))
    } else {
        console.log(chalk.blue.inverse('no such note available'))
    }
   
}
const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicate = notes.filter(function(note){
    return note.title === title;
  });
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
const loadNotes = function () {
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
};