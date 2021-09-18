const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

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

app.get('/sampletext/EN', (err, res) => {
  res.status(200);
  res.json({ text: 'This is a sample text in English.' });
  res.end();
});

app.get('/sampletext/ZH', (err, res) => {
  res.status(200);
  res.json({ text: '我在学习中文。' });
  res.end();
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
