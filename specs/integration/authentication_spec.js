const sw = require('selenium-webdriver');
const driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build()

const chai = require('chai')
const chaiWebDriver = require('chai-webdriver');
chai.use(chaiWebDriver(driver));


describe('Authentication integration test', () => {
  it('has download buttons with screen reader text', () => {
    driver.get('http://localhost:3000/stuff');
    chai.expect('.downloads[data-os="android"]').dom.to.contain.text('Download For Android');
  });
});
