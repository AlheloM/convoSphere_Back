const { Community } = require('../models')
const nodemailer=require('nodemailer')
require('dotenv').config()

const GetCommunitys = async (req, res) => {
  try {
    const communitys = await Community.find({})
    console.log(communitys);
    
    res.send(communitys)
  } catch (error) {
    throw error
  }
}

const transporter=nodemailer.createTransport({
  service:'Gmail',
  auth:{
    user:process.env.email,
    pass:process.env.pass
  }
})

const sendAutoReplyEmail=async (toEmail,subject,text)=>{
try {
  const mailOptions={
    from:process.env.email,
    to:toEmail,
    subject: subject,
    text:text,
  };
  const info=await transporter.sendMail(mailOptions)
} catch (error) {
  console.log('error sending email',error)
}
}

const SendEmail= async (req,res)=>{
  const {name,email,message}=req.body
  await sendAutoReplyEmail(email,'community inviation',`you have been invited to join a community`);
  res.status(200).send('email has been sent')
}

const CreateCommunity = async (req, res) => {
  try {
    const fod = await Community.create({ ...req.body })
    res.status(201).send(fod)
  } catch (error) {
    throw error
  }
}

const DeleteCommunity = async (req, res) => {
  try {
    await Community.deleteOne({ _id: req.params.community_id })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCommunitys,
  CreateCommunity,
  DeleteCommunity,
  SendEmail
}
