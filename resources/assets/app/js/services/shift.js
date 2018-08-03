var serShift = {

	formNumberCommand: function() {

		return [
			'<div class="col-xs-12" style="overflow:hidden;">',
				'<form action="" class="formName">',
					'<div class="form-group">',
						'<input type="text" placeholder="Numero da Comanda" class="code form-control" required />',
					'</div>',
					'<p style="color:#900;display:none;">Necessário digitar código da comanda.</p>',
				'</form>',
			'</div>'
		].join('');

	},

	addItemCommand: function( items ) {

		var self = this, list = [];

		list.length = 0;

		items.forEach(function(item, i) {
			list.push([
				'<tr>',
					// '<td>'+ item.id +'</td>',
					'<td>'+ item.products_name +'</td>',
					'<td>'+ item.qtd +'</td>',
					'<td>R$ '+ helpers.moneyPtBr(item.products_price) +'</td>',
					'<td>'+ self.buttonsUpDel( item.products_id ) +'</td>',
				'</tr>'
			].join(''));
		});

		
		return list.join('');

	},

	buttonsUpDel: function( id ) {
		return ['<div class="text-center">',

			'<div class="btn-group">', 
			'<a href="#"data-id="'+ id +'" class="btn-warning btn btn-xs update-item-command" aria-label="Left Align">',
				'<i class="fa fa-pencil-square-o"></i>',
			'</a>',
			'<a href="#" class="btn-danger btn btn-xs del-item-command" data-id="'+ id +'" aria-label="Right Align">',
				'<i class="fa fa-trash"></i>',
			'</a>', 
			'</div>',

		'</div>'].join('');
	},

	getProductForId: function( id, data ) {

		var self = this, items = {}, $form = $('#addEditableProductModal'), qtd;
		
		data.forEach(function(item, i, list) {
			if(item.id == id) {

				qtd = parseInt($form.find('.modal-body input[name="qtd"]').val());

				items = Object.assign({}, items, {
					products_id: item.id,
					products_name: item.name,
					qtd: qtd,
					unit_price: item.amount,
					products_price: item.amount * qtd
				});
				
				if( item.measurement == 'kg' ) {
					$form.find('input[name="index"]').val(shift.command.items.length);
					self.insertDataFieldModal( items );
				}

			}
		});
		
		$form.find('.modal-body input[name="qtd"]').val(1);

		return items;

	},

	itemExists: function( index ) {

		var key = null;

		shift.command.items.forEach(function(item, i) {
			if(index == i) {
				key = i;
			}
		});
	
		return key;

	},

	insertDataFieldModal: function( items ) {
		
		var $form = $('#addEditableProductModal');

		$form.modal('show');

		for( var i in items ) {

			if( i == 'unit_price' ) {
				$form.find('.modal-body input[name="'+ i +'"]')
					.val(helpers.moneyPtBr(items[i]));
			}

			else{
				$form.find('.modal-body input[name="'+ i +'"]').val(items[i]);
			}

		}

		helpers.mask('money');

		$('.preco-total').text('R$ '+ helpers.moneyPtBr(items.unit_price * items.qtd));
	},

	subTotalCommand: function( items ) {

		var sub_total, prices;

		prices = helpers.searchByKey( items, 'products_price' );

		if( prices.length != 0 ) {
			sub_total = helpers.sumArray(prices);
		}	
		
		else{
			sub_total = 0;
		}	

		$('.sub-total-command').find('tr:eq(0) > td')
			.text('R$'+ helpers.moneyPtBr(sub_total));

	},

	getIdControls: function() {



	}

};