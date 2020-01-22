var express = require('express');
var router = express.Router();
const {getAll,getUser,newUser} = require('../db/api/users');
const crypto = require('crypto');

router.get('/', function(req, res, next) {
    getAll(req.query)
    .then(users => res.status(200).json({users}))
    .catch(error => res.status(500).json({error: error.message}));
});

// router.post('/', function(req, res) {
//     let {email, password} = req.body;
//     password = crypto.pbkdf2Sync(password, 'realtor', 100000, 64, 'sha512').toString('base64');
//     DB.getUser(email, password).then((result)=>{
//         result.length > 0?
//             (res.cookie("user", result[0]),
//             res.send(result[0])):
//                 res.status(401).json({status: 401,msg:"error"})
//     })
// })



router.post('/', async function(req, res, next) {
    console.log('body1', req.body)
    try {
        console.log('body2', req.body)
        let {email, password, first_name, last_name, phone} = req.body;
        password = crypto.pbkdf2Sync(req.body.password, 'realtorrocks', 100000, 64, 'sha512');
        console.log("signup ", email, password, first_name, last_name, phone)
        newUser(email, password, first_name, last_name, phone)
    }catch(error){
        console.log(error)
    }
})

module.exports = router;