const connection = require('../config');
const Builder = require('./builder');


function getCities() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT C.name FROM realtor.cities C join realtor.apartments A where A.city_id = C.id` ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            // console.log(results)
            resolve(results);
        });
    });
}


module.exports = {getCities}