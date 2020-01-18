const connection = require('../config');
const Builder = require('./builder');

function getAll({page = 1, size = 10}) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allUsers(page, size)
                        .build()
        connection.query(query, [...params,page,size], (error, results, fields) => {
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


module.exports = {getAll,getUser}