var resCommands = {

	add_items_in_table: function( table, items ) {

		table.clear().draw();

		Object.keys(items).forEach(function(item, i) { // add novos valores a tabela
			
			table.row.add([

				items[i].id,
				items[i].code,
				helpers.ucFirst(items[i].name),
				'R$ '+ helpers.moneyPtBr(items[i].discount_price),
				'R$ '+ helpers.moneyPtBr(items[i].total_price),
				'R$ '+ helpers.moneyPtBr(items[i].final_price - items[i].discount_price),
				helpers.dateFormat(items[i].updated_at)

			]).draw();

		});

	}

}