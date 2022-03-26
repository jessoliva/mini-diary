const fs = require('fs');
const path = require('path');
const notesRouter = require('express').Router();
// give each note a unique id
const uniqid = require('uniqid'); 

// import functions
const { createNewNote, validateNote, deleteById } = require('../../lib/notes');

// import notes data
let notes = require('../../db/db');

// Get notes
notesRouter.get('/notes', (req, res) => {
    // sends data back to client as json
    res.json(notes);
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

    // // DOES NOT WORK, sending as args to function
    // deleteById(req.params.id, notes);
    
    // // DOES NOT WORK, creating a new variable
    // // filter notes array to remove note with id = id
    // const newNotes = notes.filter(note => note.id !== req.params.id);

    // THIS WORKS, setting to same variable and having function here!!
    const newNote = notes.filter(note => note.id !== req.params.id);

    // save notes array to json file
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(newNote, null, 2)
    );

    res.json({
        message: 'Note deleted.',
        data: newNote
    })
});
// req = will contain information about the call to the server, the path, the query parameters, and maybe path parameters
// res = will contain information that gets sent back to the client

module.exports = notesRouter;

