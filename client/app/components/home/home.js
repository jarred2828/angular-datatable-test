import angular from 'angular';
import uiRouter from 'angular-ui-router';
import homeComponent from './home.component';
import HomeService from './home.factory';
import modalModule from './modal/modal';

let homeModule = angular.module('home', [
  uiRouter,
  modalModule
])

.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      component: 'home',
      resolve: {
        data: (homeFactory) => {
          return homeFactory.getData().then((response) => {
            return response.data;
          });
        }
      }
    });
})

.component('home', homeComponent)

.factory('homeFactory', HomeService.homeFactory)
  
.name;

export default homeModule;
