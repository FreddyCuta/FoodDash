const {Pool} = require('pg')
const {db} = require('./config');
const pool = new Pool({
    user: db.dbUser,
    host: db.dbHost,
    password: db.dbPassword,
    database: db.dbName,
    port: db.dbPort
});

module.exports = pool;