const connection = require('../config');
const Builder = require('./builder');

function getAll({page = 1, size = 10}) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        // const {query,params} = builder.allUsers(page, size)
        //                 .build()
        connection.query(`Select * from users`, (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function getUser(email, password) {
    return new Promise((resolve, reject) => {
        connection.query(`Select * from users WHERE email = ? and password = ?`,[email, password] ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function newUser(email, password, first_name, last_name, phone) {
    password = password.toString('base64');
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO users (email, password, first_name, last_name, phone, role_id) 
        VALUES (?,?,?,?,?,?);`, [email, password, first_name, last_name, phone,2],
         (error, results, fields) => {
            if (error) {  
                console.log("error:" , error);
                reject(error)
                return
            };
            console.log('results', results)
            resolve(results.insertId);
        })
    })
}

module.exports = {getAll,getUser,newUser}