const connection = require('../config');
const Builder = require('./builder');


function getAll({ property_type, city, min_price, max_price, number_of_room, number_of_bath, sale_status, page = 1, size = 20 }) {
    return new Promise((resolve, reject) => {
        try {
            const { query, params } = Builder.allApartments(page, size)
                .city(city)
                .minPrice(min_price)
                .maxPrice(max_price)
                .minRooms(number_of_room)
                .minBath(number_of_bath)
                .property_type(property_type)
                .sale_status(sale_status)
                .build();
            connection.query(query, params, (error, results, fields) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
        } catch (error) {
            console.log(error);
        }
    });
}

function byId(apartmentId) {
    return new Promise((resolve, reject) => {
        connection.query(`Select A.*, group_concat(I.url) images,DATE(A.created_on) date, C.name city from apartments A join images I on A.id = I.apartment_id join cities C on A.city_id = C.id where A.id = ?`,[apartmentId] ,(error, results, fields) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(results[0]);
        });
    });
}

function newApartment(user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, availability, property_type,description , main_image) {
    console.log('apartment1', user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, availability, property_type,description , main_image)
    // const {user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, available, property_type, main_image, status} = apartment
    // console.log('apartment2', apartment)
    main_image = "images/apartment/" + main_image
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO apartments (user_id,address,city_id,price,number_of_room,number_of_bath,sqft,sale_status,availability,property_type,description,main_image) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?);`, [user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, availability, property_type,description, main_image],
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


module.exports = {getAll,byId,newApartment}