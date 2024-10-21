const router = require('express').Router()
const authController = require('../controllers/auth')
const middleware = require('../middleware')

// Remove the duplicate '/register' route
router.post('/signIn', authController.SignIn)
router.post('/register', authController.Register); 
// Use multer middleware
router.put(
  '/update/:auth_id',
  middleware.stripToken,
  middleware.verifyToken,
  authController.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
)

module.exports = router
