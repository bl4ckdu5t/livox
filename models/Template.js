'use strict';
const request = require('superagent');
const Base = require('./Base');

class Template extends Base{
  constructor(path){
    super();
    this.path = path;
    this.uri = this.base_url() + this.path;
  }
}

module.exports = Template;
