const model = require('../../models/CampaignCategory');
const CampaignCategory = new model('/categories');
const expect = require('chai').expect;

describe('CampaignCategory model', () => {
  it('returns a JSON object', () => {
    CampaignCategory.all((err, result) => {
      if(err){
        console.log(err);
      }
      expect(result.body).to.be.a('object');
    });
  });

  it('has a data key', () => {
    CampaignCategory.all((err, result) => {
      if(err){
        console.log(err);
      }
      expect(Object.keys(result.body)[0]).to.equal('data');
    });
  });

  it('fetches all campaign categories in an array', () => {
    CampaignCategory.all((err, result) => {
      if(err){
        console.log(err);
      }
      expect(result.body.data).to.be.a('array');
    });
  });

  it('has a find method that returns records with specified id', () => {
    promise = new Promise((resolve, reject) => {
      CampaignCategory.find(1, (err, result) => {
        if(err){
          reject(err);
        }
        resolve(result);
      });
    });
    promise.then((result) => {
      expect(result.body.data).to.be.a('object');
    }).catch((err) => {
      console.log(err);
    });
  });
});

