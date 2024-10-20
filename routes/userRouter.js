const router = require('express').Router()
const userController = require('../controllers/userController')
const middleware = require('../middleware')

router.post('/login', userController.Login)
router.post('/register', userController.Register)
router.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  userController.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  userController.CheckSession
)

module.exports = router