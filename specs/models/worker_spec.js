const model = require('../../models/Worker');
const Worker = new model('/workers');
const expect = require('chai').expect;

describe('Worker Model', () => {
  it('gets all workers', () => {
    Worker.all((err, result) => {
      expect(result.status).to.be(200);
    });
  });
  it('gets worker by id', () => {
    Worker.find(1, (err, result) => {
      expect(result.status).to.be(200);
    });
  });
});
