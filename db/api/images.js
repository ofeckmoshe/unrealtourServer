const connection = require('../config');


function addImages(apartment_id, images){
    console.log(images)
    return new Promise((resolve, reject) => {
        try {
            let data ='';
            images.map(img => data += (`(${apartment_id},${" 'images/apartment/" + img.filename + " ' "}),`));
            data = data.slice(0, data.length -1);
            console.log(`INSERT INTO images(apartment_id, url) VALUES ${data}`)
            connection.query(`INSERT INTO images(apartment_id, url) VALUES ${data}`, (error, result, fields) =>{
                if (error){
                    console.log(error);
                    reject(error)
                }
                resolve(result)
            })
        }catch(error){
            console.log(error)
        }
    })
}

module.exports = {addImages}