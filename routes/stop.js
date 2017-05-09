var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.busStop.findAll()
        .then(busStop => {
            res.json(busStop)
        }).catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router;
