const {issue}=require('../models')

const GetIssues=async(req,res)=>{
  try{
    const issues=await issue.find({})
    res.send(issues)
  }catch(error){
    throw error
  }
}

const ReplyIssue=async (req, res) => {
  const { issueId } = req.params
  const { comment } = req.body

  try {
    let issue = await Issue.findById(issueId)
    if (!issue) {
      return res.status(404).send({ error: 'Issue not found' })
    }

    // Assuming each issue has a `replies` array to store replies
    issue.replies.push({ comment }) // You can also add other fields like author, timestamp, etc.

    await issue.save() // Save the updated issue document

    res.send({ replies: issue.replies }) // Return updated replies
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Error replying to issue', details: error.message })
  }
}

const CreateIssue= async (req,res)=>{
  
  try{
    const fod= await issue.create({...req.body})
    res.send(fod)
  }catch(error){
    throw error
  }
}

const DeleteIssue=async(req,res)=>{
  try{
    await issue.deleteOne({_id:req.params.issue_id})
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
  }

  module.exports={
    GetIssues,
    CreateIssue,
    DeleteIssue,
    ReplyIssue,
  }