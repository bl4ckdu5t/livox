'use strict';
const request = require('superagent');
const Base = require('./Base');

class CampaignCategory extends Base{
  constructor(path){
    super();
    this.path = path;
    this.uri = this.base_url() + this.path;
  }
}

module.exports = CampaignCategory;
