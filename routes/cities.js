var express = require('express');
var router = express.Router();

const {getCities,getAllCities} = require('../db/api/cities');

router.get('/', function(req, res, next) {
//   console.log("query: ",req.query)
  getCities()
  .then(cities => res.status(200).json({cities}))
  .catch(error => res.status(500).json({error: error.message}));
});

router.get('/allCities', function(req, res, next) {
    getAllCities()
    .then(cities => res.status(200).json(cities))
    .catch(error => res.status(500).json({error: error.message}));
});


module.exports = router;
