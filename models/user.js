const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  community_id: { type: String },
  communityIn_id: { type: String },
  followers: { type: String },
  following: { type: String },
  passwordDigest: { type: String },
  image: String
})
const User = mongoose.model('User', userSchema)

module.exports = User
