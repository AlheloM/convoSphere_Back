// Load Dependencies
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const logger = require('morgan')
const cors = require('cors')

// Require and Initialize dotenv
require('dotenv').config()

// PORT Configuration
const PORT = process.env.PORT

// Initialize Express
const app = express()

// Database Configuration
const db = require('./config/db')

app.use(express.urlencoded({ extended: true })) // To parse form data
app.use(express.json()) // To parse JSON data

// Import Routes
const commentRouter = require('./routes/commentRouter')
const communityRouter = require('./routes/communityRouter')
const sectionRouter = require('./routes/sectionRouter')
const userRouter = require('./routes/userRouter')

// Mount Routes
app.use('/comment', commentRouter)
app.use('/community', communityRouter)

app.use('/section', sectionRouter)
app.use('/user', userRouter)

// Listen for all HTTP Requests on PORT 4001
app.listen(PORT, () => {
  console.log(`ConvoSphere App is running on PORT ${PORT}`)
})