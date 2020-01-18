var express = require('express');
var router = express.Router();
const {getAll,byId} = require('../db/api/users');

router.get('/', function(req, res, next) {
    getAll(req.query)
    .then(users => res.status(200).json({users}))
    .catch(error => res.status(500).json({error: error.message}));
});

router.get('/:id', function(req, res, next) {
    byId(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({error: error.message}));
});

// router.post('/', function(req, res, next) {
//   const newUser = {
//     id: users.length+1,
//     ...req.body
//   };
//   users.push(newUser);
//   res.send(newUser);
// })

module.exports = router;