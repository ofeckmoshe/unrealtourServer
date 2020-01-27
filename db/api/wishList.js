const connection = require('../config');

function getWishList(user_id) {
    return new Promise((resolve, reject) => {
            connection.query(`SELECT A.*,C.\`name\` as city_name FROM realtor.apartments A left join wish_list W on W.apartment_id = A.id join cities C on A.city_id = C.id where W.user_id = ?;`,[user_id],(error, results, fields) => {
                if(error){
                    reject(error)
                    return
                }
                resolve(results);    
            });      
    })
}

function newWish(user_id,apartment_id) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO realtor.wish_list (user_id,apartment_id) 
        VALUES (?,?);`, [user_id,apartment_id],
         (error, results, fields) => {
            if (error) {  
                console.log("error:" , error);
                reject(error)
                return
            };
            console.log('results', results)
            resolve(results);
        })
    })
}

module.exports = {getWishList,newWish}