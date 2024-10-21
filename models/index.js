const mongoose = require('mongoose')
const { issue } = require('./issue') // Ensure this is the correct path
const { Community } = require('./community') // Ensure this is the correct path
const { comment } = require('./comment')
const { section } = require('./section')
const User = require('./user')
// const Issue = mongoose.model('Issue', issueSchema); // Create the Issue model

module.exports = {
  issue,
  comment,
  section,
  Community,
  User
}
