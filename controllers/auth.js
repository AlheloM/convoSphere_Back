const { User } = require('../models')
const middleware = require('../middleware')

// Helper function to send standardized responses
const sendResponse = (res, status, message, data = null) => {
  return res
    .status(status)
    .send({ status: status === 200 ? 'Success' : 'Error', message, data })
}

const Register = async (req, res) => {
  try {
    console.log('Register request body: ', req.body)
    const { email, password, name } = req.body

    const image = req.file ? `/uploads/${req.file.filename}` : undefined

    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return sendResponse(
        res,
        400,
        'A user with that email has already been registered!'
      )
    }

    const user = await User.create({
      name,
      email,
      passwordDigest,
      image
    })
    return sendResponse(res, 201, 'User registered successfully!', user)
  } catch (error) {
    console.error('Error in Register:', error)
    return sendResponse(res, 500, 'An error occurred during registration.')
  }
}

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return sendResponse(res, 401, 'User not found.')
    }

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )

    if (matched) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image
      }
      const token = middleware.createToken(payload)
      return sendResponse(res, 200, 'Login successful!', {
        user: payload,
        token
      })
    }

    return sendResponse(res, 401, 'Invalid credentials.')
  } catch (error) {
    console.error('Error in SignIn:', error)
    return sendResponse(res, 500, 'An error occurred during sign-in.')
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.params.user_id)

    if (!user) {
      return sendResponse(res, 404, 'User not found.')
    }

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )

    if (matched) {
      const passwordDigest = await middleware.hashPassword(newPassword)
      await User.findByIdAndUpdate(req.params.user_id, { passwordDigest })
      return sendResponse(res, 200, 'Password updated successfully!')
    }

    return sendResponse(res, 401, 'Old password did not match.')
  } catch (error) {
    console.error('Error in UpdatePassword:', error)
    return sendResponse(res, 500, 'An error occurred updating password.')
  }
}

const CheckSession = (req, res) => {
  const { payload } = res.locals
  return sendResponse(res, 200, 'Session is valid!', payload)
}

const searchUser = async (req, res) => {
  try {
    const users = await User.find({ name: new RegExp(req.query.name, 'i') }) // Case insensitive search
    return sendResponse(res, 200, 'Users found!', users)
  } catch (error) {
    console.error('Error in searchUser:', error)
    return sendResponse(
      res,
      500,
      'An error occurred while searching for users.'
    )
  }
}

const getMyUser = async (req, res) => {
  try {
    const userId = res.locals.payload.id; 
    const user = await User.findById(userId)
      .select('-password')
      .populate('followers following', '-password');

    if (!user) {
      return sendResponse(res, 404, 'User not found.');
    }

    return sendResponse(res, 200, 'User retrieved successfully!', user);
  } catch (error) {
    console.error('Error in getMyUser:', error);
    return sendResponse(res, 500, 'An error occurred while retrieving user.');
  }
};


const getUser = async (req, res) => {
 
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('followers', 'name')
      .populate('following', 'name');

    if (!user) {
      return sendResponse(res, 404, 'User not found.')
    }

    return sendResponse(res, 200, 'User retrieved successfully!', user)
  } catch (error) {
    console.error('Error in getUser:', error)
    return sendResponse(res, 500, 'An error occurred while retrieving user.')
  }
}

const updateUser = async (req, res) => {
  try {
    const { image, name } = req.body
    await User.findByIdAndUpdate(req.user._id, { image, name }, { new: true })
    return sendResponse(res, 200, 'Profile updated successfully!')
  } catch (error) {
    console.error('Error in updateUser:', error)
    return sendResponse(res, 500, 'An error occurred while updating profile.')
  }
}

const Follow = async (req, res) => {
  const userId = res.locals.payload.id; 
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, 'User not found.');
    }

    if (user.followers.includes(userId)) {
      return sendResponse(res, 400, 'You are already following this user.');
    }

    user.followers.push(userId);
    await user.save();

    
    const followUser = await User.findById(userId);
    followUser.following.push(req.params.id);
    await followUser.save();

    return sendResponse(res, 200, 'Followed user successfully!');
  } catch (error) {
    console.error('Error in Follow:', error);
    return sendResponse(res, 500, 'An error occurred while following the user.');
  }
}

const UnFollow = async (req, res) => {
  const userId = res.locals.payload.id; 
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendResponse(res, 404, 'User not found.');
    }

    if (!user.followers.includes(userId)) {
      return sendResponse(res, 400, 'You are not following this user.');
    }

    user.followers.pull(userId);
    await user.save();

   
    const followUser = await User.findById(userId);
    followUser.following = followUser.following.filter(id => id.toString() !== req.params.id);
    await followUser.save();

    return sendResponse(res, 200, 'Unfollowed user successfully!');
  } catch (error) {
    console.error('Error in UnFollow:', error);
    return sendResponse(res, 500, 'An error occurred while unfollowing the user.');
  }
}


const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('following', '-password');
    if (!user) {
      return sendResponse(res, 404, 'User not found.');
    }
    return sendResponse(res, 200, 'Following users retrieved successfully!', user.following);
  } catch (error) {
    console.error('Error in getFollowing:', error);
    return sendResponse(res, 500, 'An error occurred while retrieving following users.');
  }
}


module.exports = {
  Register,
  SignIn,
  UpdatePassword,
  CheckSession,
  searchUser,
  getUser,
  updateUser,
  Follow,
  UnFollow,

  getMyUser,

  getFollowing,

}
