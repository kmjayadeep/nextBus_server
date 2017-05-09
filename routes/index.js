var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send('ok')
});

router.use('/bus',require('./bus'))
router.use('/stop',require('./stop'))

module.exports = router;
