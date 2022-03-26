const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const apiRoutes = require('./routes/apiRoutes'); // notes api routes
const htmlRoutes = require('./routes/htmlRoutes'); // index routes

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to use css and js from public file
app.use(express.static('public'));

// app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});