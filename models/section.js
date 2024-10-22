const mongoose = require('mongoose')
const { Schema } = mongoose


const sectionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  comments:  [{type:mongoose.Schema.Types.ObjectId,ref:"comment"}]
})

const Section = mongoose.model('Section', sectionSchema)

module.exports = {Section}