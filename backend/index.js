const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

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

app.get('/sampletext/:languageCode', (req, res) => {
  res.status(200);
  res.json({ text: sampleText[req.params.languageCode] });
  res.end();
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
