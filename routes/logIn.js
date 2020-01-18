var express = require('express');
var router = express.Router();
const {logIn} = require('../db/api/logIn');

router.post('/', function(req, res, next) {
    const {email , password} = req.body;
    logIn(email, password)
        .then((user) =>{
            res.cookie('auth',json.stringify(user));
            res.status(200).json('ok');
        }).catch(error => res.status(401).json({status: 401,errors:'Invalid email or password'}))

});

  module.exports = router;