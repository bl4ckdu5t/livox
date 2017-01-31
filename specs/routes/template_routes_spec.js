const request = require('supertest');
const expect = require('chai').expect;

describe('Loading template routes',  ()  => {
  let app = require('../../app');
  it('gets templates index',  ()  => {
    request(app)
      .get('/category/1/templates')
      .expect(200);
  });
  it('gets singularized template in url',  ()  => {
    request(app)
      .get('/categories/1/template')
      .expect(200);
  });
  it('gets templates index with pluralized category',  ()  => {
    request(app)
      .get('/categories/1/templates')
      .expect(200);
  });
});
