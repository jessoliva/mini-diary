// https://desolate-bastion-64343.herokuapp.com/

// express dependency
const express = require('express');
const app = express();
const path = require("path");

// file system module dependency
const fs = require("fs");

// port for app
const PORT = process.env.PORT || 3001;

// give each note a unique id
const uniqid = require('uniqid'); 
// import functions
const { createNewNote, validateNote, deleteById } = require('./lib/notes');

// import notes data
let notes = require('./db/db');

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// To use css and js from public file
app.use(express.static('public'));

//// Routes ////
// Get notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Post new notes
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    // check if the note data has correct format
    if (!validateNote(req.body)) {
        // if data is incorrect, send error message to client
        res.status(400).send('The note is not properly formatted.');
    } 
    else {
        // if data is correct&function returns true then send that data to createNewNote
        const newNotes = createNewNote(req.body, notes);
        res.json(newNotes);
    }
});

// Delete notes
app.delete('/api/notes/:id', (req, res) => {
    
    // const newNotes = deleteById(req.params.id, notes);

    // filter notes array to remove note with id = id
    notes = notes.filter(note => note.id !== req.params.id);

    // save notes array to json file
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes, null, 2)
    );

    res.json({
        message: 'Note deleted.',
        data: notes
    })
});

// Route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Route for notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Catch all route to return to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// Port selection
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
