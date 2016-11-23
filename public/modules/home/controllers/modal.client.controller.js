(function () {
    'use strict';

    angular.module('main').controller('ModalInstanceCtrl', function ($uibModalInstance, items, $scope) {
        var $ctrl = this;
        $ctrl.items = items;

        $ctrl.ok = function () {
            $uibModalInstance.close($ctrl.selected.item);
        };

        $ctrl.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
})();