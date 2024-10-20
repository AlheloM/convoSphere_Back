const mongoose = require('mongoose');
const { issue } = require('./issue'); // Ensure this is the correct path
const { community } = require('./community'); // Ensure this is the correct path
const { comment } = require('./comment');
const { section } = require('./section');
// const Issue = mongoose.model('Issue', issueSchema); // Create the Issue model

module.exports = {
  issue,
  comment,
  section,
  community
};
