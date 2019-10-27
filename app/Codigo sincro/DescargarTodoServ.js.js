angular.module('todo')

.factory('DescargarTodoServ', function($q, $rootScope, ConexionServ) {

    
    funciones = {};


    
    funciones._valor_insertado      = 0,
    funciones._valor_maximo         = 0,
          
    funciones.insertar_datos_descargados = function(data){
        var defered = $q.defer();
        
    
        funciones._valor_insertado      = 0,
        funciones._valor_maximo         = 0,
        
        usuarios 			= data.usuarios;
        recomendaciones 	= data.recomendaciones;
        
        promesas 				    = [];
        funciones._valor_insertado 	= 0;
        funciones._valor_maximo 	= usuarios.length + recomendaciones.length;
            
            
        ConexionServ.query('DELETE FROM usuarios').then(function(){
            for (var i = 0; i < usuarios.length; i++) {
                usu 		= usuarios[i];
                fecha_new   = null;
                if (usu.fecha) {
                    fecha_new   = usu.fecha;
                }
               
                consulta 	= 'INSERT INTO usuarios(rowid, id, nombres, apellidos, sexo, tema, idioma, union_id, asociacion_id, iglesia_id, username, password, email, fecha, tipo, celular) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ';
                prome 		= ConexionServ.query(consulta, [usu.id, usu.id, usu.nombres, usu.apellidos, usu.sexo, usu.tema, usu.idioma, usu.union_id, usu.asociacion_id, usu.iglesia_id, usu.username, usu.password, usu.email, fecha_new, usu.tipo, usu.celular]);
                prome.then(function(result){
                    funciones._valor_insertado++;
                }, function(tx){
                    console.log('error', tx);
                });
                promesas.push(prome);
            } 
        })
        
        
        Promise.all(promesas).then(function(result){
            console.log('Todas los datos insertados', result);
            funciones._valor_insertado = funciones._valor_maximo;
            defered.resolve(result);
        })

        return defered.promise;    
    }
    
    
    
    
    return funciones;

});