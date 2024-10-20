const express = require('express');
const router = express.Router();
const sectionController=require('../controllers/sectionController')

router.get('/',sectionController.GetSections)
router.post("/",sectionController.CreateSection)
router.delete('/:section_id',sectionController.DeleteSection)
// GetSections,
// CreateSection,
// DeleteSection,
module.exports=router