var express = require('express');
var router = express.Router();
const multer = require('multer');
const {addImages} = require('../db/api/images');


const storage = multer.diskStorage({ 
    destination: function(req, file, cb){
        cb(null, 'public/images/apartment')
    }, 
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
  });
const upload = multer({storage})

router.post('./',upload.array('images'), function(req, res){
    const images = [];
    for(var img in req.files){
        images.push(img);
    }
    addImages(req.query, images)
    .then(image => res.status(200).json({image}))
    .catch(error => res.status(500).json({error: error.message}));
})