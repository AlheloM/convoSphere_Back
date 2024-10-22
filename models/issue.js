const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the reply schema
const replySchema = new Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// Define the issue schema
const issueSchema = new Schema(
  {
    comment: { type: String, required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: 'Section', required: true }, // Add sectionId to link issues to a section
    replies: [replySchema], // Array of replies using replySchema
  },
  { timestamps: true }
);

// Create the Issue model
const Issue = mongoose.model('Issue', issueSchema);

// Export the Issue model
module.exports = { Issue, issueSchema };
