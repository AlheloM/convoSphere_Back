const express = require('express');
const router = express.Router();
const issueController=require('../controllers/issueController')

router.get('/',issueController.GetIssues)
router.post("/",issueController.CreateIssue)
router.post('/:issueId/reply',issueController.ReplyIssue)
router.delete('/:issue_id',issueController.DeleteIssue)

module.exports=router