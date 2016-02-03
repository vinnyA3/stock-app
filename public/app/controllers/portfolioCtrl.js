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
	
		//add these vars to vm to dynamically update the chart ...
			var seriesOptions = [],
			seriesCounter = 0,
			names = ['IBM','MSFT', 'AAPL', 'GOOG'];	
	
		function createChart(){
			
			//add service here
			   $('.stock-graph').highcharts('StockChart', {

					rangeSelector: {
						selected: 4
					},

					yAxis: {
						labels: {
							formatter: function () {
								return (this.value > 0 ? ' + ' : '') + this.value + '%';
							}
						},
						plotLines: [{
							value: 0,
							width: 2,
							color: 'silver'
						}]
					},

					plotOptions: {
						series: {
							compare: 'percent'
						}
					},

					tooltip: {
						pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
						valueDecimals: 2
					},

					series: seriesOptions
				});
			
			}; //end chart function
	
			    $.each(names, function (i, name) {

        $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {

            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });
    });
	
		//call our get stock function
		vm.getStocks();
		
	});