class EditModalController {
  constructor($uibModalInstance, item) {
    angular.extend(this, {
      item: item,
      ok: () => {
        $uibModalInstance.close();
      },
      cancel: () => {
        $uibModalInstance.dismiss('cancel');
      }
    });
  }
}

export default EditModalController;
