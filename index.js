const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const TypingText = require('./src/models/typingText.js');
const Users = require('./src/models/user.js');
const EventLogs = require('./src/models/EventLogs.js');

require('dotenv').config();

// const sampleText = require('./sampleText');

const authRouter = require('./src/routes/authRouter');
const textExcerptRouter = require('./src/routes/textExcerptRouter');

const app = express();
const PORT = process.env.PORT || 4000;

// Deploy using: https://levelup.gitconnected.com/how-to-render-react-app-using-express-server-in-node-js-a428ec4dfe2b

// Code by: https://www.youtube.com/watch?v=xgvLP3f2Y7k&t=400s
const whitelist = [
  'http://localhost:3000/',
  'http://localhost:4000/',
  'https://typeit-server.herokuapp.com/',
  'https://whispering-bastion-09973.herokuapp.com/',
];
const corsOptions = {
  origin: (origin, callback) => {
    console.log('== Origin of request: ' + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log('Origin acceptable');
      callback(null, true);
    } else {
      console.log('Origin rejected');
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.use('/api/auth', authRouter);
app.use('/api/textExcerpt', textExcerptRouter);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

let mongoConnectionURL;

if (process.env.NODE_ENV === 'production') {
  mongoConnectionURL =
    'mongodb+srv://' +
    process.env.MONGODB_USERNAME +
    ':' +
    process.env.MONGODB_PASSWORD +
    '@usereventlogs.wnpds.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
} else {
  mongoConnectionURL = process.env.MONGODB_DEV;
}

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
