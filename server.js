const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config()

const PORT = process.env.PORT 

const db = require('./db') // Assuming this sets up your database connection

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('auth')

const commentRouter=require('./routes/comment')
app.use('/comment',commentRouter)
const communityRouter=require('./routes/communityRouter')
app.use('/community', communityRouter)
const issueRouter=require('./routes/issueRouter')
app.use('/issue',issueRouter)
const fieldRouter=require('./routes/sectionRouter')
app.use('/field',fieldRouter)
const userRouter=require('./routes/userRouter')
app.use('/user',userRouter)



app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`)
})
