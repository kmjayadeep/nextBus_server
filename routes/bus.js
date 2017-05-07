var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.bus.findAll()
        .then(bus => {
            res.json(bus)
        }).catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router;
