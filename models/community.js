const mongoose = require('mongoose');
const { Schema } = mongoose;


const communitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  emails: { type: String, required: true },
  icon: { type: String, required: true }, // Icon field for the community
  description: { type: String }, // You can add more fields as needed
  fields: [{type:mongoose.Schema.Types.ObjectId,ref:"section"}],
  participants: []
}, { timestamps: true });

const Community = mongoose.model('Community', communitySchema);

module.exports = { Community };