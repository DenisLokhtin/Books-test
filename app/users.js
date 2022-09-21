const express = require("express");
const router = express.Router();
const mysqlDb = require('../mysqlDb');
const dayjs = require('dayjs');

router.get('/', async (req, res) => {
    try {
        const [users] = await mysqlDb.getConnection().query(
            'SELECT * FROM users'
        );

        if (!users) {
            return res.status(404).send('Not found');
        }

        res.send(users);
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [history] = await mysqlDb.getConnection().query(
            'SELECT * FROM ?? where user_id = ?',
            ['history', req.params.id]
        );

        const Books = [];

        for (const elem of history) {
            const [booksElem] = await mysqlDb.getConnection().query(
                'SELECT * FROM ?? where id = ?',
                ['books', req.params.id]
            );
            Books.push(booksElem[0]);
        }

        const [selectedUser] = await mysqlDb.getConnection().query(
            'SELECT * FROM ?? where id = ?',
            ['users', req.params.id]
        );

        if (!selectedUser[0]) {
            return res.status(404).send('Not found');
        }

        res.send({...selectedUser[0], Books});
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.post('/', async (req, res) => {
    if (!req.body.firstName && !req.body.lastName && !req.body.age && !req.body.isFree) {
        return res.status(400).send('Data not valid');
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        isFree: req.body.isFree,
        createdAt: dayjs().format('YYYY-MM-DD'),
    };

    try {
        const newUser = await mysqlDb.getConnection().query(
            'INSERT INTO ?? (firstName, lastName, age, isFree, createdAt) VALUES (?, ?, ?, ?, ?)',
            ['users', user.firstName, user.lastName, user.age, user.isFree, user.createdAt]
        );

        res.send({
            id: newUser['0']['insertId'],
            ...user,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

router.put('/:id', async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.age) {
        return res.status(400).send('Data not valid');
    }

    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        isFree: req.body.isFree,
        updatedAt: dayjs().format('YYYY-MM-DD'),
    }

    await mysqlDb.getConnection().query(
        'UPDATE ?? SET ? WHERE id = ?',
        ['users', {...user}, req.params.id]
    );

    const [updatedUser] = await mysqlDb.getConnection().query(
        'SELECT * FROM ?? WHERE id = ?',
        ['users', req.params.id]
    );

    res.send({
        ...updatedUser['0']
    });
});

router.delete('/:id', async (req, res) => {
    try {
        await mysqlDb.getConnection().query(
            'DELETE FROM ?? WHERE id = ? ',
            ['users', req.params.id]
        );

        res.send('Delete successful');
    } catch (e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    }
});

module.exports = router;