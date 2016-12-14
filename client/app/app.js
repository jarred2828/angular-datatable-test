import angular from 'angular';
import uiRouter from 'angular-ui-router';
import datatables from 'angular-datatables';
import 'angular-datatables/dist/plugins/buttons/angular-datatables.buttons.min.js';
import 'angular-ui-bootstrap';

import Components from './components/components';
import AppComponent from './app.component';
import 'normalize.css';

import 'angular-datatables/dist/css/angular-datatables.min.css';

angular.module('app', [
  uiRouter,
  Components,
  'ui.bootstrap',
  datatables,
  'datatables.buttons'
])
.config(($locationProvider) => {
  "ngInject";
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
})

.component('app', AppComponent)

.constant('baseUrl', 'https://thelearningexperience.com/centers/api');
