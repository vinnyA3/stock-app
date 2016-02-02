angular.module('portfolioCtrl',['stockService'])
	.controller('portfolioController', function(Stock){
		var vm = this;
	
		//get our stocks and them to the view
		vm.getStocks = function(){
			Stock.getUserStocks()
				.then(function(data){
					console.log(data);
					//set the vm's userData property (contains stocks)
					vm.userData = data;
				})
				.catch(function(data){
					vm.error = true;
					vm.errorMessage = 'There was an error retrieving your stocks.';
				})
		};
	
		//call our get stock function
		vm.getStocks();
		
	});