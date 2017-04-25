const express = require('express');
const router = express.Router();
const GetFeatureInfo = require('../getfeatureinfo')

/* GET users listing. */
router.get('/', function(req, res, next) {

    const point = {
        x: req.query.x,
        y: req.query.y
    }

    const size = {
        x: req.query.width,
        y: req.query.height
    }
    const getfeatureinfo = new GetFeatureInfo()

    getfeatureinfo.getFeatureInfo(point, size, req.query.bbox).then((result) => {
        res.setHeader('content-type', 'application/json');
        res.send(result);
    })

});

module.exports = router;
