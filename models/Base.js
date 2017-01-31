'use strict';
const request = require('superagent');
const _ = require('lodash');

class Base{
  constructor(){
    this.baseUri = process.env.JAMA_API_URL;
  }
  base_url(){
    return this.baseUri;
  }
  api_key(){
    return process.env.JAMA_API_KEY;
  }
  all(callback){
    request.get(this.uri)
    .set('JAMA-API-KEY', this.api_key())
    .end(callback);
  }
  find(id, callback){
    request.get(`${this.uri}/${id}`)
    .set('JAMA-API-KEY', this.api_key())
    .end(callback);
  }
  find_by(field, value, callback){
    request.get(this.uri)
    .set('JAMA-API-KEY', this.api_key())
    .end((err, res) => {
      let filtered = res.body.data.filter(
        (obj) => obj[field] === value
      );
      callback(err, _.head(filtered));
    });
  }
  where(field, value, callback){
    request.get(this.uri)
    .set('JAMA-API-KEY', this.api_key())
    .end((err, res) => {
      let filtered = res.body.data.filter(
        (obj) => obj[field] === value
      );
      callback(err, filtered);
    });
  }
  create(attributes, token, callback){
    request.post(this.uri)
    .send(attributes)
    .set('JAMA-API-KEY', this.api_key())
    .set('Jama-Auth-Key', token)
    .end(callback);
  }
  update(attributes, token, callback){
    request.put(this.uri)
    .send(attributes)
    .set('JAMA-API-KEY', this.api_key())
    .set('Jama-Auth-Key', token)
    .end(callback);
  }
  destroy(id, token, callback){
    request.delete(`${this.uri}/${id}`)
    .set('JAMA-API-KEY', this.api_key())
    .set('Jama-Auth-Key', token)
    .end(callback);
  }
}

module.exports = Base;
