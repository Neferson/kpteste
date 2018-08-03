var resSales = {

	items: {},

	shift: function() {

	},

	pay: function() {

	},

	add_items_in_table: function( table, items ) {

		table.clear().draw();
		
		Object.keys(items).forEach(function(item, i) { // add novos valores a tabela
			
			table.row.add([

				items[i].id,
				serSales.setTextPaymentService(items[i].payment_service_id),
				serSales.setTextMethodPayment(items[i].payment_method_id),
				'R$ '+ helpers.moneyPtBr(items[i].total_price),
				'R$ '+ helpers.moneyPtBr(items[i].final_price - items[i].discount_price),
				helpers.dateFormat(items[i].updated_at)

			]).draw();

		});

	},

}