const fs = require("fs");
const path = require("path");

// body = req.body from notesRoutes post route
// notesArray = notes from notesRoutes which is the data from db.json
function createNewNote(body, notesArray) {

    // body is the req.body sent from POST
    const note = body;
    
    // add note to notes array
    notesArray.push(note);

    // save notes array to json file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
  
    return note;
};

// note = req.body from notesRoutes post route
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.title !== 'string') {
      return false;
    }
    return true;
}

module.exports = { createNewNote, validateNote };