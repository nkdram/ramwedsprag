(function () {
    'use strict';

    angular.module('main').controller('MainPageController', ['$scope','$uibModal','$log','$state',
        function ($scope, $uibModal, $log, $state) {

            var $ctrl = this;
            $ctrl.animationsEnabled = true;
            $ctrl.isModalOpen = false;
            $ctrl.open = function (size, param, parentSelector) {
                $ctrl.state = {
                    name : param
                };
                var parentElem = parentSelector ?
                    angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                $ctrl.isModalOpen = true;
                var modalInstance = $uibModal.open({
                    animation: $ctrl.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: '/assets/modules/home/views/fullscreen-modal.html',
                    controller: 'ModalInstanceCtrl',
                    controllerAs: '$ctrl',
                    size: size,
                    appendTo: parentElem,
                    resolve: {
                        items : function () {
                            return $ctrl.state;
                        }
                    }
                });

                modalInstance.result.then(function (state) {
                    $ctrl.selected = state;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                    $ctrl.isModalOpen = false;
                });
            };

            $ctrl.toggleAnimation = function () {
                $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
            };


            //Open Pop up based on Route
            $ctrl.init = function(){
                $ctrl.open('lg',$state.current.name);
            };


        }
    ]);
})();
