angular.module('app')

.controller('PanelCtrl', function($scope, $state){


	$scope.IrADashboard=function(){
		$state.go('panel.dashboard');
	
	}

	
})




window.fixDate = function(fec, con_hora){

	try {
		dia   = fec.getDate();
		mes   = (fec.getMonth() + 1 );
		year  = fec.getFullYear();
	
		if (dia < 10) {
			dia = '0' + dia;
		}
	
		if (mes < 10) {
			mes = '0' + mes;
		}
	
		fecha   = '' + year + '/' + mes  + '/' + dia;
		
		if (con_hora){
			if (con_hora.getHours) {
				hora 	= con_hora.getHours();
				if (hora<10) { hora = '0' + hora; };
				min 	= con_hora.getMinutes();
				if (min<10) { min = '0' + min; };
				sec 	= con_hora.getSeconds();
				if (sec<10) { sec = '0' + sec; };
				fecha 	= fecha + ' ' + hora + ':' + min + ':' + sec
			}else{
				hora 	= fec.getHours();
				if (hora<10) { hora = '0' + hora; };
				min 	= fec.getMinutes();
				if (min<10) { min = '0' + min; };
				sec 	= fec.getSeconds();
				if (sec<10) { sec = '0' + sec; };
				fecha 	= fecha + ' ' + hora + ':' + min + ':' + sec
			}
			
		}
		//console.log(fecha);

		return fecha;
	} catch (error) {
		console.log(error);
		return fec;
	}
}