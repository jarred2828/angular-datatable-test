import angular from 'angular';
import * as _ from 'lodash';

class HomeController {
  constructor(DTOptionsBuilder, DTColumnBuilder, $scope, $q, $compile, $uibModal) {

    var titleHtml = '<input type="checkbox" ng-model="$ctrl.selectAll" ng-click="$ctrl.toggleAll($ctrl.selectAll, $ctrl.selected)">';

    angular.extend(this, {
      name: 'home',
      selected: {},
      selectAll: false,
      persons: {},
      rowData: [],
      DTOptionsBuilder: DTOptionsBuilder,
      DTColumnBuilder: DTColumnBuilder,
      $q: $q,
      $compile: $compile,
      $uibModal: $uibModal,
      $scope: $scope,
      dtInstance: {},
      selectOptions: [
        {
          value: true,
          label: 'Select All'
        },
        {
          value: false,
          label: 'Unselect All'
        }
      ],     
      dtOptions: DTOptionsBuilder.fromFnPromise(() => {
        var defer = $q.defer();
        this.rowData = _.map(this.data.centers, (element) => {
          return element.LocationPage;
        });
        defer.resolve(this.rowData);
        return defer.promise;
      }).withOption('createdRow', (row, data, dataIndex) => {
        $compile(angular.element(row).contents())($scope);
      }).withOption('headerCallback', (header) => {
        if (!this.headerCompiled) {
          this.headerCompiled = true;
          $compile(angular.element(header).contents())($scope);
        }
      }).withOption('rowCallback', (nRow, aData, iDisplayIndex, iDisplayIndexFull) => {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', () => {
          $scope.$apply(() => {
            this.rowClickHandler(aData);
          });
        });
        return nRow;
      }).withButtons([
        'excel',
        'csv',
        'pdf'
      ]),
      rowClickHandler: (info) => {
        console.log(info);
      },      
      dtColumns: [
        DTColumnBuilder.newColumn(null).withTitle(titleHtml).notSortable()
        .renderWith((data, type, full, meta) => {
          this.selected[data.ROWID + ''] = false;
          return `<input type="checkbox" ng-model="$ctrl.selected['${data.ROWID}']" ng-click="$ctrl.toggleOne($event, $ctrl.selected)">`;
        }).withClass("text-left"),
        DTColumnBuilder.newColumn('ROWID').withTitle('ID').withClass("text-left"),
        DTColumnBuilder.newColumn('NAME').withTitle('Name').withClass("text-left"),
        DTColumnBuilder.newColumn('ADDRESS').withTitle('Address').withClass("text-left"),
        DTColumnBuilder.newColumn('STATE').withTitle('State').withClass("text-left"),
        DTColumnBuilder.newColumn('CITY').withTitle('City').withClass("text-left"),
        DTColumnBuilder.newColumn('EMAIL').withTitle('Email').withClass("text-left"),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
        .renderWith((data, type, full, meta) => {
          this.persons[data.ROWID + ''] = data;
          return `
            <button class="btn btn-warning" ng-click="$ctrl.edit($event, $ctrl.persons['${data.ROWID}'])">
              <i class="fa fa-edit"></i>
            </button>&nbsp;
            <button class="btn btn-danger" ng-click="$ctrl.deleteRow($event, $ctrl.persons['${data.ROWID}'])">
              <i class="fa fa-trash-o"></i>
            </button>
          `;
        })
      ]
    });
  }

  toggleAll(selectAll, selectedItems) {
    for (var id in selectedItems) {
      if (selectedItems.hasOwnProperty(id)) {
        selectedItems[id] = selectAll;
      }
    }
  }

  toggleOne(event, selectedItems) {
    event.stopPropagation();
    for (var id in selectedItems) {
      if (selectedItems.hasOwnProperty(id)) {
        if(!selectedItems[id]) {
          this.selectAll = false;
          return;
        }
      }
    }
    this.selectAll = true;
  }

  edit(event, person) {
    event.stopPropagation();
    var modalInstance = this.$uibModal.open({
      animation: true,
      templateUrl: 'app/components/home/modal/modal.html',
      controller: 'EditModalCtrl',
      controllerAs: '$ctrl',
      size: 'sm',
      appendTo: angular.element(document.querySelector('body')),
      resolve: {
        item: () => {
          return person;
        }
      }
    });
    modalInstance.result.then(() => {
      // modal approved
    }, () => {
      // modal cancelled
    });
  }

  deleteRow(event, person) {
    event.stopPropagation();
    var rowIDList = _.map(this.rowData, (element) => {
      return element.ROWID;
    });
    var index = rowIDList.indexOf(person.ROWID);
    this.rowData.splice(index, 1);
    angular.element(document.querySelectorAll('tbody tr')[index]).remove();
  }

  toggleSelections() {
    this.toggleAll(this.selectAll, this.selected);
  }
}

export default HomeController;
