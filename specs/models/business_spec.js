const model = require('../../models/Business');
const Business = new model('/businesses');
const expect = require('chai').expect;

describe('Business Model', () => {
  it('gets all businesses', () => {
    Business.all((err, result) => {
      expect(result.status).to.be(200);
    });
  });
  it('gets business by column name', () => {
    let email = 'Carolyne.Luettgen@yahoo.com';
    Business.find_by('email', email, (err, result) => {
      expect(result.email).to.be(email);
    });
  });
});
