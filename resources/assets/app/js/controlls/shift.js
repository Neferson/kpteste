var shift = {

	data: {},

	commands: [],

	command: {
		id: 0,
		items: [],
	},

	createCommand: function() {

		$('#btnOpeningSalesControls').on('click', function(event) {
			event.preventDefault();

			src.host = $(this).attr("href");

			$.confirm({
    			title: '&nbsp;Insira aqui <b>código</b> da comanda.',
    			content: serShift.formNumberCommand(),
    			icon: 'fa fa-list-alt',
				type: 'blue',
    			buttons: {
    				formSubmit: {
    					text: 'Salvar!',
			            btnClass: 'btn-blue',
			            action: function () {

			            	var $code = this.$content.find('.code').val();

			            	if(!$code) {
			            		$('.formName').find(' > p').show();
                    			return false;
			            	}
		            		
			            	src.post({code: $code});
			            	resShift.openCommandIsSuccess();
			            	

			            }
    				},
    				cancel: function () {
            			text: 'Cancelar'
        			},
    			}
    		});

		});

	},

	openCommand: function() {

		var self = this, code, host = location.href;

		$('.control-edit').on('click', function(event) {
			event.preventDefault();

			code = $(this).parents('tr').find('td:eq(0)').text().trim();

			self.command.id = 0; self.command.items.length = 0;
			self.command.id = parseInt(code);

			$('.commands').find('tbody > tr').css('background-color', '#f8f8f8');
			$(this).parents('tr').css('background-color', '#E0EEEE');

			src.host = '/'+ host.substr(host.indexOf('v1')) +'/controls/'+ $(this).attr('data-id') +'/item-exists';
			src.post();

			resShift.openCommand( code );

		});

	},

	addItemCommand: function() {

		var self = this, code, host, list = [];

		$('.add-item-command').off('click').on('click', function(event) {
			event.preventDefault();

			if( self.command.id == 0 ) {
				helpers.aviso("Nenhuma comanda selecionada!");
				return false;
			}	

			var id = $(this).attr('data-id');

			self.command.items.push(serShift.getProductForId( id, self.data ));

			serShift.subTotalCommand(self.command.items);

			$('.items').find('tbody').html(serShift.addItemCommand(self.command.items));

		});

	},

	updateItemCommand: function() {

		var self = this;

		$('.items').on('click', '.update-item-command', function(event) {
			event.preventDefault();

			var index = $(this).parents('tr').index();

			serShift.insertDataFieldModal(self.command.items[index]);

			$('#addEditableProductModal').find('input[name="index"]').val(index);

		});

	},

	deleteItemCommand: function() {

		var self = this;

		$('.items').on('click', '.del-item-command', function(event) {
			event.preventDefault();

			var i = serShift.itemExists($(this).parents('tr').index());

			$.confirm({
    			title: self.command.items[i].products_name,
    			buttons: {
    				formSubmit: {
    					text: 'SIM!',
			            btnClass: 'btn-red',
			            action: function () {
			            	
			            	self.command.items.splice(i, 1);
			            	serShift.subTotalCommand(self.command.items);
			            	$('.items').find('tbody')
			            		.html(serShift.addItemCommand(self.command.items));

			            }
    				},
    				cancel: function () {
            			text: 'NÃO'
        			},
    			}
    		});

			

		});

	},

	updateDataModal: function() {

		var self = this;

		var $modal, id, amount, qtd, key;

		$('.update-data-modal').on('click', function(event) {
			event.preventDefault();

			$modal = $(this).parents('.modal');

			key    = $modal.find('input[name="index"]').val();

			id     = parseInt($modal.find('input[name="id"]').val());
			qtd    = parseInt($modal.find('input[name="qtd"]').val());
			amount = helpers.moneyEnUs($modal.find('input[name="unit_price"]').val());
			
			if( amount == 0 ) 
			{
				$modal.find('.error').show(); return false;
			}
			
			self.command.items[key].qtd = qtd;

			if( amount != self.command.items[key].unit_price ) {
				self.command.items[key].unit_price = amount;
			}

			self.command.items[key].products_price = self.command.items[key].unit_price * self.command.items[key].qtd;

			$modal.find('input[name="qtd"]').val(1);
			$modal.find('.error').hide();

			$('.items').find('tbody').html(serShift.addItemCommand(self.command.items));
			$('.preco-total').text('R$ '+ helpers.moneyPtBr(self.command.items[key].products_price));

			serShift.subTotalCommand(self.command.items);

			$('#addEditableProductModal').modal('hide');

		});

	},

	updateCommand: function() {

		var self = this;

		$('.update-command').on('click', function(event) {
			event.preventDefault();

			if( self.command.items.length == 0 ) {
				helpers.aviso("Nenhuma comanda selecionada!");
				return false;
			}

			var id_shift = '/v1/shift/'+ location.href.split('/').pop();

			self.commands.forEach(function(command, i) {
				if(command.code == self.command.id) {
					src.host = id_shift +'/controls/'+ command.id +'/items';
				}
			});

			src.post( {'items':self.command.items} );

			resShift.updateCommand();


		});

	},

	deleteCommand: function() {

		var host = location.href, id_controls;

		$('.control-delete').on('click', function(event) {
			event.preventDefault();

			id_controls = $(this).attr('data-id');

			$.confirm({
    			title: 'Deseja excluir essa comanda?',
    			icon: 'fa fa-thumbs-o-up',
				type: 'red',
    			buttons: {
    				formSubmit: {
    					text: 'OK!',
			            btnClass: 'btn-red',
			            action: function () {
				            src.host = '/'+ host.substr(host.indexOf('v1')) +'/controls/'+ id_controls + '/delete';
				            src.post();
				            src.api.done(function(res) {
				            	 location.reload();
				            });
			            }
    				},
    				cancel: function() {
    					text: 'Cancelar'
    				}
    			}
    		});

		});

	},

	closedCommand: function() {

		var self = this, $modal, $commands, code, sub_total;

		$('.control-close').on('click', function(event) {
			event.preventDefault();

			$modal    = $('#closeControlModal');
			$commands = $( '.commands' ).find('tbody > tr');
			code      = parseInt($(this).parents('tr').find('td:eq(0)').text().trim());
			sub_total = $(this).parents('tr').find('td:eq(4)').text().trim();

			$modal.modal('show');

			self.command.id = code;

			$modal.find('input[name="id-controls"]').val($(this).attr('data-id'));
			$modal.find('.code-command').text(code);
			$modal.find('input[name="desconto"]').val('');
			$modal.find('input[name="id-cupon"]').val('');

			$modal.find('table tbody tr > .sub-total').text(sub_total);
			$modal.find('table tbody tr > .discount').text('R$ 0,00');
			$modal.find('table tbody tr > .total').text(sub_total);

		});

		$('#btnClosingControl').on('click', function(event) {
			event.preventDefault();

			var payment_service, payment_method, host = location.href, id_controls, id_cupon, $modal;

			$('.error-payment-service, .error-payment-method').hide();

			$modal = $('#closeControlModal');

			payment_service = $('select[name="payment_service"]').val();
			payment_method  = $('select[name="payment_method"]').val();
			id_controls     = $('input[name="id-controls"]').val();
			id_cupon        = $('input[name="id-cupon"]').val();

			if( !payment_service ) {
				$('.error-payment-service').show();
				return false;
			}

			if( !payment_method ) {
				$('.error-payment-method').show();
				return false;
			}
			
			src.host = '/'+ host.substr(host.indexOf('v1')) +'/controls/'+ id_controls + '/close';

			src.post({
				'cupons_id': id_cupon,
				'payment_service_id': payment_service,
				'payment_method_id': payment_method,
				'total_price': helpers.moneyEnUs($modal.find('table tbody tr > .sub-total').text().trim().substr(3)),
				'discount_price': helpers.moneyEnUs($modal.find('table tbody tr > .discount').text().trim().substr(3)),
				'final_price': helpers.moneyEnUs($modal.find('table tbody tr > .total').text().trim().substr(3))
			});

			resShift.closedCommand();

		});
		
	},

	discountCommand: function() {

		$('.aplicar-desconto').on('click', function(event) {
			event.preventDefault();

			src.host = $(this).attr('href');
			src.post($('#formClosingControl').serialize());

			resShift.discountCommand(); // response

		});

	},

	getMethodPayment: function() {

		$('#formClosingControl').on('change', 'select[name="payment_service"]', function() {
			
			src.host = [
				$('meta[name="url-app"]').attr('content'),
				'/payments_service/',
				$(this).val(),
				'/payments-methods'
			].join('');

			src.post();

			resShift.getMethodPayment();

		});

	},

	getResultFrame: function(host) {

		var sales, total, discount;

		src.host = '/'+ host.substr(host.indexOf('v1')) +'/result-frames';
		src.get();

		src.api.done(function(res) {

			var sales = res.sales;
			
			$('.frames .total-commands').text(sales.length);

			prices = sales.map(function(item) {
				return item.total_price
			});

			discount = sales.map(function(item) {
				return item.discount_price
			});

			total = helpers.sumArray(prices) - helpers.sumArray(discount);

			$('.frames .sub-total').text('R$ '+ helpers.moneyPtBr(helpers.sumArray(prices)));
			$('.frames .discount').text('R$ '+ helpers.moneyPtBr(helpers.sumArray(discount)));
			$('.frames .total').text('R$ '+ helpers.moneyPtBr(total));

		});

	},

	closeShift: function() {

		var self = this, host = location.href;

		$('#closeShift').on('click', function(event) {
			event.preventDefault();

			if( self.commands.length != 0 ) {
				helpers.aviso('Todas as comandas não foram encerradas!');
				return false;
			}

			$.confirm({
    			title: 'Deseja realmente finalizar turno?',
    			icon: 'fa fa-book',
				type: 'red',
    			buttons: {
    				formSubmit: {
    					text: 'Sim!',
			            btnClass: 'btn-red',
			            action: function () {	

			            	src.host = '/'+ host.substr(host.indexOf('v1')).replace('shift', 'shifts') +'/closing';
			            	src.post();

			            	src.api.done(function(res) {
			            		location.href = res.link
			            	});

			            }
    				},
    				cancelar: function () {},
    			}
    		});

		});

	},

	init: function() {

		this.data     = JSON.parse($('.list-product').val());
		this.commands = JSON.parse($('.list-commands').val());

		this.createCommand();
		this.openCommand();
		this.updateCommand();
		this.deleteCommand();
		this.closedCommand();
		this.discountCommand();
		
		this.addItemCommand();
		this.updateItemCommand();
		this.deleteItemCommand();

		this.updateDataModal();
		this.getMethodPayment();
		this.getResultFrame(location.href);

		this.closeShift();

		table.init('.datatable');

	}

};