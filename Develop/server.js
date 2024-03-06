const express = require('express');
const db = require('./db/db.json');

const PORT = 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log('Test String!');
})

app.get('/notes', (req, res) => {
    res.send('Notes database will display here.');
})

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})