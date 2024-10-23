const express = require('express');
const router = express.Router();
const Issue = require('../models/issue'); // Adjust the path if necessary
const commentController=require('../controllers/commentController')

router.get('/',commentController.GetComments)
router.post("/",commentController.CreateComment)
router.delete('/:comment_id',commentController.DeleteComment)
// Route to post a reply to an issue
router.post('/:id/reply',commentController.ReplyComment )

router.get('/:section_id', commentController.GetCommentsBySection)
router.get('/comments/section/:sectionId', async (req, res) => {
  try {
    const comments = await Comment.find({ section: req.params.sectionId }).sort({ createdAt: -1 })
    res.json(comments)
  } catch (err) {

  }
})

module.exports = router;