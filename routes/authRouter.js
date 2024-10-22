const router = require('express').Router()
const authController = require('../controllers/auth')
const middleware = require('../middleware')


router.post('/signIn', authController.SignIn)
router.post('/register', upload.single('image'), authController.Register)
router.put(
  '/update/:auth_id',
  middleware.stripToken,
  middleware.verifyToken,
  authController.UpdatePassword
)
router.put('/user/:id/follow', middleware.stripToken, middleware.verifyToken, authController.Follow);
router.put('/user/:id/unfollow',  authController.UnFollow);

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
)

module.exports = router

