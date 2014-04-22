angular.module( 'App', [] )
	.controller( 'MainCtrl', function( $scope, Drib )
	{
		Drib.getPopular().then( function( shots )
		{
			$scope.shots = shots;
		})
		console.log( $scope.shots );

		$scope.fetchMoreShots = function()
		{

		}
	})
	.service( 'Drib', function( $http )
	{
		var url = {
			prefix: 'http://api.dribbble.com',
			popular: '/shots/popular'
		}

		var _cursor = {
			page: 0
		};
		var _shots = [];

		this.get = function( partial, page )
		{
			var fetchUrl = url.prefix + partial + '?callback=JSON_CALLBACK';

			if ( typeof page !== 'undefined' ) {
				fetchUrl += '&page=' + (page++);
				fetchUrl += '&per_page=' + 30;

			}

			return $http.jsonp( fetchUrl ).then(function( resp )
			{
				_cursor.page = resp.data.page;
				console.log(_cursor);
				_shots = _shots.concat( resp.data.shots );
				return _shots;
			});
		}

		this.getPopular = function()
		{
			return this.get( url.popular, _cursor.page );
		}

	});
