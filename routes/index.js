const express = require('express');
const router = express.Router({mergeParams: true});
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const _ = require('lodash');
const passport = require('passport');
const Register = require('../models/Register');

/* Static Pages */
router.get('/', (req, res, next) => {
  'use strict';
  Object.assign(res.locals, {});
  res.template = 'home/index';
  next();
});

router.get('/solutions', (req, res, next) => {
  'use strict';
  Object.assign(res.locals, {});
  res.template = 'home/solutions';
  next();
});

router.get('/register-successful', (req, res, next) => {
  'use strict';
  Object.assign(res.locals, {});
  res.template = 'home/registered';
  next();
});
/* End Static Pages */

router.post('/register', (req, res, next) => {
  let credentials = _.omit(req.body, '_csrf');
  let registration = new Register(credentials);
  registration.save().then((reg) => {
    console.log(reg);
  }).catch((err) => {
    next(err);
  });
  res.template = 'home/registered';
  next();
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Routes To be Mounted
const settings = require('./settings');

// Mounting Routes
router.use('/settings', ensureLoggedIn(), settings);

router.use((req, res, next) => {
  if(req.user && req.user.token){
    req.session.authToken = req.user.token;
  }
  if (res.template) {
    res.locals.layout = '../layouts/master.html';
    res.locals.signed_in = req.user !== undefined;
    res.locals.current_user = req.user;
    res.locals.current_page = req.url;
    res.locals.csrfToken = req.csrfToken();
    res.locals.errorMessage = req.flash('error');
    res.locals.successMessage = req.flash('success');
    res.locals.page_header = '../partials/_page_header.html';
    res.locals.dashboard_header = '../partials/_dashboard_header.html';
    res.render(res.template);
  } else {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

module.exports = router;
