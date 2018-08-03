window.sales = {

	data: {
		id: '',
	},

	table: '',

	service: [], // servicos de pagamento

	method: [], // metodos de pagamentos

	// methods

	filter: function() {

		var self = this;

		$('button[name="submit"]').on('click', function( event ) {

			event.preventDefault();

			self.data = {};

			var $select = $('select[name="pays"]').val(),
				$input  = $('input[name="datefilter"]').val(),

				count   = 0;

			if( $select.length != 0 ) {
				self.data = Object.assign({}, self.data, {pays: $select});
				count++;
			}

			if( $input.length != 0 ) {
				self.data = Object.assign({}, self.data, {date: $input});
				count++;
			}

			if( count == 0 ) {
				helpers.aviso('Nenhum valor informado ao filtro!');
			}

			else{

				src.host = helpers.host;

				src.post(self.data);
				src.api.done(function( items ) {
					
					resSales.add_items_in_table(table.api, items.data);

					serSales.items = items.data;

					serSales.init();

				});


			}

		})

	},

	
	init: function() {

		console.log('Sales');

		this.filter();

		table.init();
		date.init($('input[name="datefilter"]'));

		serSales.getPaymentServices();
		serSales.getMethodPayment();

	}

};