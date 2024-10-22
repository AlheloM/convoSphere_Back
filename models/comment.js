const mongoose=require('mongoose')
const {Schema}=mongoose

// Define the reply schema
const replySchema = new Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
)

// Define the issue schema
const commentSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    replies: [replySchema], // Ensure this is an array of replySchema
  },
  { timestamps: true }
);


const Comment=mongoose.model('Comment',commentSchema)

module.exports= {Comment}