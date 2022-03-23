const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const TypingText = require('./models/TypingText');
const Users = require('./models/user');
const EventLogs = require('./models/EventLogs');

const sampleText = require('./sampleText');

const authRouter = require('./routes/authRouter');
const textExcerptRouter = require('./routes/textExcerptRouter');

const app = express();
const PORT = process.env.PORT || 4000;

// Deploy using: https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/auth', authRouter);
app.use('/textExcerpt', textExcerptRouter);

const mongoConnectionURL =
  // 'mongodb+srv://nguyeng:Kasaract1!@usereventlogs.wnpds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  'mongodb://localhost:27017/typeit-dev';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'TypeIt',
};

mongoose
  .connect(mongoConnectionURL, options)
  .then(() => console.log('Connected to MongoDB.'))
  .catch((error) => console.log(`Error connecting to MongoDB ${error}`));

app.get('/sampletext/:languageCode', (req, res) => {
  res.status(200);
  TypingText.collection
    .findOne({ language: req.params.languageCode })
    .then((result) => {
      console.log(`result is : ${result}`);
      console.log(`wanted language: ${req.params.languageCode}`);
      if (result === null) {
        res.json({ text: 'This language is not yet supported.' });
      } else {
        numOfTexts = result['texts'].length;
        randomIndex = Math.floor(Math.random() * numOfTexts);
        res.json({ text: result['texts'][randomIndex] });
      }
    })
    .then(() => {
      res.end();
    });
});

app.post('/addLanguageText', (req, res) => {
  res.status(200);
  text = req.body.text;
  lang = req.body.language;
  TypingText.collection.findOne({ language: lang }).then((result) => {
    result['texts'].push(text);
    result.save().then(() => {
      res.json({ text: 'added new text to db!' });
      res.end();
    });
  });
});

app.post('/addUser', (req, res) => {
  Users.collection
    .insertOne({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
    .then(() => res.end());
});

app.post('/eventlog', (req, res) => {
  EventLogs.collection
    .insertOne({
      username: req.body.username,
      language: req.body.language,
      events: req.body.events,
    })
    .then(() => res.end());
});

// app.post('/userStats', (req, res) => {
//   wpm = req.body.wpm;
//   //Users.collection.
// });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
