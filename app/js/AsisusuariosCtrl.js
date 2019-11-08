angular.module('app')

.controller('AsisusuariosCtrl', function ($scope, ConexionServ, $state, $uibModal, toastr) {



    mes = new Date().getMonth() + 1;

    if (mes < 9) {
        mes = '0' + mes;
    }else{
        mes = '' + mes;
    }
    
    $scope.dato = { select_year: '' + (new Date().getFullYear()), select_month: mes }




    n =  new Date();
//Año
y = n.getFullYear();
//Mes
m = n.getMonth() + 1;
//Día
d = n.getDate();

//Lo ordenas a gusto.
document.getElementById("date").innerHTML = d + "/" + m + "/" + y;


console.log(m)

	$scope.mesActual=function(){
        console.log(m)
    }
	  
    console.log($state.params.usu_id)

    
    usu_id=$state.params.usu_id;

	$scope.traerUsuarios=function(){
        console.log(date)
        ConexionServ.query('SELECT *,rowid FROM usuarios WHERE rowid=?', [usu_id]).then(function(usuarios){
    
            if (usuarios.length>0) {

                $scope.usu=usuarios[0];
                
                consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=?'
                ConexionServ.query(consulta, [usu_id]).then(function(asistencias){
                    for (let l = 0; l < asistencias.length; l++) {
                        asistencias[l].fecha = new Date(asistencias[l].fecha) ;
                        
                    }
                    $scope.usu.asistencias=asistencias;
                   
                },function(tx){
                    console.log('noo')
                })
            
            }
            
            console.log($scope.usu)
    
        })
    
        }
    
    
        $scope.traerUsuarios();
	

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
        


        $scope.traerDatos=function(dato){
            cuadro = $scope.dato.select_year + '/' + $scope.dato.select_month; 
            console.log(cuadro)
            consulta = 'SELECT *,rowid FROM asistencias WHERE usuario_id=? and eliminado = "0" and fecha like "' + cuadro + '%" ' 
         console.log(dato)
         ConexionServ.query(consulta, [usu_id]).then(function(result){
            console.log(result)
             
            $scope.usu.asistencias= result;
            console.log(result)
            },function(tx){
                console.log('noo')
            })
         
        }



        $scope.editarAsistencia = function (usu, asis) {
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
        
        $scope.insertarAsistencia=function(usu){
            $scope.fecha= new Date()
            console.log($scope.fecha)
            fecha=window.fixDate($scope.fecha);
            console.log(fecha)
            consulta="INSERT INTO asistencias ('fecha', 'usuario_id') VALUES(?,?)" 
    

            ConexionServ.query(consulta, [fecha, usu.rowid]).then(function(){
                $scope.traerUsuarios();
                console.log('asistencia insertado')
                toastr.success('Asistencia insertado')
                
            }, function(){
                console.log('asistencia no insertado')
                toastr.warning('Asistencia no insertado')
            })
    
                
    
        }





});
	




