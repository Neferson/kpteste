var serSales = {

	items: {},

	debitoTotal: function() {
		
		var list = sales.method.map(function(item){ // list de id
			if( item.type == 'debito' ) {
				return item.id;
			}
		});

		$('.tt-debito > .count')
			.text('R$ '+ helpers.moneyPtBr(this.calculationProcess(list)));

	},

	creditoTotal: function() {

		var list = sales.method.map(function(item){ // list de id
			if( item.type == 'credito' ) {
				return item.id;
			}
		});

		$('.tt-credito > .count')
			.text('R$ '+ helpers.moneyPtBr(this.calculationProcess(list)));

	},

	refeicaoTotal: function() {

		var list = sales.method.map(function(item){ // list de id
			if( item.type == 'refeicao' ) {
				return item.id;
			}
		});

		$('.tt-refeicao > .count')
			.text('R$ '+ helpers.moneyPtBr(this.calculationProcess(list)));

	},

	total: function() {
		
		var self = this;
		var tt = 0; // total
		
		Object.keys(self.items).forEach(function(item, i) {
			tt += self.items[i].final_price - self.items[i].discount_price;
		})

		$('.total > .count').text('R$ '+ helpers.moneyPtBr(tt));

	},

	calculationProcess: function(list) {

		var self = this;
		var tt = 0; // total

		Object.keys(self.items).forEach(function(item, i) {
			if( list.indexOf( parseInt(self.items[i].payment_method_id) ) != -1 ) {
				tt += self.items[i].final_price - self.items[i].discount_price;
			}
		});
		console.log(tt);
		return tt;

	},

	setTextPaymentService: function( id ) {

		var text = '';

		sales.service.forEach(function(item, i) {
			if( item.id == id ) {
				text = item.text;
			}	
		});

		return text;

	},

	setTextMethodPayment: function( id ) {

		var text = '';

		$.each(sales.method, function(index, item) {
			if( item.id == id ) {
				text = item.title;
			}
		});

		return helpers.ucFirst(text);

	},

	getPaymentServices: function() {

		var $select = $('select[name="pays"]');

		$select.find('option').each(function(index, item) {
			if( index != 0 ) {
				sales.service.push(Object.assign({}, {
					'id': $select.find('option').eq(index).val(),
					'text': $select.find('option').eq(index).text(),
				}));
			}
		});

	},

	getMethodPayment: function() {

		src.host = '/v1/reports/get_method_pay';
		src.get();

		src.api.done(function( items ) {
			sales.method = items.data;	
		});

	},

	init: function() {

		this.total();
		this.debitoTotal();
		this.creditoTotal();
		this.refeicaoTotal();

	}


}