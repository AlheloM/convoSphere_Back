const router=require('express').Router()
const sectionController=require('../controllers/sectionController')

router.get('/',sectionController.getsection)
router.post("/",sectionController.createsection)
router.post('/:section_id',sectionController.updatesection)
router.delete('/section_id',sectionController.deletesection)

module.exports=router