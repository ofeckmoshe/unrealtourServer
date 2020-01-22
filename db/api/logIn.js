const connection = require('../config');


function logIn(email,password){
    const uncryptoPass = password.toString('base64');
    return new Promise((resolve,reject) =>{
        connection.query('select * from users where email = ? and password = ?',[email,uncryptoPass],
        (error,result,fields) =>{
            if(error){
                reject(error);
                return;
            }
            resolve(result[0]);
        })
    })
}

module.exports = {logIn}