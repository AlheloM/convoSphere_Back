const mongoose = require('mongoose')
const { Schema } = mongoose
const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  community_id: { type: String },
  communityIn_id: { type: String },
  followers: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  following: { type: [mongoose.Schema.Types.ObjectId], ref: 'User' },
  passwordDigest: { type: String },
  image: { type: String }
})
const User = mongoose.model('User', userSchema)
module.exports = User