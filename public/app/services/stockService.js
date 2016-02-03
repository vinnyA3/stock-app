angular.module('stockService', [])
	.factory('Stock', function($q,$http){
		var stockFactory = {
			getUserStocks : getUserStocks,
			addNewStock : addNewStock,
			getAllStocks : getAllStocks
		};
	
		function getUserStocks(){
			var deffered = $q.defer();
			//make http request
			$http.get('/auth/portfolio')
				.success(function(data){
					if(data){
						deffered.resolve(data);
					}
				})
				.error(function(data){
					deffered.reject(data);
				});
			//return the promise object
			return deffered.promise;
		};
	
		function addNewStock(stockname,stocksymbol){
			var deffered = $q.defer();
			//make post req
			$http.post('/auth/portfolio',{stockname: stockname, symbol: stocksymbol})
				.success(function(data){
					deffered.resolve(data);
				})
				.error(function(data){
					deffered.reject(data);	
				});
			//return the promise object
			return deffered.promise;
		};
	
		function getAllStocks(){
			var deffered = $q.defer();
			//make the get req
			$http.get('/auth/allstocks')
				.success(function(data){
					deffered.resolve(data);
				})
				.error(function(data){
					deffered.reject(data);
				});
			//return the promise object
			return deffered.promise;
		}
	
		//return the stockFactory
		return stockFactory;
	});