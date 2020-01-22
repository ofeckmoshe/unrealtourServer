var express = require('express');
var router = express.Router();
const multer = require('multer');

const {getAll, byId, newApartment} = require('../db/api/apartments');
const {addImages} = require('../db/api/images');


const storage = multer.diskStorage({ 
  destination: function(req, file, cb){
      cb(null, 'public/images/apartment')
  }, 
  filename: function(req, file, cb){
      cb(null,new Date().getMinutes() + '-' + file.originalname)
  }
});
const upload = multer({storage})

router.get('/', function(req, res, next) {
  // console.log("query: ",req.query);
  // console.log('cookies', req.cookies);
  getAll(req.query)
  .then(apartments => res.status(200).json({apartments}))
  .catch(error => res.status(500).json({error: error.message}));
});

router.get('/:id', function(req, res, next) {
    byId(req.params.id)
    .then(apartment => res.status(200).json(apartment))
    .catch(error => res.status(500).json({error: error.message}));
});

router.post('/', upload.array('images'), async function(req, res, next) {
  try{
    const images = req.files;
    const main_image = new Date().getMinutes() + '-' + req.files[0].originalname;
    const {user_id, address,city_id, price, number_of_room, number_of_bath,sqft, sale_status, availability, property_type, description} = req.body;
    const newAppId = await newApartment(user_id, address, city_id, price, number_of_room, number_of_bath,sqft, sale_status, availability, property_type,description, main_image);
    await addImages(newAppId, images)
    res.status(200).json({id:newAppId})
  }catch(error){
    res.status(500).json({error: error.message})
  }
});

module.exports = router;
