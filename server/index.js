const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(morgan('combined'));

app.route('/')
    .post((req, res) => {
        res.send('Got a POST request');
    })
    .get((req, res) => res.send('Testing the Deadhead server'));

app.listen(port, () => {
    console.log(`Deadhead server is running on port ${port}`);
});