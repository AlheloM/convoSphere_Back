const mongoose=require('mongoose')
const {Schema}=mongoose

const commentSchema= new Schema({
  topic:{type:String},
  content:{type:String}
})

const Comment=mongoose.model('Comment',commentSchema)

module.exports=Comment