const router = require('express').Router()
const authController = require('../controllers/auth')
const middleware = require('../middleware')


router.post('/signIn', upload.single('image'), authController.SignIn, authController.SignIn)
router.post('/register', upload.single('image'), authController.Register)
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