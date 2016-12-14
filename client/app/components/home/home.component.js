import template from './home.html';
import controller from './home.controller';
import './home.scss';

let homeComponent = {
  restrict: 'E',
  bindings: {
    data: '='
  },
  template,
  controller: ['DTOptionsBuilder', 'DTColumnBuilder', '$scope', '$q', '$compile', '$uibModal', controller]
};

export default homeComponent;
