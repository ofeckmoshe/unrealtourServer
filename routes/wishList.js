var express = require('express');
var router = express.Router();
const {getWishList,newWish} = require('../db/api/wishList');

router.get('/',async function(req, res, next) {
    try{
      const wishList = await getWishList(req.query.user_id)
      res.status(200).json(wishList)
    }
    catch(error){
      res.status(500).json({error: error.message})
    }
  });

  
  router.post('/', async function(req, res, next) {
    const {user_id,apartment_id} = req.body;
    try{
      await newWish(user_id,apartment_id)
      res.status(200).json({apartment_id})
    }catch(error){
      res.status(500).json({error: error.message})
    }
  });


  module.exports = router;