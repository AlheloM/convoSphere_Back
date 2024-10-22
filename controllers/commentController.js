const { Comment } = require('../models')
const model = require('../models')
const Issue = require('../models/comment') // Adjust the path if necessary

const GetComments = async (req, res) => {
  try {
  console.log("moooooooooooooooooooooodel " , model)
    const comments = await Comment.find({})
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const ReplyComment = async (req, res) => {
  try {
    const issueId = req.params.id
    const { comment } = req.body

    // Find the issue by ID and add the reply
    const issue = await Issue.findById(issueId)
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' })
    }

    // Add the reply to the issue's replies array
    issue.replies.push({ comment })
    await issue.save()

    res.status(200).json(issue)
  } catch (err) {
    console.error(err) // Log error for debugging
    res.status(500).json({ message: 'Server error' })
  }
}

const CreateComment = async (req, res) => {
  try {
    console.log(Comment, 'commmmmmmmmmmmmmmmmmmment')
    console.log('reeeeeeeeeeeeeeeeeeeeeq body : ', req.body)
    const newComment = await Comment.create({ ...req.body })
    res.send(newComment)
  } catch (error) {
    throw error
  }
}

const DeleteComment = async (req, res) => {
  try {
    await Comment.deleteOne({ _id: req.params.comment_id })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetComments,
  CreateComment,
  ReplyComment,
  DeleteComment
}
