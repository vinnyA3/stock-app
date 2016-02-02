angular.module('appRoutes',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'app/views/pages/home.html',
				controller: 'mainController as main'
			})
			.state('signup',{
				url:'/signup',
				templateUrl: 'app/views/pages/signup.html',
				controller: 'controller as signup'
			})
			.state('login',{
				url:'/login',
				templateUrl: 'app/views/pages/login.html',
				controller: 'controller as login'
			});
	
		$urlRouterProvider.otherwise('/');
		
		$locationProvider.html5Mode(true);
	
	});