var app = angular.module("PortfolioApp", []);

app.controller('MainController', function($scope, $http){

	$scope.app_title = "CryptoCurrency Investments";

	$scope.addPrices = function(coins) {

		console.log("Fetching prices")

		coins.forEach(function(coin, index) {
			$http({
			  method: 'GET',
			  url: ['https://coinmarketcap-nexuist.rhcloud.com/api', coin.symbol].join('/')
			}).then(function successCallback(response) {
				 // set the name, price, and market cap on the coin object
				 coin.name       = response.data.name; 
		   		 coin.price      = response.data.price.usd; 
		   		 coin.market_cap = response.data.market_cap.usd;
    		});
		});

    	console.log(coins);

    	return coins;
    };

    $scope.buildCoins = function() {
    	var symbols      = ["vtc", "ltc", "ark",  "sc", "neo", "nav"];	
	    var buyPrices    = [1.00 , 29.57,  2.34, .0178, 6.441, 0.291]; 
	    var quantities   = [900. ,118.04,  1425, 37813,  1000, 10000]; 
	    
	    var coins = [];

	    for(var i = 0; i < symbols.length; i++) {
	    	var coin = {}; 
	    	coin.symbol          = symbols[i];
	    	coin.price_bought_at = buyPrices[i]; 
	    	coin.number_of_coins = quantities[i];
	    	coins.push(coin);
	    }

	    return coins;
    };


      

    $scope.coins = $scope.addPrices($scope.buildCoins());
  
});


