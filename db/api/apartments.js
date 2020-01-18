const connection = require('../config');
const Builder = require('./builder');

function getAll({id, user_id, city,min_price,max_price, number_of_room, sale_status, number_of_bath, page = 1, size = 20}) {
    const builder = new Builder();
    return new Promise((resolve, reject) => {
        const {query,params} = builder.allApartments(page, size)
                        .id(id)
                        .user_id(user_id)
                        .city(city)
                        .min_price(min_price)
                        .max_price(max_price)
                        .number_of_room(number_of_room)
                        .number_of_bath(number_of_bath)
                        .sale_status(sale_status)
                        .build()
                        console.log(query, params);
        connection.query(query, [...params,page,size], (error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results);
        });
    });
}

function byId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`Select A.*, group_concat(I.url) images,DATE(A.created_on) date, C.name city from apartments A join images I on A.id = I.apartment_id join cities C on A.city_id = C.id where A.id = ?`,[apartmentId] ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            console.log(results)
            resolve(results[0]);
        });
    });
}


module.exports = {getAll,byId}