angular.module('app')



// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

.controller('eliminarUsuModalCtrl', function ($uibModalInstance, $scope, elemento, ConexionServ, toastr) {

  $scope.elemento = elemento;




  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});