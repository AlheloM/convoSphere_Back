const { issueSchema } = require('./issue');
const mongoose = require('mongoose');
const { Schema } = mongoose;



const sectionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  comments: [issueSchema]
})

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  emails: [],
  icon: { type: String, required: true }, // Icon field for the community
  description: { type: String }, // You can add more fields as needed
  fields: [sectionSchema],
  participants: []
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = { Community };






