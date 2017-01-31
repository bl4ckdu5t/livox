const model = require('../../models/Campaign');
const Campaign = new model('/campaigns');
const expect = require('chai').expect;

describe('Campaign model', () => {
  it('fetches all campaigns in an array', () => {
    Campaign.all((err, result) => {
      expect(result.body.data).to.be.a('array');
    });
  });
  it('creates new campaigns', () => {
    let params = {
      'template_id': '5735eb97732b6137d4063791',
      'meta': {
        "starts_at": "2016-05-16T09:09:39.982Z",
        "ends_at": "2016-05-16T09:09:39.982Z",
        "gender": "female",
        "location": "Taunton, MA",
        "max_age": 30,
        "min_age": 10,
        "respondents": 15
      },
      'personalisation': {
        "campaign_name":"chuck norris",
        "campaign_description": "FooBar",
        "application_name": "BarBaz",
        "application_url": "http://google.com",
        "application_screenshot": "Homepage",
        "application_screenshot_url": "http://flickr.com/foobar.png"
      }
    };
    let dummy_token = 'xkcdLolWat';
    Campaign.create(params, dummy_token, (err, result) => {
      expect(result.status).to.be(200);
    });
  });
  it('gets campaign submissions by campaign id', () => {
    let campaign_id = '573c4f6f732b6158994944c9';
    Campaign.submissions(campaign_id, (err, result) => {
      expect(result.status).to.be(200);
    });
  });
});
