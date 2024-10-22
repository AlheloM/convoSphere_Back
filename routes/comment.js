const express = require('express');
const router = express.Router();
const commentController=require('../controllers/commentController')

router.get('/',commentController.GetComments)
router.post("/",commentController.CreateComment)
router.delete('/:comment_id',commentController.DeleteComment)
// Route to post a reply to an issue
router.post('/:id/reply',commentController.ReplyComment )

module.exports = router;
