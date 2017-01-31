const express = require('express');
const router = express.Router({mergeParams: true});
const Organization = require('../models/Organization');

router.get(['/','/profile'], (req, res, next) => {
  Object.assign(res.locals, {});
  res.template = 'settings/profile';
  next();
});

router.get('/organizations', (req, res, next) => {
  const id = req.user.id;
  const organization = new Organization(`/businesses/${id}/organizations`);
  const organization_promise = new Promise((resolve, reject) => {
    organization.all((err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  })
  organization_promise.then((result) => {
    Object.assign(res.locals, {
      organizations: result.body.data
    });
    res.template = 'organizations/index';
    next();
  }).catch(reason => next(reason));
});

module.exports = router;
