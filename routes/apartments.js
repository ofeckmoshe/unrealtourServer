var express = require('express');
var router = express.Router();

const {getAll, byId} = require('../db/api/apartments');

router.get('/', function(req, res, next) {
  console.log("query: ",req.query)
  getAll(req.query)
  .then(apartments => res.status(200).json({apartments}))
  .catch(error => res.status(500).json({error: error.message}));
});

router.get('/:id', function(req, res, next) {
    byId(req.params.id)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
});


module.exports = router;
