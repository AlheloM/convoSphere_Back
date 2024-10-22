const {Section}=require('../models')

const GetSections=async(req,res)=>{
  try{
    const sections=await Section.find({})
    res.send(sections)
  }catch(error){
    throw error
  }
}

const CreateSection= async (req,res)=>{
  
  try{
    const fod= await Section.create({...req.body})
    res.send(fod)
  }catch(error){
    throw error
  }
}

const DeleteSection=async(req,res)=>{
  try{
    await Section.deleteOne({_id:req.params.section_id})
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
  }

  module.exports={
    GetSections,
    CreateSection,
    DeleteSection,
  }