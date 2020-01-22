var express = require('express');
var router = express.Router();
const {getAll,getUser} = require('../db/api/users');

router.get('/', function(req, res, next) {
    getAll(req.query)
    .then(users => res.status(200).json({users}))
    .catch(error => res.status(500).json({error: error.message}));
});

router.post('/', function(req, res) {
    let {email, password} = req.body;
    password = crypto.pbkdf2Sync(password, 'realtor', 100000, 64, 'sha512').toString('base64');
    DB.getUser(email, password).then((result)=>{
        result.length > 0?
            (res.cookie("user", result[0]),
            res.send(result[0])):
                res.status(401).json({status: 401,msg:"error"})
    })
})

// router.get('/:user', function(req, res, next) {
//     getUser(req.params.user)
//     .then(user => res.status(200).json(user))
//     .catch(error => res.status(500).json({error: error.message}));
// });

// router.post('/', function(req, res, next) {
//   const newUser = {
//     id: users.length+1,
//     ...req.body
//   };
//   users.push(newUser);
//   res.send(newUser);
// })

module.exports = router;