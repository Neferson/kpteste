window.commands = {

	shifts: {},

	filter: function() {

		var self = this;

		$('button[name="submit"]').on('click', function(event) {
			event.preventDefault();

			self.data = {};

			var $select = $('select[name="turno"]').val(),
				$input  = $('input[name="datefilter"]').val(),

				count   = 0;

			if( $select.length != 0 ) {
				self.data = Object.assign({}, self.data, {turno: $select}); count++;
			}

			if( $input.length != 0 ) {
				self.data = Object.assign({}, self.data, {date: $input}); count++;
			}

			if( count == 0 ) {
				helpers.aviso('Nenhum valor informado ao filtro!');
			}

			else {
				src.host = helpers.host;

				src.post(self.data);
				src.api.done(function( items ) {
					
					resCommands.add_items_in_table(table.api, items.data);

					serCommands.items = items.data;
					serCommands.init();

				});
			}


		});

	},

	init: function() {

		console.log('Commands');

		this.filter();

		table.init();
		date.init($('input[name="datefilter"]'));

	}

};