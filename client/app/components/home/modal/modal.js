import angular from 'angular';
import controller from './modal.controller';

let homeModalModule = angular.module('home.modal', [])
.controller('EditModalCtrl', ['$uibModalInstance', 'item', controller])
.name;

export default homeModalModule;
