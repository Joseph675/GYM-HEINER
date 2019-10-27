angular.module('app')

.controller('PanelCtrl', function($scope, $state){


	$scope.IrADashboard=function(){
		$state.go('panel.dashboard');
	
	}

	
})