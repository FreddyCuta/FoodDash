const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '110606',
    database: 'FoodDash',
    port: 5432
});

module.exports = pool;