'use strict';
const request = require('superagent');
const Base = require('./Base');

class Campaign extends Base{
  constructor(path){
    super();
    this.path = path;
    this.uri = this.base_url() + this.path;
  }
  submissions(campaign_id, callback){
    request.get(`${this.uri}/${campaign_id}/submissions`)
    .set('JAMA-API-KEY', this.api_key())
    .end(callback);
  }
}

module.exports = Campaign;
