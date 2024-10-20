const mongoose = require('mongoose');
const { Issue } = require('./issue'); // Ensure this is the correct path
const { Community } = require('./community'); // Ensure this is the correct path

// const Issue = mongoose.model('Issue', issueSchema); // Create the Issue model

module.exports = {
  Issue,
  Community
};
