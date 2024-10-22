const mongoose = require('mongoose')
const { Schema } = mongoose

const sectionSchema = new Schema({
  name: { type: String },
  topic: { type: String },
  description: { type: String },
  comment: { type: String },
  likes: { type: String }
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = Section