const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const books = require('./app/books');
const users = require('./app/users');
const history = require('./app/history');
require('dotenv').config()

require('dotenv').config()
const app = express();
const port = process.env.API_PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/books', books);
app.use('/users', users);
app.use('/history', history);

mysqlDb.connect();

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});