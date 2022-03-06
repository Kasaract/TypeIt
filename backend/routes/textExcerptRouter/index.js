const express = require('express');

const textExcerptZHRouter = require('./textExcerptZHRouter');
const textExcerptDERouter = require('./textExcerptDERouter');

const textExcerptRouter = express.Router({ mergeParams: true });

textExcerptRouter.use('/ZH', textExcerptZHRouter);
textExcerptRouter.use('/DE', textExcerptDERouter);

module.exports = textExcerptRouter;
