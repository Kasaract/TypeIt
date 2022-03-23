const express = require('express');

const ZHTextExcerpts = require('../../languages/textExcerpts/ZH');

const textExcerptZHRouter = express.Router({ mergeParams: true });

const numOfExcerpts = ZHTextExcerpts.length;

textExcerptZHRouter.route('/').get((req, res) => {
  res.status(200).send(ZHTextExcerpts[Math.floor(Math.random() * 3)]);
});

module.exports = textExcerptZHRouter;
