const express = require('express');
const router = express.Router({mergeParams: true});
const Template = require('../models/Template');
const CampaignCategory = require('../models/CampaignCategory');

router.get('/', (req, res, next) => {
  'use strict';
  let category_id = Number(req.params.category_id);
  let template = new Template('/templates');
  let category = new CampaignCategory('/categories');
  let category_promise = new Promise((resolve, reject) => {
    category.find(category_id, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  let template_promise = new Promise((resolve, reject) => {
    template.where('category_id', category_id, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });

  Promise.all([category_promise, template_promise])
  .then((results) => {
    let [category, templates] = results;
    Object.assign(res.locals, {
      templates: templates,
      category_name: category.body.data.category_name,
    });
    res.template = 'templates/index';
    next();
  })
  .catch((reason) => next(reason));
});

module.exports = router;
