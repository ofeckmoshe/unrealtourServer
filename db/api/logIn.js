const connection = require('../config');

function logIn(email,password){
    return new Promise((resolve,reject) =>{
        connection.query('select * from users where email = ? and password = ?',[email,password],
        (error,result,fields) =>{
            if(error){
                reject(error);
                return;
            }
            resolve(result);
        })
    })
}

module.exports = {logIn}