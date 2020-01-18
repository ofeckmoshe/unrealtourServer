var express = require('express');
var router = express.Router();

const {getCities} = require('../db/api/cities');

router.get('/', function(req, res, next) {
//   console.log("query: ",req.query)
  getCities()
  .then(cities => res.status(200).json({cities}))
  .catch(error => res.status(500).json({error: error.message}));
});

// router.get('/:id', function(req, res, next) {
//     CityById(req.params.id)
//     .then(city => res.status(200).json(city))
//     .catch(error => res.status(500).json({error: error.message}));
// });


module.exports = router;
