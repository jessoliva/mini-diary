// GIVEN a note-taking application
// WHEN I open the Note Taker
// THEN I am presented with a landing page with a link to a notes page
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column
// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page
// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes
// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column
// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

const notesRouter = require('express').Router();
// give each note a unique id
const uniqid = require('uniqid'); 

const { createNewNote, validateNote } = require('../../lib/notes');

// import notes data
const { notes } = require('../../db/db');

notesRouter.get('/notes', (req, res) => {

    // the notes declared above
    let results = notes;
    // sends data back to client as json
    res.json(results);
});

notesRouter.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } 

    else {
        // if data is correct& function returns true then send that data to createNewNote
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

module.exports = notesRouter;

