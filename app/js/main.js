import angular from 'angular';

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'ng-file-upload';
import './templates';
import './filters';
import './components';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'ngFileUpload',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'app.components'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
