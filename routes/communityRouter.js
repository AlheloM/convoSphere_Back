const router=require('express').Router()
const communityController=require('../controllers/communityController')

router.get('/',communityController.getCommunity)
router.post("/",communityController.createCommunity)
router.post('/:community_id',communityController.updateCommunity)
router.delete('/community_id',communityController.deleteCommunity)

module.exports=router