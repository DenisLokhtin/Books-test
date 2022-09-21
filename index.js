const express = require('express');
const cors = require('cors');
const mysqlDb = require('./mysqlDb');
const books = require('./app/books');
// const users = require('./app/users');

const app = express();
const port = 8006;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/books', books);
// app.use('/users', users);

mysqlDb.connect();

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});