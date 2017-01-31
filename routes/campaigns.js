const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');
const url = require('../libs/urlLib');
const Campaign = require('../models/Campaign');
const Category = require('../models/CampaignCategory');
const Template = require('../models/Template');
const Organization = require('../models/Organization');
const layout = '../layouts/master.html';

const reports = require('./reports');

/* Campaigns Index */
router.get('/', (req, res, next) => {
  'use strict';
  let campaigns_promise = new Promise((resolve, reject) => {
    let campaign = new Campaign(`/businesses/${req.user.id}/campaigns`);
    campaign.all((err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  campaigns_promise.then((result) => {
    Object.assign(res.locals, {
      campaigns: result.body.data.campaigns
    });
    res.template = 'campaigns/index';
    next();
  })
  .catch((reason) => next(reason));
});

/* new Campaign */
router.get('/new', (req, res, next) => {
  'use strict';
  let template_promise = new Promise((resolve, reject) => {
    let templateId = req.query.template;
    let template = new Template('/templates');
    template.find(templateId, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    })
  });

  let organization_promise = new Promise((resolve, reject) => {
    let id = req.user.id;
    let organization = new Organization(`/businesses/${id}/organizations`);
    organization.all((err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });

  let filePromise = new Promise((resolve, reject) => {
    fs.readFile('./public/nigerianstates.json', 'utf-8', (err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data)
      }
    });
  });

  Promise.all([template_promise, filePromise, organization_promise])
  .then(([template, states, organizations]) => {
    let validators = template.body.data.form_data.validation;
    let polls = template.body.data.form_data.polls;
    const category = new Category('/categories');
    category.find(template.body.data.category_id, (err, result) => {
      let unit_rate = result.body.data.price;
      Object.assign(res.locals, {
        root_url: url.root(req),
        validators: validators,
        polls: polls,
        unit_rate: unit_rate,
        category_id: template.body.data.category_id,
        template_name: template.body.data.name,
        present_date: moment().format('ddd MMM Do, YYYY'),
        states: JSON.parse(states),
        organizations: organizations.body.data
      });
      res.template = 'campaigns/new';
      next();
    });
  })
  .catch((reason) => next(reason));
});

router.post('/create', (req, res, next) => {
  let campaigns_promise = new Promise((resolve, reject) => {
    let campaign = new Campaign('/campaigns');
    let params = JSON.parse(req.body.attributes);
    campaign.create(params, req.session.authToken, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  campaigns_promise.then((result) => {
    const json_data = {success: true, data: result.body.data};
    res.format({
      html: () => res.redirect('/campaigns'),
      json: () => res.send(json_data)
    });
  })
  .catch((reason) => {
    const json_data = { success: false, data: reason };
    res.format({
      html: () => res.redirect('back'),
      json: () => res.send(json_data)
    });
  });
});

router.use('/:campaign_id/reports', reports);

module.exports = router;
