const fs = require('fs');
const path = require('path');
const notesRouter = require('express').Router();
// give each note a unique id
const uniqid = require('uniqid'); 

// import functions
const { createNewNote, validateNote, deleteById } = require('../../lib/notes');

// import notes data
const notes = require('../../db/db');

// Get notes
notesRouter.get('/notes', (req, res) => {

    // the notes declared above
    let results = notes;
    // sends data back to client as json
    res.json(results);
});

// Post notes
notesRouter.post('/notes', (req, res) => {

    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    // check if the note data has correct format
    if (!validateNote(req.body)) {
        // if data is incorrect, send error message to client
        res.status(400).send('The note is not properly formatted.');
    } 
    else {
        // if data is correct& function returns true then send that data to createNewNote
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

// Delete notes
notesRouter.delete('/notes/:id', (req, res) => {
    
    // const noteId = req.params.id;
    // let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
    // noteList = noteList.filter((x) => x.id !== noteId);
    // fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    // res.json(noteList);

    deleteById(req.params.id, notes);

    res.status(200).send('Note deleted.');

});
// req = will contain information about the call to the server, the path, the query parameters, and maybe path parameters
// res = will contain information that gets sent back to the client

module.exports = notesRouter;

