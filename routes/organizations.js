const express = require('express');
const router = express.Router();
const _ = require('lodash');
const Organization = require('../models/Organization');

/**
 * New
 * View for creating new organization
 */
router.get('/new', (req, res, next) => {
  'use strict';
  Object.assign(res.locals, {});
  res.template = 'organizations/new';
  next();
});

/**
 * Create
 * POST method for handling organization creation.
 */
router.post('/create', (req, res, next) => {
  'use strict';
  let organization_promise = new Promise((resolve, reject) => {
    let organization = new Organization('/organizations');
    let params = _.omit(req.body, ['_csrf']);
    organization.create(params, req.session.authToken, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  organization_promise.then((result) => {
    const json_data = {success: true, data: result.body.data};
    res.format({
      html: () => res.redirect('/settings/organizations'),
      json: () => res.send(json_data)
    });
  })
  .catch((reason) => {
    const json_data = { success: false, data: reason };
    req.flash('error', reason.body.error);
    res.format({
      html: () => res.redirect('back'),
      json: () => res.send(json_data)
    });
  });
});

/**
 * Edit
 * view for editing organizations
 */
router.get('/:id/edit', (req, res, next) => {
  'use strict';
  let organization = new Organization('/organizations');
  let organization_promise = new Promise((resolve, reject) => {
    organization.find(req.params.id, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  organization_promise.then((result) => {
    Object.assign(res.locals, {
      organization_id: req.params.id,
      organization_name: result.body.data.name,
      organization_description: result.body.data.description
    });
    res.template = 'organizations/edit';
    next();
  })
  .catch((error) => next(error));
});

/**
 * Update
 * update action take PUT action
 */
 router.put('/update', (req, res, next) => {
  'use strict';
  res.send('It works');
 });

/**
 * Members
 * Index of members of an organization
 */
router.get('/:id/members', (req, res, next) => {
  'use strict';
  let organization = new Organization('/organizations');
  let members_promise = new Promise((resolve, reject) => {
    organization.members(req.params.id, (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  members_promise.then((result) => {
    Object.assign(res.locals, {
      organization_id: req.params.id,
      organization_name: result.body.data.organization.name,
      members: result.body.data.workers
    });
    res.template = 'organizations/members';
    next();
  })
  .catch((error) => next(error));
});

/**
 * Create Single Member
 *
 */
router.post('/add-member-single', (req, res, next) => {
  const organization = new Organization('/organizations');
  let params = _.omit(req.body, ['_csrf', 'organization_id']);
  let organization_promise = new Promise((resolve, reject) => {
    organization.addMember(req.body.organization_id, params, req.session.authToken,
    (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  organization_promise.then((result) => {
    const json_data = {success: true, data: result.body.data};
    res.format({
      html: () => res.redirect('/settings/organizations'),
      json: () => res.send(json_data)
    });
  })
  .catch((reason) => {
    const json_data = { success: false, data: reason };
    console.log(reason.response.body);
    req.flash('error', 'Single Member creation failed. Ensure number begins with 234 and is 12 in length');
    res.format({
      html: () => res.redirect('back'),
      json: () => res.send(json_data)
    });
  });
});

/**
 * Create Members in Bulk
 *
 */
router.post('/add-member-bulk', (req, res, next) => {
  const organization = new Organization('/organizations');
  let params = _.omit(req.body, ['_csrf', 'organization_id']);
  let organization_promise = new Promise((resolve, reject) => {
    organization.addMembers(req.body.organization_id, params, req.session.authToken,
    (err, result) => {
      if(err){ reject(err); }
      resolve(result);
    });
  });
  organization_promise.then((result) => {
    const json_data = {success: true, data: result.body.data};
    res.format({
      html: () => res.redirect('/settings/organizations'),
      json: () => res.send(json_data)
    });
  })
  .catch((reason) => {
    const json_data = { success: false, data: reason };
    console.log(reason.response.body);
    req.flash('error', 'Bulk Member creation failed. Ensure number begins with 234 and is 12 in length');
    res.format({
      html: () => res.redirect('back'),
      json: () => res.send(json_data)
    });
  });
});

module.exports = router;
