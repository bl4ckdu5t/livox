const sw = require('selenium-webdriver');
const driver = new sw.Builder()
  .withCapabilities(sw.Capabilities.chrome())
  .build();
driver.getWindowHandle();

const chai = require('chai')
const chaiWebDriver = require('chai-webdriver');
chai.use(chaiWebDriver(driver));


describe('Index page integration test', () => {
  it('has download buttons with screen reader text', function(){
    driver.get('http://localhost:3000/stuff');
    chai.expect('.downloads[data-os="android"]').dom.to.not.contain.text('Download For Android');
  });
});

driver.quit();
