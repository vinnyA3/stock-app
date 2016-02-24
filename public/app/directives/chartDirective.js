angular.module('chartDirective',[])
	.directive('chartDirective', function(){
		return{
			restrict:'E',
			templateUrl:'app/views/pages/partials/chart-partial.html',
			replace:true,
			link: function(scope,element,attrs){
				element.find('button').click(function(){
					console.log('button clicked');
				});	
			},
			controller: function($scope){
				console.log('working....');
			}
		};
	});