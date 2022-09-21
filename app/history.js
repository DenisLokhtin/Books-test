const express = require("express");
const router = express.Router();
const mysqlDb = require('../mysqlDb');

router.get('/', async (req, res) => {
    try {
        const [history] = await mysqlDb.getConnection().query(
            'SELECT * FROM history'
        );

        res.send(history);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [selectedHistory] = await mysqlDb.getConnection().query(
            'SELECT * FROM ?? where id = ?',
            ['history', req.params.id]
        );

        if (!selectedHistory[0]) {
            return res.status(404).send('Not found');
        }

        res.send(selectedHistory[0]);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.post('/', async (req, res) => {
    if (!req.body.books_id && !req.body.user_id) {
        return res.status(400).send('Data not valid');
    }

    const history = {
        books_id: req.body.books_id,
        user_id: req.body.user_id,
    };

    try {
        const newHistory = await mysqlDb.getConnection().query(
            'INSERT INTO ?? (user_id, books_id) VALUES (?, ?)',
            ['history', history.books_id, history.user_id]
        );

        res.send({
            id: newHistory['0']['insertId'],
            ...history,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query(
            'DELETE FROM ?? WHERE id = ? ',
            ['history', req.params.id]
        );

        res.send('Delete successful');
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;