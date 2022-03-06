const express = require('express');

const DETextExcerpts = require('../../languages/textExcerpts/DE');

const textExcerptDERouter = express.Router({ mergeParams: true });

const numOfExcerpts = DETextExcerpts.length;

textExcerptDERouter.route('/').get((req, res) => {
  res.status(200).send(DETextExcerpts[Math.floor(Math.random() * numOfExcerpts)]);
});

module.exports = textExcerptDERouter;
