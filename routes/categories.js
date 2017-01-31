const express = require('express');
const router = express.Router();
const CampaignCategory = require('../models/CampaignCategory');

const categoryInstanceRouter = require('./category-instance');

router.get('/', (req, res, next) => {
  'use strict';
  const category = new CampaignCategory('/categories');
  category.all((err,result) => {
    if (err) { return next(err); }
    Object.assign(res.locals, {
      categories: result.body.data,
    });
    res.template = 'categories/index';
    next();
  });
});

router.use('/:category_id', categoryInstanceRouter);

module.exports = router;
