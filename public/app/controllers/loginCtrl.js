angular.module('loginCtrl',['satellizer'])
	.controller('loginController', function($location, $auth){
		var vm = this;
	
		vm.login = function(){
			$auth.login({email: vm.user.email, password: vm.user.password})
				.then(function(res){
					if(!res.data.token){
						vm.error = true;
                        vm.errorMessage = res.data.message;
					}else{
						$location.path('/portfolio');
					}
				})
				.catch(function(data){
					vm.error = true;
					vm.errorMessage = 'Failed to login, please try again';
				});
		};
	
	});//end controller