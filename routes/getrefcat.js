/**
 * Created by michogarcia on 25/04/17.
 */
const express = require('express');
const router = express.Router();
const GetFeatureInfo = require('../getfeatureinfo')

/* GET users listing. */
router.get('/', function(req, res, next) {

    const getfeatureinfo = new GetFeatureInfo()

    getfeatureinfo.getGeometry(req.query.refcat).then((result) => {
        res.setHeader('content-type', 'application/json');
        res.send(result);
    })

});

module.exports = router;