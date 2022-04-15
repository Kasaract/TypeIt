const express = require('express');

const textExcerptZHRouter = require('./textExcerptZHRouter');
const textExcerptDERouter = require('./textExcerptDERouter');
const textExcerptKORouter = require('./textExcerptKORouter');

const textExcerptRouter = express.Router({ mergeParams: true });

textExcerptRouter.use('/zh', textExcerptZHRouter);
textExcerptRouter.use('/de', textExcerptDERouter);
textExcerptRouter.use('/ko', textExcerptKORouter);

module.exports = textExcerptRouter;
