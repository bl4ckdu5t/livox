const lib = require('../../libs/reportLib');
const expect = require('chai').expect;

describe('report statistics library', () => {
  it('merges submissions to worker meta', () => {
    let submissions = [
      {
        id: 'aabbccdd',
        campaign_id: 'ddccbbaa',
        worker_id: 1,
        submissions_data: {
          verification: 'pass',
          a: 'answerA',
          b: 'answerB',
          c: 'answerC',
          d: 'answerD'
        },
        valid: true,
        submitted_at: '2016-05-18 12:18:07'
      },
      {
        id: 'eeffgghh',
        campaign_id: 'hhggffee',
        worker_id: 2,
        submissions_data: {
          verification: 'pass',
          a: 'answerA',
          b: 'answerB',
          c: 'answerC',
          d: 'answerD'
        },
        valid: true,
        submitted_at: '2016-05-18 12:18:07'
      }
    ];
    let workers = [
      {
        id: '1',
        phone_number: '2348066669977',
        firstname: 'Sandi',
        lastname: 'Metz',
        gender: 'female',
        location: 'lagos',
        date_of_birth: '1972-09-10',
        email: 'sandi@metz.com',
        avatar: null,
        is_active: '1',
        last_active: '2016-05-27 11:58:54',
        created_at: '2016-05-27 11:58:54',
        updated_at: '2016-05-27 11:58:54'
      },
      {
        id: '2',
        phone_number: '2348066669988',
        firstname: 'Avdi',
        lastname: 'Grimm',
        gender: 'male',
        location: 'lagos',
        date_of_birth: '1972-09-10',
        email: 'hello@avdi.org',
        avatar: null,
        is_active: '1',
        last_active: '2016-05-27 11:58:54',
        created_at: '2016-05-27 11:58:54',
        updated_at: '2016-05-27 11:58:54'
      }
    ];
    expect(lib.merge_meta(submissions, workers))
      .to
      .have.length(2);
  });

  it('groups age in a age group by date of birth', () => {
    expect(lib.group_age('1955-06-15')).to.equal('Above 60');
  });
});
