
window.onload = function( event ) {

	helpers.setHost();

	var routes = [
		'commands', 
		'shift', 
		'sales', 
		'dashboard', 
		'employees', 
		'companies', 
		'shifts'
	];

	boostrap(location.href.split('/'))

	function boostrap( route ) {

		var target = route.pop();
		var index = routes.indexOf( target );

		if( index != -1 ) {
			window[routes[index]].init();
		}else{
			return boostrap( route );
		}

	}

};


