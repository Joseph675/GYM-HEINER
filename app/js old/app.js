 angular.module('app', ['ui.bootstrap', 'ui.router'])



.config(function($stateProvider, $urlRouterProvider){
	
	$stateProvider
	

	.state('panel', {
		url: '/panel',
		controller: 'PanelCtrl',
		templateUrl: 'templates/panel.html',

		
    })
    
   
    .state('panel.dashboard', {
		url: '/dashboard',
		controller: 'DashboardCtrl',
		templateUrl: 'templates/Dashboard.html',

		
	})

	.state('panel.usuarios', {
		url: '/usuarios',
		controller: 'usuariosCtrl',
		templateUrl: 'templates/usuarios.html',

		
	})

	.state('panel.asistencias', {
		url: '/asistencias',
		controller: 'usuariosCtrl',
		templateUrl: 'templates/asistencias.html',

		
	})
	.state('panel.asisusuarios', {
		url: '/asistenciasUsuarios',
		controller: 'AsisusuariosCtrl',
		templateUrl: 'templates/Asisusuarios.html',

		
	})

	.state('panel.insertados', {
		url: '/insertados',
		controller: 'usuariosCtrl',
		templateUrl: 'templates/insertados.html',

		
	})

	.state('panel.tablas', {
		url: '/tablas',
		controller: 'tablasCtrl',
		templateUrl: 'templates/tablas.html',

		
	})

	.state('panel.sincronizacion', {
		url: '/sincronizacion',
		controller: 'sincronizacionCtrl',
		templateUrl: 'templates/sincronizacion.html',

		
	})



	.state('login', {
		url: '/login',
		controller: 'loginCtrl',
		templateUrl: 'html/login.html',

		
	})

	
	$urlRouterProvider.otherwise('/login');



})




.constant('rutaServidor', (function(){
	if (location.hostname == 'www.micolevirtual.com') {
		return {
			ruta: 'https://edilson.micolevirtual.com/feryz_server/public/auditorias',
    		root: 'https://edilson.micolevirtual.com/feryz_server/public'
		}
	}else{
		if (localStorage.ruta) {
			// http://192.168.100.31
			return {
				ruta: localStorage.ruta + '/feryz_server/public/auditorias',
				root: localStorage.ruta + '/feryz_server/public'
			}
		}else{
			// https://edilson.micolevirtual.com
			// http://192.168.100.31
			return {
				ruta: 'http://192.168.100.31/feryz_server/public/auditorias',
				root: 'http://192.168.100.31/feryz_server/public'
			}
		}
	}
})())

