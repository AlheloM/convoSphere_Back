const { User } = require('../models')
const middleware = require('../middleware')

// image file  dependincess
const multer = require('multer')
const path = require('path') // Add this line to import the path module

// Set up multer storage (as shown previously)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/') // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    console.log(file.originalname)
    cb(null, Date.now() + file.originalname.image) // Unique filename
  }
})

// Initialize multer
upload = multer({ storage: storage }) // Expecting a single file upload with field name 'image'

// --------------

const Register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body

    const { email, password,image, name, isAdmin } = req.body

    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Checks if there has already been a user registered with that email
    let existingUser = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      console.log(image)
      // Creates a new user

      const user = await User.create({ name, email, passwordDigest,image, isAdmin })

      // Sends the user as a response
      res.send(user)
    }
  } catch (error) {
    throw error
  }
}

const SignIn = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password, image } = req.body
    // Finds a user by a particular field (in this case, email)
    const user = await User.findOne({ email })
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password,
      image
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      let payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      }
      // Creates our JWT and packages it with our payload to send as a response
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error', msg: 'An error has occurred!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    let user = await User.findById(req.params.user_id)
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email,
        image: user.image
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const searchUser = async (req, res) => {
  try {
    const users = await User.find({
      name: req.query.name
    })
    res.send({ users })
  } catch (error) {
    throw error
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers following', '-password')
    res.send({ user })
  } catch (error) {
    throw error
  }
}

const updateUser = async (req, res) => {
  try {
    const { image, name } = req.body
    await User.findOneAndUpdate({ _id: req.user._id }, { image, name })
    res.send({ msg: 'Profile has been updated' })
  } catch (error) {
    throw error
  }
}

const Follow = async (req, res) => {
  try {
    const targetUserId = req.params.id
    const currentUserId = res.locals.payload.id

    const targetUser = await User.findById(targetUserId)
    if (!targetUser) {
      return res.status(404).send({ message: 'Target user not found' })
    }

    const currentUser = await User.findById(currentUserId)
    if (!currentUser) {
      return res.status(404).send({ message: 'Current user not found' })
    }

    if (!targetUser.followers) {
      targetUser.followers = []
    }
    if (!currentUser.following) {
      currentUser.following = []
    }

    if (targetUser.followers.includes(currentUserId)) {
      return res
        .status(400)
        .send({ message: 'You are already following this user.' })
    }

    targetUser.followers.push(currentUserId)
    await targetUser.save()

    if (!currentUser.following.includes(targetUserId)) {
      currentUser.following.push(targetUserId)
    }
    await currentUser.save()

    res.send({ message: 'Followed user!' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: error.message })
  }
}

const UnFollow = async (req, res) => {
  try {
    const targetUserId = req.params.id
    const currentUserId = res.locals.payload.id

    const targetUser = await User.findById(targetUserId)
    if (!targetUser) {
      return res.status(404).send({ message: 'Target user not found' })
    }

    const currentUser = await User.findById(currentUserId)
    if (!currentUser) {
      return res.status(404).send({ message: 'Current user not found' })
    }

    if (!targetUser.followers) {
      targetUser.followers = []
    }

    if (!currentUser.following) {
      currentUser.following = []
    }

    targetUser.followers.pull(currentUserId)
    await targetUser.save()

    if (currentUser.following.includes(targetUserId)) {
      currentUser.following.pull(targetUserId)
    }
    await currentUser.save() // Save changes to the current user

    res.send({ message: 'Unfollowed user!' })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}
const getUserProfile = async (req, res) => {
  try {
    const userId = res.locals.payload.id; // Assuming you get the user ID from the token
    const user = await User.findById(userId).populate('following'); // Populate the following field

    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    const followedFriends = user.following; // This contains the users being followed
    res.send(followedFriends);
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
};


module.exports = {
  Register,
  SignIn,
  UpdatePassword,
  CheckSession,
  searchUser,
  getUser,
  updateUser,
  Follow,
  UnFollow
}
