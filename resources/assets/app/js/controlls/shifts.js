var shifts = {

	start: function() {

		var shift;

		$('#btnOpeningShift').on('click', function(event) {
			event.preventDefault();

			shift = $('#opening-shift').val()
			console.log($(this).attr('href'));
			if(!shift) {
				helpers.aviso('Selecione um turno na listagem a acima!');
				return false;
			}

			src.host = $(this).attr('href');
			
			src.post({
				turno: $('#opening-shift').val()
			});

			src.api.done(function(res) {
				window.location.href = res.link;
			});

		});

	},

	init: function() {

		this.start();

	}

};