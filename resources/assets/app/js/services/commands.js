var serCommands = {

	items: {},

	commandsTotal: function() {
		$('.tt-commands > .count')
			.text(this.items.length);
	},

	discountTotal: function() {

		var prices = this.items.map(function( item ) {
			return item.discount_price;
		});

		$('.tt-discount > .count').text('R$ '+ this.sumArray(prices));

	},

	total: function() {

		var prices = this.items.map(function(item) {
			return item.total_price;
		});

		$('.total > .count').text('R$ '+ this.sumArray(prices));

	},

	sumArray: function( arr ) {

		total = 0;

		arr.forEach(function(item, i) {
			total += item;
		});

		return helpers.moneyPtBr(total);

	},

	init: function() {

		this.total();
		this.commandsTotal();
		this.discountTotal();

	}

};