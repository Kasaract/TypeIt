const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require("mongoose");
const TypingText = require("./TypingText");
const Users = require("./Users");

const sampleText = require('./sampleText');

const app = express();
const PORT = 4000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
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

const mongoConnectionURL = "mongodb+srv://mqliu:NdcHyB1LAM22QB9a@cluster0.qe9d9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const databaseName = "TypeIt";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: databaseName 
};

mongoose.connect(mongoConnectionURL, options)
  .then(() => console.log("Connected."))
  .catch((error) => console.log(`Error connecting to MongoDB ${error}`));

mongoose.connect(mongoConnectionURL, function(err) {
  if (err) throw err;
  TypingText.findOne({language: "ZH", texts: ["this isnt chinese", "nihao"]}).then((result)=> {
    console.log(result);
  }).catch((err) => {
    res.status(400).json({"message" : err.message});
  })

  if (err) throw err;
  var myobj = { language: "ZH", texts: ["this isnt chinese", "nihao"] };
  var testUser = {username: "ml", firstname: "machine", lastname: "learning"};
  // Users.collection.insertOne(testUser, function(err,res){
  //   if (err) throw err;
  //   console.log("inserted user");
  // });
  // TypingText.collection.insertOne(myobj, function(err, res) {
  //   if (err) throw err;
  //   console.log("1 document inserted");
  // });
  TypingText.collection.findOne({language: "EN"}).then((result)=> {
    console.log(result);
    console.log("found english!");
  });
});

app.get('/sampletext/EN', (err, res) => {
  res.status(200);
  res.json({ text: 'This is a sample text in English.' });
  res.end();
});

app.get('/sampletext/:languageCode', (req, res) => {
  res.status(200);
  TypingText.collection.findOne({language: req.params.languageCode}).then((result)=> {
    console.log(result);
    numOfTexts = result["texts"].length;
    randomIndex = getRandomInt(numOfTexts);
    res.json({text: result["texts"][randomIndex]});
  });

  res.json({ text: sampleText[req.params.languageCode] });
  res.end();
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
