const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./modules/pool')

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables


app.get('/artist', (req, res) => {
    const queryText = `SELECT * FROM artist ORDER BY birthdate DESC`
    
    pool.query(queryText).then((result) => {
        console.log(result)
        res.send(result.rows)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
});

app.post('/artist', (req, res) => {
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

app.get('/song', (req, res) => {
    const queryText = `SELECT * FROM song ORDER BY title`

    pool.query(queryText).then((result) => {
        console.log(result)
        res.send(result.rows)
    }).catch((err) => {
        console.log(err)
        res.sendStatus(500)
    })
});

app.post('/song', (req, res) => {
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


