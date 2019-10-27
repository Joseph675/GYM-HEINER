angular.module('app')

.controller('loginCtrl', function($scope, $state, ConexionServ){


	$scope.IrAdashboard=function(){
		$state.go('panel.dashboard');
	
	}

	$scope.irADashboard=function(usu){

			consulta = 'SELECT *,rowid FROM usuarios WHERE username=? and password=?'
			ConexionServ.query(consulta, [usu.username, usu.password]).then(function(result){
				console.log(result)
				if (result.length>0) {
					$state.go('panel.dashboard');
				}else{
					console.log('no se pudo entrar, datos malos')
					toastr.error('Datos Invalidos', '¡¡NO PUEDE SER!!');
				}

			})
		
		}
	
	
})
