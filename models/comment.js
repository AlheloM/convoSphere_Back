const mongoose = require('mongoose')
const { Schema } = mongoose


const commentSchema = new Schema({
  content: { type: String, required: true },
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [{
    content: { type: String },
    createdAt: { type: Date, default: Date.now }
  }]

})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment