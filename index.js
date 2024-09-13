const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

// Create a write stream (in append mode) for the access.log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'src', 'access.log'), { flags: 'a' });

// Use Morgan logger middleware to log requests in a predefined format
app.use(morgan('combined', { stream: accessLogStream }));

// Middleware to parse incoming JSON request body
app.use(express.json());

// Define routes
app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Home Page');
});

app.get('/get-users', (req, res) => {
    res.status(200).send('Getting Users...');
});

app.post('/add-user', (req, res) => {
    res.status(201).send('User added successfully');
});

app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    res.status(201).send(`User with ID ${id} updated successfully`);
});

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).send(`User with ID ${id} deleted successfully`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
