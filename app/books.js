const express = require("express");
const router = express.Router();
const mysqlDb = require('../mysqlDb');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
    try {
        const [books] = await mysqlDb.getConnection().query(
            'SELECT * FROM books'
        );

        if (!books) {
            return res.status(404).send('Not found');
        }

        res.send(books);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [selectedBook] = await mysqlDb.getConnection().query(
            'SELECT * FROM ?? where id = ?',
            ['books', req.params.id]
        );

        if (!selectedBook[0]) {
            return res.status(404).send('Not found');
        }

        res.send(selectedBook[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.post('/', async (req, res) => {
    if (!req.body.title && !req.body.author) {
        return res.status(400).send('Data not valid');
    }

    const book = {
        title: req.body.title,
        author: req.body.author,
        createdAt: dayjs().format('YYYY-MM-DD'),
    };

    try {
        const newBook = await mysqlDb.getConnection().query(
            'INSERT INTO ?? (title, author, createdAt) VALUES (?, ?, ?)',
            ['books', book.title, book.author, book.createdAt]
        );

        res.send({
            id: newBook['0']['insertId'],
            ...book,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.put('/:id', async (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).send('Data not valid');
    }

    const book = {
        title: req.body.title,
        author: req.body.author,
    }

    await mysqlDb.getConnection().query(
        'UPDATE ?? SET ? WHERE id = ?',
        ['books', {...book}, req.params.id]
    );

    const [updatedBook] = await mysqlDb.getConnection().query(
        'SELECT * FROM ?? WHERE id = ?',
        ['books', req.params.id]
    );

    res.send({
        ...updatedBook['0']
    });
});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query(
            'DELETE FROM ?? WHERE id = ? ',
            ['books', req.params.id]
        );

        res.send('Delete successful');
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;