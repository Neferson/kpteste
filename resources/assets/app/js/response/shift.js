var resShift = {

	openCommandIsSuccess: function() {
		src.api.done(function() {
    		location.reload();
    	});
	},

	openCommand: function( code ) {

		$('html, body').stop().animate({scrollTop:0}, 600, 'swing');
		$('.sub-total-command').find('tr:eq(0) > td').text('R$ 0,00');
		$('.code-command').text(code);
		
		src.api.done(function( res ) {	

			shift.command.items = res.items;
			
			$('.items').find('tbody').html(serShift.addItemCommand(res.items));

			serShift.subTotalCommand(res.items);

		});

		src.api.fail(function() {
			$('.items').find('tbody').html('<tr><td colspan="4">Essa comanda esta vazia!</td></tr>');
		});

	},

	discountCommand: function() {

		var total, sub_total, $commands, discount, $modal;

		src.api.done(function(res) {
			
			$('#closeControlModal').find('.error-coupon').hide();

			$modal    = $('#closeControlModal');
			$commands = $( '.commands' ).find('tbody > tr');

			$modal.find('input[name="id-cupon"]').val(res.id);

			$commands.each(function( i, item ) {
				if( $commands.eq(i).find('td:eq(0)').text().trim() == shift.command.id ) {
					sub_total = helpers.moneyEnUs($commands.eq(i).find('td:eq(4)').text().trim().substr(3));
				}
			});
			
			if( res.type == 'percent' ) {
				discount = Math.round(parseInt(res.value)*sub_total)/100;
			}

			else{
				discount = parseInt(res.value);
			}

			total = (sub_total - discount) < 0 ? 0 : sub_total - discount;

			$modal.find('table tbody tr > .discount').text('R$ '+ helpers.moneyPtBr(discount));
			$modal.find('table tbody tr > .total').text('R$ '+ helpers.moneyPtBr(total));

		});

		src.api.fail(function(status, error, text) {
			$('#closeControlModal').find('.error-coupon').show();
		});

	},

	getMethodPayment: function() {

		var html = ['<option value="">Escolha uma opção</option>'];

		$('#formClosingControl').find('select[name="payment_method"]').hide().next().show();

		src.api.done(function(data) {

			$(data).each(function(key, item) {
				html.push('<option value="'+ item.id +'">'+ item.title +'</option>');
			});

			$('#formClosingControl').find('select[name="payment_method"]').show().html(html.join('')).next().hide();

		});

	},

	updateCommand: function() {

		var $commands, sub_total;

		src.api.done(function(res) {

			prices    = helpers.searchByKey( shift.command.items, 'products_price' );
			sub_total = helpers.moneyPtBr(helpers.sumArray(prices));

			helpers.success("Comanda <b>"+ shift.command.id +"</b> atualizada com sucesso!"); 

			$commands = $( '.commands' ).find('tbody > tr');
			$commands.each(function( i, item ) {
				
			 	if( $commands.eq(i).find('td:eq(0)').text().trim() == shift.command.id ) {

			 		$commands.eq(i).find('td:eq(3)').text(shift.command.items.length);
			 		$commands.eq(i).find('td:eq(4)')
			 			.text('R$ '+ sub_total);

			 	}

			});

		});

	},

	closedCommand: function() {

		src.api.done(function(res) {

			$.confirm({
    			title: 'Comanda fechada sucesso!',
    			icon: 'fa fa-thumbs-o-up',
				type: 'blue',
    			buttons: {
    				formSubmit: {
    					text: 'OK!',
			            btnClass: 'btn-blue',
			            action: function () {
				            location.reload();
			            }
    				}
    			}
    		});
		});

	}

};