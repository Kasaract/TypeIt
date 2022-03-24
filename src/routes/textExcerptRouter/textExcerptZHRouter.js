const express = require('express');

const ZHTextExcerpts = require('../../languages/textExcerpts/ZH');

const textExcerptZHRouter = express.Router({ mergeParams: true });

const numOfExcerpts = ZHTextExcerpts.length;

textExcerptZHRouter.route('/').get((req, res) => {
  let excerptID = Math.floor(Math.random() * numOfExcerpts);
  res.status(200).send({
    id: excerptID,
    words: ZHTextExcerpts[excerptID],
  });
});

module.exports = textExcerptZHRouter;
