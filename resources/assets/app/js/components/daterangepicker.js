var date = {

	init: function( $el ) {

		$($el).daterangepicker({
			autoUpdateInput: false,
			locale: {
				cancelLabel: 'Clear'
			}
		});

		$($el).on('apply.daterangepicker', function(ev, picker) {
			$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
		});

		$($el).on('cancel.daterangepicker', function(ev, picker) {
			$(this).val('');
		});

	}

};