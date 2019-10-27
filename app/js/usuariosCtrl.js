angular.module('app')

.controller('usuariosCtrl', function($scope, ConexionServ, $state, $filter, $uibModal){

	ConexionServ.createTables();

	$scope.mostrarTablaInsertar=false;
	$scope.editar=false;
	$scope.MostrarTablaModificar=false;
	$scope.mostrarTabla=false;
	$scope.mostrarTablaUsuariosInsertados=false;
	$scope.mostrarTablaUsuariosAsistencia=false;

	

	$(function(){
		// Success Type
		$('#ts-success').on('click', function() {
			toastr.success('Have fun storming the castle!', 'Miracle Max Says');
		});

		// Success Type
		$('#ts-info').on('click', function() {
			toastr.info('We do have the Kapua suite available.', 'Turtle Bay Resort');
		});

		// Success Type
		$('#ts-warning').on('click', function() {
			toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!');
		});

		// Success Type
		$('#ts-error').on('click', function() {
			toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
		});
	});





    mes = new Date().getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }else{
        mes = '' + mes;
    }
    
    $scope.dato = { select_year: '' + (new Date().getFullYear()), select_month: mes }





	 
	$scope.mostrarAsistencias = function(usuario){
		console.log('xhj')
		$state.go('panel.asisusuarios', { usu_id: usuario.rowid })
	}



	$scope.traerDatos=function(dato){
		
	 
	}







$scope.mostrarTablaAsusUsu=function(){
	if ($scope.mostrarTablaUsuariosAsistencia==true) {
		$scope.mostrarTablaUsuariosAsistencia=false;
		
	}else{$scope.mostrarTablaUsuariosAsistencia=true;
	}
	
}


$scope.mostrarTablaUsusInser=function(){
	if ($scope.mostrarTablaUsuariosInsertados==true) {
		$scope.mostrarTablaUsuariosInsertados=false;
		
	}else{$scope.mostrarTablaUsuariosInsertados=true;
	}
	
}

$scope.MostrarTablaUsus=function(){
	
	$scope.mostrarTabla=false;
}

$scope.abrirInsertar=function(){
	if ($scope.mostrarTablaInsertar==true) {
		$scope.mostrarTablaInsertar=false;
		
	}else{$scope.mostrarTablaInsertar=true;;
	}
	
}





	$scope.editarusuario=function(usuario){
		$scope.mostrarTablaInsertar=false;
		$scope.editar=true;
		$scope.MostrarTablaModificar=true;
		$scope.usuario_modificar=usuario;
		console.log('vamos a editar')

	}


	

	$scope.insertar=function(usu){
		console.log(usu)
		$scope.fecha= usu.fecha
		console.log($scope.fecha)
		fecha=window.fixDate($scope.fecha);
		console.log(fecha)
		
				consulta="INSERT INTO usuarios ('nombres', 'apellidos', 'email','sexo', 'fecha', 'celular','username','password') " +
					"VALUES(?,?,?,?,?,?,?,?)" 
					
				ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, fecha, usu.celular, 
					usu.username, usu.password]).then(function(){
				
						toastr.success('Usuario insertado con exito!', 'Administrador');
					console.log('usuario insertado')
					$scope.traerUsuarios();
					$scope.usu = {};

				}, function(){
					console.log('usuario no insertado')
					})

					

			}
		







	$scope.traerUsuarios=function(){
		
	ConexionServ.query('SELECT *,rowid FROM usuarios WHERE activo==1 and eliminado==0').then(function(usuarios){

		for (let i = 0; i < usuarios.length; i++){

			cuadro = $scope.dato.select_year + '/' + $scope.dato.select_month; 
			console.log(cuadro)
			consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and fecha like "' + cuadro + '%" ' 

			ConexionServ.query(consulta, [usuarios[i].rowid]).then(function(asistencias){
				for (let l = 0; l < asistencias.length; l++) {
					asistencias[l].fecha = new Date(asistencias[l].fecha) ;
					
				}
				$scope.usuarios[i].asistencias=asistencias;
				console.log(asistencias)
			},function(tx){
					console.log('noo')
			})

		
		}
		$scope.usuarios=usuarios;
		console.log($scope.usuarios)
	})

	}


	$scope.traerUsuarios();

	$scope.modificarusuario=function(usuario_cambiar){
		console.log(usuario_cambiar)
		$scope.fecha= usuario_cambiar.fecha
		console.log($scope.fecha)
		fecha=window.fixDate($scope.fecha);
		console.log(fecha)

		consulta="UPDATE usuarios SET modificado=1, nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, username=?, password=? WHERE rowid=?"
		ConexionServ.query(consulta, [usuario_cambiar.nombres, usuario_cambiar.apellidos, usuario_cambiar.email, usuario_cambiar.sexo, fecha, usuario_cambiar.celular,
			usuario_cambiar.username, usuario_cambiar.password, usuario_cambiar.rowid]).then(function(result){
			
			console.log('usuario modificado', result)
			$scope.MostrarTablaModificar=false;
			$scope.mostrarTablaInsertar=true;
		}, function(tx){
			console.log('usuario no modificado', tx)
		})
	}


	$scope.eliminarusuario=function(usuario){
		consulta="UPDATE usuarios SET eliminado=1 WHERE rowid=?"
			ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
			
			console.log('usuario eliminado', result)
				$scope.usuario = result;
				$scope.traerUsuarios();
			}, function(tx){
			console.log('usuario no eliminado', tx)
		})
	}



	$scope.options = {
		showWeeks: true
	  };


	  $scope.insertarAsistencia=function(usu){
		
		$scope.fecha= new Date()
		console.log($scope.fecha)
		fecha=window.fixDate($scope.fecha);
		console.log(fecha)

		console.log(usu)
		consulta="INSERT INTO asistencias ('fecha', 'usuario_id') VALUES(?,?)" 


		ConexionServ.query(consulta, [fecha, usu.rowid]).then(function(){
			$scope.traerUsuarios();
			console.log('asistencia insertado')

			
		}, function(){
			console.log('asistencia no insertado')
		})

			

	}

	$scope.ok=function(){
		$scope.mostrarTablaInsertar=false;
	}
	
	$scope.editarAsistencia = function (usu, asis) {
		console.log(asis)
		console.log('hola')
		var modalInstance = $uibModal.open({
			templateUrl: 'templates/editarAsistenciasModal.html',
			controller: 'EditarAsistenciaCtrl',
			size: 'lg',
			animation:false,
			resolve: {
				asis: function () {
					return asis;
				}
			}
		  });
	  
		  modalInstance.result.then(function (rs) {
			  if (rs=='eliminado') {
				  $scope.traerUsuarios();
			  }
			console.log('Cerrado');
		  }, function () {
			console.log('Modal dismissed at: ' + new Date());
		  });
	}
	

	
	$scope.modificarActivo = function (usuario) {
		consulta="UPDATE usuarios SET activo=? WHERE rowid=?"
		ConexionServ.query(consulta, [usuario.activo, usuario.rowid]).then(function(result){
			$scope.traerUsuarios();
			console.log('activo modificado', result)
		}, function(tx){
			console.log('activo no modificado', tx)
			
		})
	
	};	
	
	$scope.mostrarActi=function(activo){	
		console.log(activo)	
			consulta = 'SELECT *,rowid FROM usuarios WHERE activo=? and eliminado==0'
			ConexionServ.query(consulta, [activo]).then(function(result){
			console.log('sii')
				$scope.usuarios=result;

			},function(tx){
				console.log('noo')
			})
		
		
	
	}
	

	

})

	




.controller('EditarAsistenciaCtrl', function ($scope, ConexionServ, $uibModalInstance, asis) {
	

	$scope.mostrardatepicker=false;

	$scope.asis=asis;


	$scope.eliminarAsistencia=function(usu){
		console.log(usu)
		consulta="DELETE FROM asistencias WHERE rowid=?"
			ConexionServ.query(consulta, [usu.rowid]).then(function(result){
			console.log('asistencia eliminado', result)
			$scope.usu = result;
			
			}, function(tx){
			console.log('asistencia no eliminado', tx)
		})
		$uibModalInstance.close('eliminado');
	}


	$scope.menos=function(usu){
		console.log(usu)
	}

	$scope.editarAsistencia=function(){
		$scope.mostrardatepicker=true;
	}
	
	$scope.ok = function () {
		$uibModalInstance.close('eliminado');
	};





	$scope.suu = function (asis) {

		$scope.fecha= asis.fecha
		console.log($scope.fecha)
		fecha=window.fixDate($scope.fecha);
		console.log(fecha)


		console.log(asis)
		consulta="UPDATE asistencias SET fecha=? WHERE rowid=?"
		ConexionServ.query(consulta, [fecha, asis.rowid]).then(function(result){
			
			console.log('asistencia modificado', result)
		}, function(tx){
			console.log('asistencia no modificado', tx)
		})
		$uibModalInstance.close();
		};
	  
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		};


		

});
	

	

	
	




	