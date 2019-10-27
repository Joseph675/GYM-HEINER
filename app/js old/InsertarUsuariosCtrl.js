angular.module('app')

.controller('InsertarUsuariosCtrl', function($scope, ConexionServ, $filter, $uibModal){

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
				toastr.success('Usuario Insertado Correctamente', 'Olimpo Gym Says');
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
		$scope.mostrarTablaInsertar=false;
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

			toastr.success('Usuario Insertado Correctamente', 'Olimpo Gym Says');
			console.log('usuario insertado')
			$scope.traerUsuarios();
			$scope.usu = {};
		}, function(){
			console.log('usuario no insertado')
			toastr.error('Usuario no insertado correctamente', '¡¡NO PUEDE SER!!');
		})

			

	}




	$scope.traerUsuarios=function(){
		
	ConexionServ.query('SELECT *,rowid FROM usuarios').then(function(usuarios){

		for (let i = 0; i < usuarios.length; i++){

			consulta = 'SELECT * FROM asistencias WHERE usuario_id=?'
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
			
			console.log('usuario modificado', result)
			toastr.success('Usuario Modificado Correctamente', 'Olimpo Gym Says');
			$scope.MostrarTablaModificar=false;
			$scope.mostrarTablaInsertar=true;
		}, function(tx){
			console.log('usuario no modificado', tx)
			toastr.error('No se guardaron los cambios', '¡¡NO PUEDE SER!!');
		})
	}


	$scope.eliminarusuario=function(usuario){
		consulta="DELETE FROM usuarios WHERE rowid=?"
			ConexionServ.query(consulta, [usuario.rowid]).then(function(result){
			
			console.log('usuario eliminado', result)
			toastr.success('Usuario Eliminado Correctamente', 'Olimpo Gym Says');
				$scope.usuario = result;
				$scope.traerUsuarios();
			}, function(tx){
			toastr.error('Error al eliminar los Usuarios', '¡¡NO PUEDE SER!!');
			console.log('usuario no eliminado', tx)
		})
    }
})