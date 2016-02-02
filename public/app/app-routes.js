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
				controller: 'signupController as signup'
			})
			.state('login',{
				url:'/login',
				templateUrl: 'app/views/pages/login.html',
				controller: 'loginController as login'
			})
			.state('portfolio',{
				url:'/portfolio',
				templateUrl: 'app/views/pages/portfolio.html',
				controller: 'portfolioController as portfolio',
				resolve: {
					loginRequired: loginRequired
				}
			});
	
		$urlRouterProvider.otherwise('/');
		
		$locationProvider.html5Mode(true);
	
	
		//========================  LOGIN REQUIRED RESOLVE FUNCTION  ===========================
		function loginRequired($q,$location,$auth){
			var deffered = $q.defer();
			if($auth.isAuthenticated()){
			   	deffered.resolve();
			}else{
				//redirect to home page
				$location.path('/');
			}
			return deffered.promise;
		}
	
	});