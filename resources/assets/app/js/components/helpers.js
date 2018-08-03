var helpers = {

	host: '',

	moneyEnUs: function( money ) {
		return parseFloat(money.replace(',', '.'));
	},

	moneyPtBr: function(num) {
		
		x = 0;

		if(num<0){
			num = Math.abs(num);
			x = 1;
		}

		if(isNaN(num)) num = "0";
		cents = Math.floor((num*100+0.5)%100);

		num = Math.floor((num*100+0.5)/100).toString();

		if(cents < 10) cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
			num = num.substring(0,num.length-(4*i+3))+'.'
		+num.substring(num.length-(4*i+3));

		ret = num + ',' + cents;

		if (x == 1) ret = ' - ' + ret; return ret;

	},

	dateFormat: function( str ) {
		return str.split(' ').slice(0, 1).join('')
			.split('-').reverse().join('/');
	},	

	ucFirst: function( str ) {
		if( str.length != 0 ) {
			return str[0].toUpperCase() + str.slice(1);
		}
	},

	setHost: function() {

		var $input = $('input[name="host"]');

		var expr = /http:\/\/|https:\/\//gi, host;

		if($input.val() != undefined) {

			host = $input.val()
				.replace(expr, '').split('/');

			host.splice(0, 1); // remove host_name

			this.host = '/'+ host.join('/');

		}

	},

	// alerts
	aviso: function( message ) {
		$.alert({
			icon: 'fa fa-warning',
			type: 'orange',
			title: 'Aviso!',
			content: message,
		});
	},

	// alerts
	success: function( message ) {
		$.alert({
			icon: 'fa fa-thumbs-o-up',
			type: 'blue',
			title: 'Sucesso!',
			content: message,
		});
	},

	sumArray: function( arr ) {

		var total = arr.reduce(function(a, b) {
			return a + b;
		});

		return total;

	},

	mask: function( type ) {

		if( type == 'money' ) {
			$('.money').mask('###.###.###.###.###,##', {reverse: true});
		}

	},

	searchByKey: function( array, key ) {

		var items = array.map(function( item ) {
			return item[key];
		});

		return items

	}


};