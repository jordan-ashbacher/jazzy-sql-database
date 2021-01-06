const express = require('express')
const router = express.Router()
const pool = require('../modules/pool')

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM song ORDER BY title`

    pool.query(queryText).then((result) => {
        console.log(result)
        res.send(result.rows)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
});

router.post('/', (req, res) => {
    console.log(req.body)

    const queryText = (`INSERT INTO song (title, length, released)
    VALUES ($1, $2, $3)`)

    pool.query(queryText, [req.body.title, req.body.length, req.body.released])
    .then((result) => {
        console.log(result)
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
});

module.exports = router;