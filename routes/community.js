const router=require('express').Router()
const communityController=require('../controllers/communityController')

router.get('/',communityController.getCommunity)
router.post("/communities",communityController.create_community)
router.post('/:community_id',communityController.updateCommunity)
router.delete('/community_id',communityController.deleteCommunity)
router.put('/join/:id/:userid', communityController.joinCommunity);  // Use params for IDs
router.put('/unjoin/:id/:userid', communityController.unjoinCommunity);  // Use params for IDs

module.exports=router