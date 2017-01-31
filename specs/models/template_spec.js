const model = require('../../models/Template');
const Template = new model('/templates');
const expect = require('chai').expect;

describe('Template model', () => {
  it('returns a JSON object', () => {
    Template.all((err, result) => {
      if(err){
        console.log(err);
      }
      expect(result.body).to.be.a('object');
    });
  });

  it('has a data key', () => {
    Template.all((err, result) => {
      if(err){
        console.log(err);
      }
      expect(Object.keys(result.body)[0]).to.equal('data');
    });
  });

  it('fetches all templates in an array', () => {
    Template.all((err, result) => {
      if(err){
        console.log(err);
      }
      expect(result.body.data).to.be.a('array');
    });
  });

  it('finds records by id with find method', () => {
    let templateId = '57331125732b6168bc69b684';
    Template.find(templateId, (err, result) => {
      if (err) { console.log(err) }
      expect(result[0].id).to.equal(templateId);
    });
  });

  it('uses field entry to fetch records', () => {
    Template.find_by('category_id', 4, (err, result) => {
      if (err) { console.log(err) }
      expect(result.category_id).to.equal(4);
    });
  });
});

