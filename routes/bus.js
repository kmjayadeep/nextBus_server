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

router.post('/find', (req, res) => {
    var src = req.body.source
    var dest = req.body.destination
    models.busStop.findAll()
        .then(stops => {
            var source = stops.reduce((first, second) => {
                var dist1 = (src[0] - first.latitude) * (src[0] - first.latitude) + (src[1] - first.longitude) * (src[1] - first.longitude)
                var dist2 = (src[0] - second.latitude) * (src[0] - second.latitude) + (src[1] - second.longitude) * (src[1] - second.longitude)
                if (dist1 < dist2)
                    return first
                return second
            })
            var destination = stops.reduce((first, second) => {
                var dist1 = (dest[0] - first.latitude) * (dest[0] - first.latitude) + (dest[1] - first.longitude) * (dest[1] - first.longitude)
                var dist2 = (dest[0] - second.latitude) * (dest[0] - second.latitude) + (dest[1] - second.longitude) * (dest[1] - second.longitude)
                if (dist1 < dist2)
                    return first
                return second
            })
            console.log(source.name+' to '+destination.name)
            
        })
})

module.exports = router;
