const { Community } = require('../models')
const nodemailer = require('nodemailer')
const { findById } = require('../models/comment')
require('dotenv').config()

const GetCommunitys = async (req, res) => {
  try {
    const communitys = await Community.find({})
    console.log(communitys)

    res.send(communitys)
  } catch (error) {
    throw error
  }
}

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.email,
    pass: process.env.pass
  }
})

const sendAutoReplyEmail = async (toEmail, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.email,
      to: toEmail,
      subject: subject,
      text: text
    }
    const info = await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log('error sending email', error)
  }
}

const SendEmail = async (req, res) => {
  const { name, email, message } = req.body
  await sendAutoReplyEmail(
    email,
    'community inviation',
    `you have been invited to join a community`
  )
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

const joinCommunity = async (req, res) => {
  try {
    const comm = await Community.findById(req.params.id) // Await the result
    if (!comm) {
      return res.status(404).send({ msg: 'Community not found' });
    }

    // Add the user to participants (assuming you're using a field `participants`)
    comm.participants.push(req.body)

    // Save the updated community
    await comm.save();

    res.status(200).send({ msg: 'User joined community successfully' })
  } catch (error) {
    console.error('Error joining community', error)
    res.status(500).send({ msg: 'Error joining community' })
  }
}

const unjoinCommunity = async (req, res) => {
  try {
    const comm = await Community.findById(req.params.id); // Await the result
    if (!comm) {
      return res.status(404).send({ msg: 'Community not found' });
    }

    console.log(req.body.id); 
    
    const userIndex = comm.participants.findIndex(participant => participant.id === req.body.id);
    

    if (userIndex === -1) {
      return res.status(404).send({ msg: 'User not found in participants' });
    }

    // Remove the user from participants array
    comm.participants.splice(userIndex, 1);

    // Save the updated community
    await comm.save();

    res.status(200).send({ msg: 'User unjoined community successfully' });
  } catch (error) {
    console.error('Error unjoining community', error);
    res.status(500).send({ msg: 'Error unjoining community' });
  }
};

const UpdateCommunity = async (req, res) => {
  console.log(req.body)
  try {
    const { id } = req.params;
    console.log(`Updating community with ID: ${id}`);
    
    // Validate if community ID exists before updating
    const community = await Community.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Ensure any schema validations are applied
    }).populate('fields');

    // If the community with the given ID does not exist
    if (!community) {
      return res.status(404).send({ error: 'Community not found' });
    }

    // Successfully updated
    res.status(200).send(community);
  } catch (error) {
    console.error(`Error updating community: ${error.message}`);
    
    // Send a meaningful error response
    res.status(500).send({
      error: 'An error occurred while updating the community',
      details: error.message
    });
  }
};


module.exports = {
  GetCommunitys,
  CreateCommunity,
  DeleteCommunity,
  SendEmail,
  joinCommunity,
  unjoinCommunity,
  UpdateCommunity
}