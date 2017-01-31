const request = require('supertest');
const expect = require('chai').expect;

describe('Loading campaign routes', ()  => {
  let app = require('../../app');
  it('gets campaigns index view', ()  => {
    request(app)
      .get('/campaigns')
      .expect(200);
  });
  it('gets campaigns new view',  ()  => {
    request(app)
      .get('/campaigns/new')
      .expect(200);
  });
  it('gets campaign submissions', () => {
    let campaign_id = '573c4f6f732b6158994944c9';
    request(app)
      .get(`/campaigns/${campaign_id}/reports`)
      .expect(200);
  });
});
