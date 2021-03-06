const fs = require("fs");
const path = require("path");

// Create New Note
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
        JSON.stringify(notesArray, null, 2)
    );
  
    return notesArray;
};

// Validate Note
// note = req.body from notesRoutes post route
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.title !== 'string') {
      return false;
    }
    return true;
};

// Delete Note 
function deleteById(id, notes) {
    // filter notes array to remove note with id = id
    notes = notes.filter(note => note.id !== id);

    // save notes array to json file
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    return notes;
};

module.exports = { createNewNote, validateNote, deleteById };