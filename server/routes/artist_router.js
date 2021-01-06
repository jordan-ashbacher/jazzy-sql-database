const express = require('express')
const router = express.Router()
const pool = require('../modules/pool')

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM artist ORDER BY birthdate DESC`
    
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
    
    const queryText = (`INSERT INTO artist (name, birthdate)
    VALUES ($1, $2)`)
    
    pool.query(queryText, [req.body.name, req.body.birthdate])
    .then((result) => {
        console.log(result)
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })

});



module.exports = router;