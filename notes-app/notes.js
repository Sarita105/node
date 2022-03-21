const fs = require('fs');

const getNotes = function () {
    return 'notes...';
};

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
console.log('added note')
  } else {
      console.log('note taken');
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
};