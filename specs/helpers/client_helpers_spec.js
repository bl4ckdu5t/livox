const expect = require('chai').expect;
const helpers = require('../../assets/javascripts/helpers');

describe('Helper functions', () => {
  it('has getStats to gets statistics with a data source and attribute for stat analysis', () => {
    let mock = [{ answer: 'Android' }, { answer: 'iOS' }];
    expect(helpers.getStats(mock, 'answer')[0])
    .to.have.property('label').with.length(mock[0].answer.length);
  });
  // Mapping to convert objects to string and joining array items for comparison
  it('has getQuestionAnswers to get array of answers by question name', () => {
    let mock = [
     {'questionA': 'Android', 'questionB': 'Windows'},
     {'questionA': 'iOS', 'questionB': 'OS X'}
    ];
    expect(helpers.getQuestionAnswers('questionA', mock).map(o => o.answer).join(','))
    .to.equal(['Android', 'iOS'].join(','));
  });

  it('converts an object of named objects to an array of unnamed objects', () => {
    let obj = {a: {animal: 'cat'}, b: {animal: 'dog'}};
    expect(helpers.expungeObjectKeys(obj)).to.be.a('array');
    expect(helpers.expungeObjectKeys(obj)[0].animal).to.equal('cat');
  });
});
