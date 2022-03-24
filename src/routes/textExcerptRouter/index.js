const express = require('express');

const textExcerptZHRouter = require('./textExcerptZHRouter');
const textExcerptDERouter = require('./textExcerptDERouter');

const textExcerptRouter = express.Router({ mergeParams: true });

textExcerptRouter.use('/zh', textExcerptZHRouter);
textExcerptRouter.use('/de', textExcerptDERouter);

module.exports = textExcerptRouter;
