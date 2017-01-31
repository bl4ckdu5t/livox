'use strict';
const request = require('superagent');
const Base = require('./Base');

class Business extends Base{
  constructor(path){
    super();
    this.path = path;
    this.uri = this.base_url() + this.path;
  }
}

module.exports = Business;
