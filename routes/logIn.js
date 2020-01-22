var express = require('express');
var router = express.Router();
const {logIn} = require('../db/api/logIn');

router.post('/', async (req, res, next) => {
    try{
        const {email , password} = req.body;
        const user = await logIn(email, password);
        console.log('login', user);
        res.cookie('user',JSON.stringify(user), {maxAge: 1000*60*60*24*24});
        res.status(200).json(user);
    }catch(error){
        res.status(401).json({status: 401,errors:'Invalid email or password'});
    }
});

module.exports = router;