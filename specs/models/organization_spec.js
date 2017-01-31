const model = require('../../models/Organization');
const Organization = new model('/organizations');
const expect = require('chai').expect;

describe('Organization model', () => {
  it('fetches all campaigns in an array', () => {
    Organization.all((err, result) => {
      expect(result.body.data).to.be.a('array');
    });
  });

  it('has a destroy method', () => {
    expect(Organization).to.have.property('destroy');
  });

  it('can index members of an organization', () => {
    let organization_id = 1;
    Organization.members(organization_id, (err, result) => {
      expect(result.status).to.be(200);
    });
  });
});
