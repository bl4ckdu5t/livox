const express = require('express');
const router = express.Router({mergeParams: true});

const categoryTemplateRouter = require('./template');

router.use('/template(s?)', categoryTemplateRouter);
module.exports = router;
