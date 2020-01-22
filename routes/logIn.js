var express = require('express');
var router = express.Router();
const {logIn} = require('../db/api/logIn');
const crypto = require('crypto');

router.post('/', async (req, res, next) => {
    try{
        const {email , password} = req.body;
        new1 = crypto.pbkdf2Sync(password, 'realtorrocks', 100000, 64, 'sha512');
        new2 = new1.toString('base64');
        const user = await logIn(email, new2);
        res.cookie('user',JSON.stringify(user), {maxAge: 1000*60*60*24*24});
        res.status(200).json(user);
    }catch(error){
        res.status(401).json({status: 401,errors:'Invalid email or password'});
    }
});

module.exports = router;