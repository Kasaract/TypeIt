const express = require('express');

const KOTextExcerpts = require('../../languages/textExcerpts/KO');

const textExcerptKORouter = express.Router({ mergeParams: true });

const numOfExcerpts = KOTextExcerpts.length;

textExcerptKORouter.route('/').get((req, res) => {
  let excerptID = Math.floor(Math.random() * 17);
  res.status(200).send({
    id: excerptID,
    words: KOTextExcerpts[excerptID],
  });
});

module.exports = textExcerptKORouter;
