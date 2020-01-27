const connection = require('../config');
const Builder = require('./builder');



function getAllCities() {
    return new Promise((resolve, reject) => {
        try {
            connection.query(`SELECT * FROM realtor.cities` ,(error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        }catch(error){
            console.log(error)
        }
    });
}

function getCities() {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT C.name FROM realtor.cities C join realtor.apartments A where A.city_id = C.id` ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}


module.exports = {getCities,getAllCities}