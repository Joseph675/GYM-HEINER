angular.module('app')

.controller('tablasCtrl', function($scope, ConexionServ, $filter, $uibModal){

	ConexionServ.createTables();

	$scope.mostrarTablaInsertar=false;
	$scope.editar=false;
	$scope.MostrarTablaModificar=false;
	$scope.mostrarTabla=false;
	$scope.mostrarTablaUsuariosInsertados=false;
	$scope.mostrarTablaUsuariosAsistencia=false;

	











$scope.mostrarTablaAsusUsu=function(){
	$scope.mostrarTablaUsuariosAsistencia=true
}


$scope.mostrarTablaUsusInser=function(){
	$scope.mostrarTablaUsuariosInsertados=true;
}

$scope.MostrarTablaUsus=function(){
	$scope.mostrarTabla=false;
}
$scope.abrirInsertar=function(){
	$scope.mostrarTablaInsertar=true;
}






	$scope.editarusuario=function(usuario){

		$scope.editar=true;
		$scope.MostrarTablaModificar=true;
		$scope.usuario_modificar=usuario;
		console.log('vamos a editar')

	}

	$scope.insertar=function(usu){
		
		consulta="INSERT INTO usuarios ('nombres', 'apellidos', 'email','sexo', 'fecha', 'celular','username','password') " +
			"VALUES(?,?,?,?,?,?,?,?)" 
		ConexionServ.query(consulta, [usu.nombres, usu.apellidos, usu.email, usu.sexo, usu.fecha, usu.celular, 
			 usu.username, usu.password]).then(function(){

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

			consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=?'
			ConexionServ.query(consulta, [usuarios[i].rowid]).then(function(asistencias){
				for (let l = 0; l < asistencias.length; l++) {
					asistencias[l].fecha = new Date() ;
					
				}
				usuarios[i].asistencias=asistencias;

			},function(tx){
				console.log('noo')
			})
		
		}
		$scope.usuarios=usuarios;
	})

	}


	$scope.traerUsuarios();

	$scope.modificarusuario=function(usuario_cambiar){
		consulta="UPDATE usuarios SET  nombres=?, apellidos=?, email=?, sexo=?, fecha=?, celular=?, username=?, password=? WHERE rowid=?"
		ConexionServ.query(consulta, [usuario_cambiar.nombres, usuario_cambiar.apellidos,usuario_cambiar.email, usuario_cambiar.sexo, usuario_cambiar.fecha, usuario_cambiar.celular,
			usuario_cambiar.username, usuario_cambiar.password, usuario_cambiar.rowid]).then(function(result){
				$scope.traerUsuarios();
			console.log('usuario modificado', result)
			$scope.MostrarTablaModificar=false;
			$scope.mostrarTablaInsertar=true;
		}, function(tx){
			console.log('usuario no modificado', tx)
		})
	}


	$scope.eliminarusuario=function(usuario){
		//consulta="DELETE FROM usuarios WHERE rowid=?"//
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
		console.log(usu)
		consulta="INSERT INTO asistencias ('usuario_id','fecha') VALUES(?,?)" 

		$scope.fecha= new Date()
		ConexionServ.query(consulta, [usu.rowid, $scope.fecha]).then(function(){
			$scope.traerUsuarios();
			
			console.log('asistencia insertado')

			
		}, function(){
			console.log('asistencia no insertado')
		})

			

	}


	$scope.editarAsistencia = function (usu, asis) {
		var modalInstance = $uibModal.open({
			templateUrl: 'templates/editarAsistenciasModal.html',
			controller: 'EditarAsistenciaCtrl',
			size: 'lg',
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

	






	

	




	
