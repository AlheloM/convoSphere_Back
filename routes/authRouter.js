const router = require('express').Router()
const authController = require('../controllers/auth')
const middleware = require('../middleware')
const multer = require('multer')
const path = require('path')

// Set up multer storage (as shown previously)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)

    cb(null, './public/uploads/') // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    console.log(file)

    cb(null, `${Date.now() + path.extname(file.originalname)}`) // Unique filename
  }
})

const upload = multer({ storage: storage })

// const upload = multer({ dest: './public/uploads' })

router.post('/signIn', authController.SignIn)
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