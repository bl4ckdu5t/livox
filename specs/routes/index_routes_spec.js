const request = require('supertest');
const expect = require('chai').expect;

describe('Express server load test', () => {
  let app = require('../../app');
  it('responds to /', () => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        expect(res.headers['x-powered-by']).to.equal('Express');
      });
  });
});
