var express = require('express');
var router = express.Router();
var models = require('../models')
var _ = require('underscore')
var admin = require('../firebase')
var firebaseDb = admin.database()
var request = require('request-json');
var client = request.createClient('http://maps.googleapis.com/maps/api/distancematrix/');

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
    var source, destination
    var busesData
    models.busStop.findAll()
        .then(stops => {
            source = stops.reduce((first, second) => {
                var dist1 = (src[0] - first.latitude) * (src[0] - first.latitude) + (src[1] - first.longitude) * (src[1] - first.longitude)
                var dist2 = (src[0] - second.latitude) * (src[0] - second.latitude) + (src[1] - second.longitude) * (src[1] - second.longitude)
                if (dist1 < dist2)
                    return first
                return second
            })
            destination = stops.reduce((first, second) => {
                var dist1 = (dest[0] - first.latitude) * (dest[0] - first.latitude) + (dest[1] - first.longitude) * (dest[1] - first.longitude)
                var dist2 = (dest[0] - second.latitude) * (dest[0] - second.latitude) + (dest[1] - second.longitude) * (dest[1] - second.longitude)
                if (dist1 < dist2)
                    return first
                return second
            })
            console.log(source.name + ' to ' + destination.name)
            return models.route.findAll({
                include: [{
                        model: models.busStop,
                        attributes: ['id', 'name', 'latitude', 'longitude'],
                        where: {
                            id: {
                                $or: [source.id, destination.id]
                            }
                        }
                    }
                    // ,models.bus
                ],
                attributes: ['name', 'id']
            })
        })
        .then(routesData => {
            let routes = routesData.filter(ro => {
                if (ro.busStops.length < 2)
                    return false
                if (ro.busStops[0].routeBusStop.id < ro.busStops[1].routeBusStop.id && ro.busStops[0].id == source.id)
                    return true
                if (ro.busStops[0].routeBusStop.id > ro.busStops[1].routeBusStop.id && ro.busStops[0].id == destination.id)
                    return true
                return false
            })
            let routeIds = _.pluck(routes, 'id')
            return models.bus.findAll({
                where: {
                    routeId: {
                        $in: routeIds
                    }
                }
            })
        }).then(buses => {
            busesData = buses
            var busIds = _.pluck(buses, 'gpsId')
            var ref = firebaseDb.ref('/')
            return new Promise((resolve, reject) => {
                ref.once('value', snapshot => {
                    var values = snapshot.val()
                    resolve(values)

                }, (err) => {
                    reject(err)
                })
            })
        })
        .then(values => {
            var busLoc = busesData.map(bus => {
                var result = bus.toJSON()
                result.location = values[bus.gpsId]
                return result
            })
            var locations = _.pluck(busLoc, 'location')
            var origins = locations.map(location => {
                    if (location)
                        return location.lat + ',' + location.long
                })
                .join('|')
            console.log(origins)
                // var destinations = locations.map(l => {
                //     return src[0] + ',' + src[1]
                // }).join('|')
            var destinations = src[0] + ',' + src[1]
            console.log('json?origins=' + origins + '&destinations=' + destinations)
            return client.get('json?origins=' + origins + '&destinations=' + destinations)
        }).then(data => {
            if (data && data.body && data.body.status == 'OK') {
                // res.json(data.body.rows)
                for (var i = 0; i < data.body.rows.length; i++) {
                    var elements = data.body.rows[i].elements
                    console.log(elements)
                    busesData[i] = busesData[i].toJSON()
                    busesData[i].estimation = {
                        distance: elements[0].distance.text,
                        duration: elements[0].duration.text
                    }
                }
                res.json(busesData)
            } else
                return res.status(400).json('error')
        })
        // .catch(err => {
        //     res.status(400).json(err)
        // })
})

module.exports = router;
