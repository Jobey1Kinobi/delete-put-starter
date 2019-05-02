const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req,res) => {
    const queryString = `SELECT * FROM restaurants;`;

    pool.query(queryString)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('Error getting data from database: ', err);
            res.sendStatus(500);
        })
});

router.post('/', (req,res) => {
    const restaurantObject = req.body;

    const queryString = `INSERT INTO restaurants (name, address, bestfood)
                    VALUES ($1,$2,$3);`;

    pool.query(queryString, [restaurantObject.name, restaurantObject.address, restaurantObject.bestfood])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error saving to DB: ', err);
            res.sendStatus(500);
        });
});


router.delete('/delete/:id', (req,res) => {
    console.log(req.params.id)

    const queryString = `DELETE FROM "restaurants" WHERE id='$1';`;

    pool.query(queryString, [req.params.id])
    .then((response) => {
        console.log(response)
    })

    .catch((err) => {
        console.log('Error deleting: ', err);
    });
}

module.exports = router;