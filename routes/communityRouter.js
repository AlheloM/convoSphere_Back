const express = require('express');
const router = express.Router();
const communityController=require('../controllers/communityController')

router.get('/',communityController.GetCommunitys)
router.post("/",communityController.CreateCommunity)
router.post('/:community_id',communityController.UpdateCommunity)
router.delete('/community_id',communityController.DeleteCommunity)



module.exports=router