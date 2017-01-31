const model = require('../../models/Auth');
const Auth = new model('/auth/businesses');
const expect = require('chai').expect;

describe('Authenticaiton Model', () => {
  let credentials = {
    email: 'Carolyne.Luettgen@yahoo.com',
    password: 'test123'
  };
  it('registers user with username and password', () => {
    Auth.register(credentials, (err, result) => {
      expect(result.body).to.have.property('data');
    });
  });
  it('authenticates user with credentials', () => {
    Auth.authenticate(credentials, (err, result) => {
      expect(result.body).to.have.property('data');
    });
  });
});
