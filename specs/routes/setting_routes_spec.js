const request = require('supertest');
const expect = require('chai').expect;

describe('Loading category routes', () => {
  let app = require('../../app');
  it('gets categories index', () => {
    request(app)
      .get('/settings')
      .expect(200);
  });
});
