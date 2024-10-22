const mongoose = require('mongoose');
const { Community } = require('./community'); // Ensure this is the correct path
const {Comment } = require('./comment');
const { Section } = require('./section');
const {User} = require('./user');

module.exports = {
  Comment,
  Section,
  Community,
  User
};
