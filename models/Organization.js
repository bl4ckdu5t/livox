'use strict';
const request = require('superagent');
const Base = require('./Base');

class Organization extends Base{
  constructor(path){
    super();
    this.path = path;
    this.uri = this.base_url() + this.path;
  }
  members(organization_id, callback){
    request.get(`${this.uri}/${organization_id}/workers`)
    .set('JAMA-API-KEY', this.api_key())
    .end(callback);
  }
  addMember(organization_id, attributes, token, callback){
    request.post(`${this.uri}/${organization_id}/add`)
    .set('JAMA-API-KEY', this.api_key())
    .set('Jama-Auth-Key', token)
    .end(callback);
  }
  addMembers(organization_id, attributes, token, callback){
    request.post(`${this.uri}/${organization_id}/bulk`)
    .set('JAMA-API-KEY', this.api_key())
    .set('Jama-Auth-Key', token)
    .end(callback);
  }
}
module.exports = Organization;
