const express = require('express');
const router = express.Router({mergeParams: true});
const _ = require('lodash');
const moment = require('moment');
const Campaign = require('../models/Campaign');
const Worker = require('../models/Worker');
const reportLib = require('../libs/reportLib');

router.get('/', (req, res, next) => {
  'use strict';
  let campaigns_promise = new Promise((resolve, reject) => {
    let campaign = new Campaign('/campaigns');
    let campaign_id = req.params.campaign_id;
    campaign.submissions(campaign_id, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });

  let workers_promise = new Promise((resolve, reject) => {
    let worker = new Worker('/workers');
    worker.all((err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });

  Promise.all([campaigns_promise, workers_promise]).then((results) => {
    let [campaign, workers] = results;
    let campaign_data = campaign.body.data;
    let workers_data = workers.body.data;
    let workersWithMeta = reportLib
    .merge_meta(campaign_data.submissions, workers_data);
    let questions = campaign_data.campaign.form_data
    .filter(o => o.name !== 'verification');
    console.log(questions);
    Object.assign(res.locals, {
      campaign: campaign_data.campaign,
      submissions: campaign_data.submissions,
      submissions_string: JSON.stringify(
        campaign_data.submissions.map(o => o.submission_data)
        ),
      questions: questions,
      questions_string: JSON.stringify(questions),
      present_date: moment().format('ddd MMM Do, YYYY'),
      workers: workersWithMeta,
      workers_string: JSON.stringify(workersWithMeta)
    });
    res.template = 'reports/index';
    next();
  })
  .catch((reason) => next(reason));
});

module.exports = router;
