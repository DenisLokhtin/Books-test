require('dotenv').config()

module.exports = {
    databaseOptions: {
        host: process.env.HOST,
        user: process.env.TEST_USER,
        port: process.env.PORT,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    }
};