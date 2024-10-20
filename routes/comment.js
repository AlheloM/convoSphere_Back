const express = require('express');
const router = express.Router();
const Issue = require('../models/issue'); // Adjust the path if necessary

// Route to post a reply to an issue
router.post('/:id/reply', async (req, res) => {
  try {
    const issueId = req.params.id;
    const { comment } = req.body;

    // Find the issue by ID and add the reply
    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    // Add the reply to the issue's replies array
    issue.replies.push({ comment });
    await issue.save();

    res.status(200).json(issue);
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
