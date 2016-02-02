angular.module('appRoutes',['ui.router'])
	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider
			.state('home',{
				url:'/',
				views: {
					'': {templateUrl: 'app/views/pages/home.html'},
					'nav@home': {templateUrl: 'app/views/pages/partials/navbar-home-transparent.html',controller:'navbarController as nav'}
				},
				controller: 'mainController as main'
			})
			.state('signup',{
				url:'/signup',
				views:{
					'':{templateUrl:'app/views/pages/signup.html', controller: 'signupController as signup'},
					'nav@signup':{templateUrl:'app/views/pages/partials/navbar.html', controller:'navbarController as nav'}
				}
			})
			.state('login',{
				url:'/login',
				views:{
					'':{templateUrl:'app/views/pages/login.html', controller: 'loginController as login'},
					'nav@login':{templateUrl:'app/views/pages/partials/navbar.html', controller:'navbarController as nav'}
				}
			})
			.state('portfolio',{
				url:'/portfolio',
				views:{
					'':{templateUrl:'app/views/pages/portfolio.html', controller: 'portfolioController as portfolio'},
					'nav@portfolio':{templateUrl:'app/views/pages/partials/navbar.html', controller:'navbarController as nav'}
				},
				resolve: {
					loginRequired: loginRequired
				}
			})
			.state('hotstocks',{
				url: '/hotstocks',
				views:{
					'':{templateUrl:'app/views/pages/hotStocks.html'},
					'nav@hotstocks':{templateUrl:'app/views/pages/partials/navbar.html', controller:'navbarController as nav'}
				},
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