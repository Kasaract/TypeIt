const express = require('express');

const VITextExcerpts = require('../../languages/textExcerpts/VI');

const textExcerptVIRouter = express.Router({ mergeParams: true });

const numOfExcerpts = VITextExcerpts.length;

textExcerptVIRouter.route('/').get((req, res) => {
  let excerptID = Math.floor(Math.random() * 1);
  res.status(200).send({
    id: excerptID,
    words: VITextExcerpts[excerptID],
  });
});

module.exports = textExcerptVIRouter;
