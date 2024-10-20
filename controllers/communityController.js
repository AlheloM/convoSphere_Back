const { community } = require('../models')

const GetCommunitys = async (req, res) => {
  try {
    const communitys = await community.find({})
    res.send(communitys)
  } catch (error) {
    throw error
  }
}

const CreateCommunity = async (req, res) => {
  try {
    const fod = await community.create({ ...req.body })
    res.send(fod)
  } catch (error) {
    throw error
  }
}

const DeleteCommunity = async (req, res) => {
  try {
    await community.deleteOne({ _id: req.params.community_id })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetCommunitys,
  CreateCommunity,
  DeleteCommunity
}
