import './stylesheets/app.scss';
import main from './javascripts/main.js';
import 'html5-simple-date-input-polyfill';
var ready = (cb) => {
  /in/.test(document.readyState) ? setTimeout(ready.bind(null, cb), 9) : cb();
};
ready(main);
