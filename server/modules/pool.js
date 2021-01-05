const pg = require('pg')
const pool = pg.Pool
const pool = new Pool({
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432
})

pool.on('connect', () => {
    console.log('PG CONNECTED')
})

pool.on('error', (err) => {
    console.log(err)
})

module.exports = pool;
