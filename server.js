const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const db = require('./db'); // Assuming this sets up your database connection

const { Issue } = require('./models/issue');
const { Community } = require('./models/community'); // Import your new Community model

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

// Existing issue routes...
app.get('/issues', async (req, res) => {
  let issues = await Issue.find({});
  res.send(issues);
});

app.post('/issues', async (req, res) => {
  let newIssue = await Issue.create(req.body);
  res.send(newIssue);
});

// Route for replying to a specific issue
app.post('/issues/:issueId/reply', async (req, res) => {
  const { issueId } = req.params;
  const { comment } = req.body;

  try {
    let issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).send({ error: 'Issue not found' });
    }

    // Assuming each issue has a `replies` array to store replies
    issue.replies.push({ comment }); // You can also add other fields like author, timestamp, etc.

    await issue.save(); // Save the updated issue document

    res.send({ replies: issue.replies }); // Return updated replies
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error replying to issue', details: error.message });
  }
});

// New community routes...
app.get('/communities', async (req, res) => {
  let communities = await Community.find({});
  res.send(communities);
});

app.post('/communities', async (req, res) => {
  try {
    let newCommunity = await Community.create(req.body);
    res.status(201).send(newCommunity); // Return the created community with 201 status
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: 'Error creating community', details: error.message });
  }
});

// Add more routes as necessary...

app.listen(PORT, () => {
  console.log(`Express Server Running on Port`, PORT, `. . .`);
});

