var src = {

	host: '',

	api: '',

	post: function(data) {

		var $modal = '';

		this.auth();

		this.api = $.ajax({
			url: this.host, type: 'post', dataType: 'json', data: data
		});

	},

	get: function() {

		this.auth();

		this.api = $.ajax({
			url: this.host, type: 'get', dataType: 'json'
		});

	},

	auth: function() {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});
	},

	init: function() {},

};