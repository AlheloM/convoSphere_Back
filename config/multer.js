const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer
const upload = multer({ storage: storage });

module.exports = upload