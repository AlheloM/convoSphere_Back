const express = require('express');
const router = express.Router();
const communityController=require('../controllers/communityController')

router.get('/',communityController.GetCommunitys)
router.post("/",communityController.CreateCommunity)
router.delete('/:community_id',communityController.DeleteCommunity)
router.post('/autoEmail',communityController.SendEmail)


module.exports=router