const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const db = require('./db'); // Assuming this sets up your database connection

const auth = require('basic-auth');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

const authRouter = require('./routes/authRouter');
const commentRouter=require('./routes/comment')
const communityRouter=require('./routes/communityRouter')
const sectionRouter=require('./routes/sectionRouter')

app.use('/user', authRouter)
app.use('/comment', commentRouter)
app.use('/community', communityRouter)
app.use('/section',sectionRouter)


app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`);
});

