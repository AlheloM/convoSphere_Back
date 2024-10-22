const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController')

router.get('/',communityController.GetCommunitys)
router.post("/",communityController.CreateCommunity)
router.delete('/:community_id',communityController.DeleteCommunity)
router.post('/autoEmail', communityController.SendEmail)
router.put('/join/:id', communityController.joinCommunity);  // Use params for IDs
router.put('/unjoin/:id', communityController.unjoinCommunity);  // Use params for IDs
router.put('/update/:id',communityController.UpdateCommunity)



module.exports=router