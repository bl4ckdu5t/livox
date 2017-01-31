const lib = require('../../libs/urlLib');
const expect = require('chai').expect;

describe('urlLib library', () => {
  let request = {
    protocol: 'http',
    get: (param) => {
      return 'localhost:3000';
    },
    originalUrl: '/foo/bar',
  };
  it('outputs root url', () => {
    expect(lib.root(request))
    .to
    .equal('http://localhost:3000');
  });
  it('should get url of a page', () => {
    expect(lib.currentPage(request))
    .to
    .equal('http://localhost:3000/foo/bar');
  });
});
