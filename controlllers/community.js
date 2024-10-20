const { Community } = require("../models/community");

create_community = async (req, res) => {

  const formData = req.body

  Community.create({...req.body})

};

module.exports= {
  create_community
}