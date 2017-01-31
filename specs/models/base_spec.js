const model = require('../../models/Campaign');
const Base = new model('/campaigns');
const expect = require('chai').expect;

describe('Base model', () => {

  it('fetches all records in an array', () => {
    Base.all((err, result) => {
      expect(result.body.data).to.be.a('array');
    });
  });

  it('can destroy a record by id', () => {
    let mockId = 9;
    let dummy_token = 'xkcdLolWat';
    Base.destroy(mockId, dummy_token, (err, result) => {
      expect(result.status).to.be(200);
    });
  });
});
