const mongoose = require('mongoose')
const { Schema } = mongoose

const sectionSchema = new Schema({
  name: { type: String },
  topic: { type: String },
  description: { type: String },
  likes: { type: Number, default: 0 },
  field: { type: [mongoose.Schema.Types.ObjectId], ref: 'Section' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section