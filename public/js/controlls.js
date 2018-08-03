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
var alert = {

	api: {},

	secret: function( message ) 
	{

		this.api = $.confirm({
			title: 'Necessário Senha do Administrador!',
			icon: 'fa fa-unlock-alt',
			type: 'red',
			content: [
				'<strong>'+ message +'</strong>',
				'<form style="overflow:hidden;">',
					'<input class="form-control" type="password" name="passmaster" value="">',
					'<small class="message-error" style="display:none;color:#900;">Senha inválida!</small>',
				'</form>'
			].join(''),
			buttons: {
				ok: {
					text: 'OK!',
					btnClass: 'btn-red',
				},
				cancel: {
					text: 'Fechar',
				}
			}
		});

	},

	aviso: function( message ) {

		this.api = $.confirm({
			icon: 'fa fa-warning',
			type: 'orange',
			title: 'Aviso!',
			content: '<h4 class="text-center">'+ message +'</h4>',
			buttons: {
				save: {
					text: 'Fechar!',
		            btnClass: 'btn-orange',
				},
			}
		});

	},

	confirme: function( message ) {

		this.api = $.confirm({
			title: 'Atenção!',
			content: '<h4 class="text-center">'+ message +'</h4>',
			icon: 'fa fa-list-alt',
			type: 'red',
			buttons: {
				save: {
					text: 'SIM!',
		            btnClass: 'btn-red',
				},
				cancel: {
					text: 'Fechar',
				},
			}
		});

	},

	success: function( message ) {

		this.api = $.confirm({
			icon: 'fa fa-thumbs-o-up',
			type: 'blue',
			title: 'Sucesso!',
			content: '<h4 class="text-center">'+ message +'</h4>',
			buttons: {
				ok: {
					text: 'OK!',
					btnClass: 'btn-blue'
				}
			}
		});

	},

	form: function( title, html ) {

		this.api = $.confirm({
			title: title,
			content: html,
			icon: 'fa fa-list-alt',
			type: 'blue',
			buttons: {
				save: {
					text: 'Salvar!',
		            btnClass: 'btn-blue',
				},
				cancel: {
					text: 'Fechar',
				},
			}
		});

	}

};
var charts = {

	api: '',

	settings: {
		type: 'doughnut',
		tooltipFillColor: "rgba(51, 51, 51, 0.55)",
		data: {
			labels: ['...'],
			datasets: [{
				data: [100],
				backgroundColor: [
				"#BDC3C7",
				// "#9B59B6",
				// "#E74C3C",
				"#26B99A",
				// "#3498DB"
				],
				hoverBackgroundColor: [
				"#CFD4D8",
				// "#B370CF",
				// "#E95E4F",
				"#36CAAB",
				// "#49A9EA"
				]
			}]
		},
		options: { 
			legend: false, 
			responsive: false 
		}
	},

	doughnut: function(labels, data) {
		
		var sets = this.api.data.datasets[0];

		this.api.data.labels = labels;
		sets.data = data; // Would update the first dataset's value of 'March' to be 50

		sets.backgroundColor.length = 0;
		sets.hoverBackgroundColor.length = 0;

		sets.backgroundColor = ['#3498DB', '#E74C3C', '#9B59B6'];
		sets.hoverBackgroundColor = ['#49A9EA', '#E95E4F', '#B370CF'];

		this.api.update({
			duration: 1000,
			easing: 'easeOutBounce'
		});

	},

	init: function() {

		var self = this;

		$('.canvasDoughnut').each(function(){
			self.api = new Chart( $(this), self.settings);
		});	

	}

};
var date = {

	predefined: function( $el ) {

		var start = moment().subtract(29, 'days');
		var end = moment();

		function cb(start, end) {
			$($el +' span').html(start.format('D MMMM, YYYY') + ' - ' + end.format('D MMMM, YYYY'));
		}

		$($el).daterangepicker({
			startDate: start,
			endDate: end,
			monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			locale: {
				"applyLabel": "Aplicar",
        		"cancelLabel": "Cancelar"
			},
			ranges: {
				'Hoje': [moment(), moment()],
				'Ontem': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Últimos 7 Dias': [moment().subtract(6, 'days'), moment()],
				'Últimos 30 Dias': [moment().subtract(29, 'days'), moment()],
				'Este Mês': [moment().startOf('month'), moment().endOf('month')],
				'Mês Passado': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			}
		}, cb);

		cb(start, end);

	},

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
var helpers = {

	host: '',

	moneyEnUs: function( money ) {
		return parseFloat(money.replace(',', '.'));
	},

	moneyPtBr: function(num) {
		
		x = 0;

		if(num<0){
			num = Math.abs(num);
			x = 1;
		}

		if(isNaN(num)) num = "0";
		cents = Math.floor((num*100+0.5)%100);

		num = Math.floor((num*100+0.5)/100).toString();

		if(cents < 10) cents = "0" + cents;
		for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
			num = num.substring(0,num.length-(4*i+3))+'.'
		+num.substring(num.length-(4*i+3));

		ret = num + ',' + cents;

		if (x == 1) ret = ' - ' + ret; return ret;

	},

	dateFormat: function( str ) {
		return str.split(' ').slice(0, 1).join('')
			.split('-').reverse().join('/');
	},	

	ucFirst: function( str ) {
		if( str.length != 0 ) {
			return str[0].toUpperCase() + str.slice(1);
		}
	},

	setHost: function() {

		var $input = $('input[name="host"]');

		var expr = /http:\/\/|https:\/\//gi, host;

		if($input.val() != undefined) {

			host = $input.val()
				.replace(expr, '').split('/');

			host.splice(0, 1); // remove host_name

			this.host = '/'+ host.join('/');

		}

	},

	getHost: function( start ) {

		var host = location.href;

		host = host.indexOf('#') != -1 ? host.replace('#', '') : host;

		return '/'+ host.substr(host.indexOf(start));

	},

	// alerts
	aviso: function( message ) {
		$.alert({
			icon: 'fa fa-warning',
			type: 'orange',
			title: 'Aviso!',
			content: message,
		});
	},

	// alerts
	success: function( message ) {
		$.alert({
			icon: 'fa fa-thumbs-o-up',
			type: 'blue',
			title: 'Sucesso!',
			content: message,
		});
	},

	sumArray: function( arr ) {

		var total = arr.reduce(function(a, b) {
			return a + b;
		});

		return total;

	},

	mask: function( type ) {

		if( type == 'money' ) {
			$('.money').mask('###.###.###.###.###,##', {reverse: true});
		}

	},

	searchByKey: function( array, key ) {

		var items = array.map(function( item ) {
			return item[key];
		});

		return items

	}


};
var table = {

	api: '',

	langPtBr: {
		"sEmptyTable": "Nenhum registro encontrado",
		"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
		"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
		"sInfoFiltered": "(Filtrados de _MAX_ registros)",
		"sInfoPostFix": "",
		"sInfoThousands": ".",
		"sLengthMenu": "_MENU_ Resultados por página",
		"sLoadingRecords": "Carregando...",
		"sProcessing": "Processando...",
		"sZeroRecords": "<h3>Nenhum Registro Encontrado</h3>",
		"sSearch": "Pesquisar",
		"oPaginate": {
			"sNext": "Próximo",
			"sPrevious": "Anterior",
			"sFirst": "Primeiro",
			"sLast": "Último"
		},
		"oAria": {
			"sSortAscending": ": Ordenar colunas de forma ascendente",
			"sSortDescending": ": Ordenar colunas de forma descendente"
		}					
	},

	init: function( $el, $page ) {

		if(!$el)
			$el = '#datatable';

		if(!$page)
			$page = 10;

		var self = this;

		this.api = $($el).DataTable({
			'language': this.langPtBr, 
			"pageLength": $page,
			'drawCallback': function() {

				self.suport_sales();

			}
		});

	},

	suport_sales: function() {

		sales.abrir_comanda();
		sales.fechamento_direto();
		sales.entrada_do_desconto();
		sales.adicionar_item_na_comanda();

		ser_sales.deletar_comanda();
		ser_sales.deletar_item_da_comanda();


	}

};
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
var payResponse = {

	createPaymentsMethodSuccess: function() {

		src.api.done(function(res) {

			successToast();	

			setTimeout(function(){
				location.reload();
			}, 1500);

		});

		src.api.fail(function() {
			dangerToast();
		});

	},

	getPaymentsMethod: function() {

		var $form = $('#paymentMethodForm'), ser = payService;

		src.api.done(function(res) {
			$('.paymentMethodModal').modal('show');

			ser.insertDataInput( res );

		});

		src.api.fail(function(res) {
			dangerToast();
		});

	},

	destroyPaymentsMethod: function() 
	{

		src.api.done(function(res) {
			if(data){

				$("#payment-method-"+ id).fadeOut();
				successToast();	

			}
		});

		src.api.fail(function() {
			dangerToast();
		});

	}

};
var res_reports = {

	filter: function() {

		src.api.done(function(res) {

			var subtt = res.map(function(item) {
				return item.sub_total;
			});

			var taxa = res.map(function(item) {
				return item.taxa
			});

			var total = res.map(function(item) {
				return item.total
			});

			$('.frames').find('.sub-total').text("R$ "+ helpers.moneyPtBr(helpers.sumArray(subtt)));
			$('.frames').find('.total-commands').text(res.length);
			$('.frames').find('.taxa').text("R$ "+ helpers.moneyPtBr(helpers.sumArray(taxa)));
			$('.frames').find('.total').text("R$ "+ helpers.moneyPtBr(helpers.sumArray(total)));

			table.api.clear().draw();

			res = res.reverse();

			Object.keys(res).forEach(function(i) {
				table.api.tables('.table-reports').row.add([
					res[i].id,
					res[i].codigo,
					res[i].servico,
					"R$ "+ helpers.moneyPtBr(res[i].sub_total),
					res[i].cartao,     
					"R$ "+ helpers.moneyPtBr(res[i].taxa),    
					"R$ "+ helpers.moneyPtBr(res[i].total),   
					res[i].date.substr(0,10).split('-').reverse().join('/') +' '+ res[i].date.substr(10)
				]).draw();
			});

			$('#gifload').modal('hide');

		});

		src.api.fail(function(error) {

			table.api.clear().draw();

			$('#gifload').modal('hide');

		});

	}

};
var res_sales = {

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


	pegar_cupons_de_desconto: function() {

		src.host = helpers.getHost(shift.target) +'/get/cupons';
		src.get();

		src.api.done(function(res) {
			shift.cupons = res[0];
		});
		
	}, 

	finalizar_pagamento_da_comanda: function() {

		var command = shift.command, entradas = shift.entradas;

		src.host = helpers.getHost(shift.target) +'/controls/'+ ser_sales.get_id_controls() + '/close';

		src.post({
			'post': {
				'cupons_id':command.cupons_id,
				'total_price':command.sub_total,
				'discount_price':command.desconto.toFixed(2),
				'final_price':command.total.toFixed(2)
			},
			'entradas': shift.entradas
		});

		src.api.done(function(res) {

			var api = ser_sales.modal_pagamento_finalizado();

			api.onOpen = function() {
				
				$(window).on('keypress', function(event) {
					if ( event.which == 13 ){
     					event.preventDefault(); location.reload();
     				}
				});

				$('.jconfirm-buttons').find('button[type="button"]').on('click', function() {
					location.reload();
				});

			}

		});

		// src.api.fail(function(fail) {

		// });

	},

	items: function() {

		src.api.done(function(res) {
			shift.command.items = res.items;
		});

	},

	abrir_modal_fechamento: function( $id ) 
	{
		src.host = helpers.getHost(shift.target) +'/controls/'+ $id +'/item-exists';

		src.post();
		src.api.done(function( res ) {

			shift.command.items = res.items;

			var sub_total = helpers.searchByKey( shift.command.items, 'products_price' );
			
			ser_sales.abrir_modal_de_pagamento();

			$('.code-command').html('000');
			
			$('.table-entradas').find('tbody').html('');

			$('input[name="valor-de-entrada"]').val(helpers.sumArray(sub_total).toFixed(2));

		});

		src.api.fail(function( res ) {
			alert.aviso("Essa Comanda esta Vazia.");
		});
	},

	remover: function( id, key, $self ) { // remover item da comanda

		var lotprice;

		src.host = helpers.getHost(shift.target) +'/controls/'+ shift.id +'/items/'+ id +'/delete';
		src.post();

		src.api.done(function(res) {

			$self.parents('tr').fadeOut(800);
			shift.command.items.splice(key, 1);

			lotprice = helpers.searchByKey( shift.command.items, 'products_price' );

			$('.sub-total-command').find('table tr:eq(0) > td')
				.text('R$ '+ helpers.moneyPtBr(helpers.sumArray(lotprice)));

		});

		src.api.fail(function(res) {
			console.log('Error: Não Possível Excluir Item da Comanda!');
		});

	},

	deletar: function( id ) { // deletar comanda

		src.host = helpers.getHost(shift.target) +'/controls/'+ id + '/delete';
		src.post();

		src.api.done(function( res ) {
			location.reload();
		});

		src.api.fail(function( res ) {
			console.log('Error: Falha ao Deletar Comanda!')
		});

	},

	finalizar_pagamento: function( ttents, change ) 
	{

		var data = {}, api;

		src.host = helpers.getHost(shift.target) +'/controls/'+ shift.id + '/close';

		data = {

			'post': {
				'cupons_id': shift.command.cupons_id,
				'total_price': shift.command.sub_total,
				'discount_price': parseFloat(shift.command.desconto.toFixed(2)),
				'final_price': parseFloat(shift.command.total.toFixed(2))
			},

			'entradas': shift.entradas

		};

		src.post( data );

		src.api.done(function( res ) {

			api = $.confirm({
				title: 'Sucesso!',
				content: tl_finalizar_pagamento.init( shift.command.total, ttents, change ),
				icon: 'fa fa-thumbs-o-up',
				type: 'blue',
				buttons: {
					ok: {
						text: 'OK!',
						btnClass: 'btn-blue',
					}
				}
			});

			api.onOpen = function() {
				
				$(window).on('keypress', function(e) {
					if ( e.which == 13 ){
     					e.preventDefault(); location.reload();
     				}
				});

				$('.jconfirm-buttons').find('button[type="button"]')
					.on('click', function() {
					location.reload();
				});

			}


		});

		src.api.fail(function( res ) {
			console.log("Error: Falha no Fechamento da Comanda!");
		});
		
	},


}
var resShift = {

	openCommandIsSuccess: function() {

		src.api.done(function(res) {

			shift.id = res.id;
			shift.command.id = res.code;
			shift.command.items = [];

			shift.commands.push(res);

			$('.items').find('tbody').html('<tr><td colspan="4">Essa comanda esta vazia!</td></tr>');

			table.api.tables('.commands').row.add([
				res.code,
				$('.title-first').text().split(' ').pop(),
				'<span class="box-info box-info-success">Aberto</span>',
				0,
				'R$ 0,00',
				serShift.buttonActionsCommand(res.id)
			]).draw();

			$('html, body').stop()
				.animate({scrollTop:0}, 600, 'swing');

			$('.sub-total-command').find('tr:eq(0) > td').text('R$ 0,00');
			$('.code-command').text(res.code);

    	});

    	src.api.fail(function( res ) {
    		alert.aviso(res.responseJSON.error);
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
			$('.action-upfi').find('div > button').next().attr('disabled', true);
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

		return false;

	},

	getMethodPayment: function() {

		var html = ['<option value="">Escolha uma opção</option>'];

		$('select[name="metodo-de-pagamento"]').hide();
		
		src.api.done(function(data) {

			$(data).each(function(key, item) {
				html.push('<option value="'+ item.id +'">'+ item.title +'</option>');
			});

			$('select[name="metodo-de-pagamento"]').show().html(html.join(''));

		});

	},

	updateCommand: function() {

		var $commands, sub_total;

		src.api.done(function(res) {

			alert.success("Comanda <b>"+ shift.command.id +"</b> Atualizada.");

			alert.api.onClose = function() {
				console.log('reload')
				// location.reload();
			}

			// prices    = helpers.searchByKey( shift.command.items, 'products_price' );
			// sub_total = helpers.moneyPtBr(helpers.sumArray(prices));

			// $commands = $( '.commands' ).find('tbody > tr');
			// $commands.each(function( i, item ) {
				
			//  	if( $commands.eq(i).find('td:eq(0)').text().trim() == shift.command.id ) {

			//  		$commands.eq(i).find('td:eq(3)').text(shift.command.items.length);
			//  		$commands.eq(i).find('td:eq(4)')
			//  			.text('R$ '+ sub_total);

			//  	}

			// });

		});

	},

	closedCommand: function(total, pagamento) {

		src.api.done(function(res) {

			var money = $('.payment_money').find('input[type="text"]').val();
			var valor = !money ? helpers.moneyEnUs(total) : helpers.moneyEnUs(money);

			var content = [
			'<div class="col-xs-12">',
				'<p class="lead">Total R$ '+ total +'</p>',
				'<div class="table-responsive">',
					'<table class="table">',
						'<tbody>',
							'<tr>',
								'<th style="width:50%">Pagamento:</th>',
								'<td align="right">'+ $('select[name="payment_service"] option[value="'+ pagamento +'"]').text() +'</td>',
							'</tr>',
							'<tr>',
								'<th>Valor Recebido</th>',
								'<td align="right">R$ '+ helpers.moneyPtBr(valor) +'</td>',
							'</tr>',
							'<tr>',
								'<th>Troco:</th>',
								'<td align="right">R$ '+ helpers.moneyPtBr(valor - helpers.moneyEnUs(total)) +'</td>',
							'</tr>',
						'</tbody>',
					'</table>',
				'</div>',
			'</div>',
			];

			$.confirm({
    			title: 'Sucesso!',
    			content: content.join(''),
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
var payRequest = {

	message: {
		title: 'Este campo é de preenchimento obrigatório.',
		type: 'Escolha uma das opções.',
		taxa: 'Declarar um taxa da operadora.',
		payment_service_id: 'Escolha uma das opções.',
		payment_pointer: 'Escolha uma das opções.',
		payment_day: 'Este campo é de preenchimento obrigatório.'
	},

	validate: function() 
	{

		var self = this, $form = $('#paymentMethodForm'), tt = 0;
		
		for( var i in payments.fill ) {
				
			self.insertDataFill(i);
				
			$form.find('div > .error-'+ i).text('');

			if( !payments.fill[i] ) {
				$form.find('div > .error-'+ i).text(self.message[i]); tt++;
			}

		}

		return tt;

	},

	insertDataFill: function( i ) 
	{

		var selected = ['type', 'payment_service_id', 'payment_pointer'];

		if( selected.indexOf(i) != -1 ) {
			payments.fill[i] = $('select[name="'+ i +'"]').find('option:selected').val();
		}

		else{
			payments.fill[i] = $('input[name="'+ i +'"]').val();
		}

	}

};
var req_sales = {

	calcular_desconto: function(prices, cupom) {

		var value = parseFloat(cupom[0]), tipo = cupom[1];
		
		shift.command.cupons_id = cupom[2];

		if( tipo.trim() == 'percent' ) {
			shift.command.desconto = parseFloat(((value/100) * helpers.sumArray(prices)).toFixed(2));
		}

		else {
			shift.command.desconto = parseFloat(value);
		}

		shift.command.total = parseFloat((shift.command.sub_total - shift.command.desconto).toFixed(2));
		
		$('input[name="valor-de-entrada"]').val('');


	},

	valida_senha_master: function( pass ) {

		if(!pass || pass != 'master@019200'){
			this.$content.find('.message-error').show();
			return 0;
		}

		return 1;

	},

	create_command: function( $el, $code ) {

		var zero = '0';

		if( !$code ) {
			$el.find('.message-error').show();
		}

		else{

			if( $code.length != 3 )
				$code = zero.repeat(3 - $code.length) + $code;

			reqShift.getCodeCreateCommand($code);

		}

	},

	validar_senha_master: function( pass, $el ) 
	{

		if(!pass || pass != 'master@019200'){
			$el.find('.message-error').show();
			return false;
		}

		return true;

	},

	validar_meios_pagamento: function( $service, $method ) {

		var $entrada = $('input[name="valor-de-entrada"]');

		$('.form-group').removeClass('has-error').find('.help-block').hide();

		if(!$service.find('option:selected').val()){
			$service.parents('.form-group').addClass('has-error').find('.help-block').show();
			return false;
		}

		if( $service.find('option:selected').val() != shift.id_money ) {

			if(!$method.find('option:selected').val()) {
				$method.parents('.form-group').addClass('has-error').find('.help-block').show();
				return false;
			}

		}

		if( !$entrada.val() ) {
			$entrada.parent().addClass('has-error').find('.help-block').show();
			return false;
		}

		// $.each(['error-payment-service', 'error-payment-method'], function(i, el) {
		// 	$('.'+ el).hide();
		// })

		return true;

	},

	validar_modal_produto: function( $modal, key ) 
	{
		
		var $amount = parseFloat($modal.find('input[name="unit_price"]').val()),
			$qtd    = parseInt($modal.find('input[name="qtd"]').val());

		if( undefined == key) {
			key = shift.command.items.length - 1;
		}

		if( !$amount ) {
			$modal.find('.error').show(); return false;
		}

		shift.command.items[key].unit_price = parseFloat($amount.toFixed(2));
		shift.command.items[key].products_price = parseFloat(($amount * $qtd).toFixed(2));
		shift.command.items[key].qtd = $qtd;

		$modal.find('input[name="qtd"]').val(1);
		$modal.find('.error').hide();

		return true;

	}

};
var reqShift = {

	codeEmpty: function( code ) 
	{

		
    	return false;

	},


	getCodeCreateCommand: function( code ) {

		if(!code) {
    		$('.error-code-command').show();
    		return false;
    	}

    	else{

    		$('.line-two').show();

    		src.post({code: code});
			alert.api.close();
			resShift.openCommandIsSuccess();

    	}

	},

	updateItemCommand: function( $el ) {

		var key, id, qtd, amount;

		key    = $el.find('input[name="index"]').val();
		id     = parseInt($el.find('input[name="id"]').val());
		qtd    = parseInt($el.find('input[name="qtd"]').val());
		amount = helpers.moneyEnUs($el.find('input[name="unit_price"]').val());

		if( amount == 0 ) {
			$el.find('.error').show(); 
		}else{

			shift.command.items[key].qtd = qtd;

			if( amount != shift.command.items[key].unit_price ) {
				shift.command.items[key].unit_price = amount;
			}

			shift.command.items[key].products_price = shift.command.items[key].unit_price * shift.command.items[key].qtd;

			$el.find('input[name="qtd"]').val(1);
			$el.find('.error').hide();

			$('.items').find('tbody').html(serShift.addItemCommand(shift.command.items));
			$('.preco-total').text('R$ '+ helpers.moneyPtBr(shift.command.items[key].products_price));

			serShift.subTotalCommand(shift.command.items);

		}

	}

};
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
var payService = {

	insertDataInput: function( items ) {

		var $form = $('#paymentMethodForm'),
			selected = ['type', 'payment_service_id', 'payment_pointer'];

		for( var key in payments.fill ) {

			if( key == 'taxa' ) {
				items[key] = items[key].toString().replace('.', ',');
			}

			if( selected.indexOf(key) != -1 ) {
				$('select[name="'+ key +'"]').find('option[value="'+ items[key] +'"]').prop('selected', true);
			}

			else{
				$('input[name="'+ key +'"]').val(items[key]);
			}

			payments.fill[key] = items[key];

		}

	},

};
var ser_sales = {

	get_code: function( $id ) { // pegar codigo da comanda

		var code, items = shift.commands;

		if( !$id ) {
			code = 0;
		}

		else{
			for( var i in items ) 
			{
				if( items[i].id == $id ) {
					code = items[i].code;
				}
			}
		}

		return code;
	},

	get_command_for_id: function( id )
	{	

		var items = shift.commands, command = null;

		if( !id ) {
			console.log("ID da comanda não localizado!"); return false;
		}

		for( var i in items ) 
		{
			if( items[i].id == id ) {
				command = items[i];
			}
		}


		return command;

	},

	get_items_command_for_code: function() {
		// ...
	},

	get_product: function( id ) {

		var key, qtd = 1, items = {};

		$.each(shift.data, function(i, item) {
			if( item.id == id ) {
				key = i;
			}
		});

		shift.command.items.push({
			products_id: shift.data[key].id,
			products_name: shift.data[key].name,
			qtd: qtd,
			unit_price: shift.data[key].amount,
			products_price: shift.data[key].amount * qtd
		});

		if( shift.data[key].measurement == 'kg' ) {
			this.abrir_modal_info_produto( shift.command.items.length - 1 );
			return false;
		}

		return true;

	},

	abrir_modal_info_produto: function( key ) {

		var items, $input, $modal = $('#addEditableProductModal');

		$modal.modal('show');
		$modal = $modal.find('.modal-body');

		items = shift.command.items[key];
		
		$.each(items, function(i, value) {
			
			$input = $modal.find('input[name="'+ i +'"]');

			if(i == 'unit_price') {
				value != 0 ? $input.val(helpers.moneyPtBr(value)) : $input.val('').focus();
			}

			else{
				$input.val(value);
			}

		});

		$modal.find('input[name="unit_price"]').select();

		$('.preco-total').text('R$ '+ helpers.moneyPtBr(items.unit_price * items.qtd));

	},
	
	abrir_modal_de_pagamento: function() {

		var prices, sub_total;

		if( shift.command.items.length == 0 )
			return false;

		prices = shift.command.items.map(function(item) { 
			return item.products_price;
		});

		shift.command.sub_total = helpers.sumArray(prices); // calculando items da comanda
		
		// aplicado dados no modal de fechamento
		this.dados_modal_de_fechamento();

	},

	aplicar_desconto: function() {

		$table = $('.table-comanda');

		$table.find('tbody tr > .discount')
						.text('R$ '+ helpers.moneyPtBr(shift.command.desconto));

		shift.command.total = parseFloat((shift.command.sub_total - shift.command.desconto).toFixed(2));

		// $table.find('tbody tr > .total').text('R$ '+ helpers.moneyPtBr(shift.command.total));
		$('.total-da-entrada tbody tr:eq(0)').find('td').text('R$ '+ helpers.moneyPtBr(shift.command.total));

	},

	abrir_modal_cupom_de_desconto: function() {

		var api = $.confirm({
			title: 'Cupom de Desconto',
			content: tl_modal_desconto.init(),
			icon: 'fa fa-ticket',
			type: 'blue',
			buttons: {
				apl_desconto: {
					text: 'Aplicar',
					btnClass: 'btn-blue',
				},
				canelar: {
					text: 'Fechar',
				}
			}
		});

		return api;

	},

	limpar_dados_extras: function( el ) {

		$table = $(el);

		$table.hide();
		$table.find('.table > tbody').html(' ');

	},

	get_id_controls: function() {

		var id, commands = shift.commands;

		for( var i in commands ) {
			if( commands[i].code == shift.command.id ) {
				id = commands[i].id;
			}
		}

		return id;

	},

	atualizar_items_da_comanda: function(comandas, comanda) 
	{

		var self = this, code = comanda.id;
		
		comandas.forEach(function(item, i) {
			if(item.code == code) {
				src.host = helpers.getHost(shift.target) +'/controls/'+ item.id +'/items';
			}
		});

		src.post({'items':comanda.items});

	},

	pegar_items_por_codigo: function() {

		var $id = !shift.id ? this.get_id_controls() : shift.id;

		src.host = helpers.getHost(shift.target) +'/controls/'+ $id +'/item-exists';
		src.post();

		src.api.done(function( res ) {
			shift.command.items = res.items;
		});

	},

	
	modal_fechamento: function() 
	{

		var sub_total, self = this;

		$('.modal-de-fechamento').modal('show');

		sub_total = helpers.searchByKey( shift.command.items, 'products_price' );

		shift.command.sub_total = parseFloat(helpers.sumArray(sub_total).toFixed(2));
		shift.command.total = shift.command.sub_total;

		$('.lead > b').text(this.get_code(shift.id));
		$('.table-comanda tbody tr').each(function(i, tr) {
			if( i == 0 || i == 3 ) {
				$(tr).find('td').text('R$ '+ helpers.moneyPtBr(shift.command.sub_total));
			}
		});

		$('.total-da-entrada tbody tr:eq(0)').find('td').text('R$ '+ helpers.moneyPtBr(shift.command.total));

		$('input[name="valor-de-entrada"]').val('');

	},

	item_exists: function( id ) {

		var key = null, items = shift.command.items;
		
		for( var i = 0; i <= items.length; i++ ) {
			if( items[i].products_id == id ) {
				key = i;
			}
		}
		
		return key;

	},

	deletar_item_da_comanda: function() 
	{

		var id, key, pass, $el, $self, self = this;

		$('.del-item-command').on('click', function(e) {

			e.preventDefault();

			$self = $(this);

			id = $self.attr('data-id');
			key = $self.parents('tr').index();

			alert.secret('Deseja excluir esse item?');

			alert.api.buttons =  {
				ok: {

					btnClass: 'btn-red',

					action: function() {
						$el = this.$content;

						pass = $el.find('input[name="passmaster"]').val();
						
						if( !req_sales.validar_senha_master(pass, $el) )
							return false;

						res_sales.remover( id, key, $self );

					}

				},
				cancel: {
					text: 'Fechar',
				}
			}

			alert.api.onOpen = function() {

				var $inputpass = $('input[name="passmaster"]');

				$inputpass.focus();

				$inputpass.on('keypress', function(e) {
					if ( e.which == 13 ){
						e.preventDefault();

						pass = $(this).val();

						if( !req_sales.validar_senha_master(pass, $('.jconfirm-content')) )
							return false;

						res_sales.remover( id, key, $self );

						alert.api.close();

					}
				});

			}

		});

	},

	deletar_comanda: function() {

		var id;

		$('.control-delete').off('click').on('click', function( e ){

			e.preventDefault();

			id = $(this).attr('data-id');

			alert.secret('Deseja excluir essa comanda?');

			alert.api.buttons = {
				ok: {
					btnClass: 'btn-red',

					action: function() {
						$el = this.$content;

						pass = $el.find('input[name="passmaster"]').val();
						
						if( !req_sales.validar_senha_master(pass, $el) )
							return false;

						res_sales.deletar( id );

					}
				},
				cancel: {
					text: 'Fechar'
				}
			}

			alert.api.onOpen = function() {

				var $inputpass = $('input[name="passmaster"]');

				$inputpass.focus();

				$inputpass.on('keypress', function(e) {
					if( e.which == 13 ) {

						e.preventDefault();

						pass = $(this).val();

						if( !req_sales.validar_senha_master(pass, $('.jconfirm-content')) )
							return false;

						res_sales.deletar( id );

						alert.api.close();

					}
				})

			}

		});	

	},

	linha_da_comanda: function() {

		var has, icon, lotprice = 0, line = [], items = shift.command.items, self = this;

		lotprice = helpers.sumArray(helpers.searchByKey( items, 'products_price' )).toFixed(2);

		$.each( items, function( i, item ) {

			has = undefined == item.id ? 'has-error' : 'has-success';
			icon = undefined == item.id ? 'fa-square-o' : 'fa-check-square-o'; 

			line.push([
				'<tr>',
					'<td align="center" class="'+ has +'">',
						'<i class="help-block fa '+ icon +'"></i></td>',
					'</td>',
					'<td>'+ item.products_name +'</td>',
					'<td>'+ item.qtd +'</td>',
					'<td>R$ '+ helpers.moneyPtBr(item.products_price) +'</td>',
					'<td>'+ tl_buttons_up_del.init(item.id) +'</td>',
				'</tr>',
			].join(' '));
		});

		$('.items').find('tbody').html(line.join(' '));
		$('.sub-total-command').find('table tr:eq(0) > td').text('R$ '+ lotprice);
		$('.update-command').focus();

	},

	entradas: function( $service, $method, valor ) {

		var type = 'Dinheiro', line = [], $table = $('.table-entradas'), ttents = 0;

		if( $method.find('option:selected').val().length != 0 ) {
			type = $method.find('option:selected').text().trim();
		}

		if( valor.length != 0 ) 
		{
			shift.entradas.push({
				'sales_controls_id': shift.id,
				'service_id': $service.find('option:selected').val(),
				'method_id': $method.find('option:selected').val(),
				'type_pay': type,
				'price': parseFloat(valor)
			});

			$.each( shift.entradas, function(i, item) {
				line.push([
					'<tr>',
						'<td style="width:50%">'+ item.type_pay +' </td>',
						'<td class="sub-total" align="right">R$ '+ helpers.moneyPtBr(item.price) +'</td>',
					'</tr>'
				].join(' '));
			} );
		}

		else{ // caso entre um valor de desconto e quebre valores ja entrado.

 			if( shift.command.desconto ) {

 				var list = [], key = 0, lastprice = 0;

 				list = helpers.searchByKey( shift.entradas, 'price' );
 				key  = list.length - 1;

 				shift.entradas[key].price = parseFloat(((shift.command.total - helpers.sumArray(list)) + list[key]).toFixed(2));

 			}

		}

		ttents = parseFloat(helpers.sumArray(helpers.searchByKey(shift.entradas, 'price')).toFixed(2));

		$table.show();
		$table.find('table > tbody').html(line);

		var $tr = [helpers.moneyPtBr(ttents), helpers.moneyPtBr(shift.command.sub_total - ttents)];

		$tr.forEach(function(value, i) {

			$('.total-da-entrada').find('tbody tr:eq('+ (i + 1) +') td')
				.html( 'R$ '+ value );
			
		});

		return ttents;

	},

	change_exists: function( ttents ) { // troco do cliente

		var change, last, key;

		last = helpers.searchByKey( shift.entradas, 'service_id' );
		key  = last.length - 1;

		if( shift.id_money == last.pop() && ttents > shift.command.total ) {

			change = (ttents - shift.command.total).toFixed(2);
			shift.entradas[key].price = parseFloat((shift.entradas[key].price - change).toFixed(2));

			return change;

		}

		return 0;

	},


}
var serShift = {

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

	hashCodeExists: function() {

		var hash = location.hash, code;

		if(hash.length != 0) 
		{

			code = hash.split('=').pop();

			shift.command.id = code;

			$('html, body').stop()
				.animate({scrollTop:0}, 600, 'swing');

			$('.sub-total-command').find('tr:eq(0) > td').text('R$ 0,00');
			$('.code-command').text(code);

		}

	},

	buttonActionsCommand: function( id ) 
	{
		
		return [
			'<div class="text-center actions">',
				'<div class="btn-group">',
					'<a aria-label="Left Align" class="btn btn-primary btn-xs abrir-comanda" data-id="'+ id +'">',
						'<i class="fa fa-folder-open"></i> Abrir',
					'</a>',
					'<a aria-label="Center Align" class="btn btn-success btn-xs abrir-modal-de-pagamento" data-id="'+ id +'">',
						'<i class="fa fa-folder"></i> Fechar',
					'</a>',
					'<a aria-label="Right Align" class="btn btn-danger btn-xs control-delete" data-id="'+ id +'">',
						'<i class="fa fa-trash"></i> Excluir',
					'</a>',
				'</div>',
			'</div>'
		].join('');

	}


};
var tl_buttons_up_del = {

	init: function( id ) {

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

	}

};
var tl_cards = {

	init: function( items ) {

		var tl = [], i = 0, total = 0, price = 0;

		for( var key in items ) 
		{
			tl.push([
				'<h4>'+ key +'</h4>',
			].join(''));


			graphic.cards = Object.assign({}, graphic.cards, {[key]:[]});

			tl[i] += '<div class="row" style="padding:12px;">';

			for( var band in items[key] ) {

				price = helpers.sumArray(items[key][band]);

				graphic.cards[key].push(price);

				tl[i] += [
					'<div class="col-xs-4 bands">',
						'<span>'+ band +'</span><br>',
						'<div class="widget_summary">',
							'<div class="w_center w_55">',
								'<div class="progress" style="background:#3498DB">',
									'<div class="progress-bar bg-green" ',
									'role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 66%;">',
										'<span style="color:#ededed">60%</span>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="w_right w_20">',
								' <b>R$</b> '+ price.toFixed(2),
							'</div>',
							'<div class="clearfix"></div>',
						'</div>',
					'</div>'
				].join('');


				total = total + price;

			}	

			tl[i] += '</div>';

			i++;

		}
	
		graphic.lot.push(total);

		$('.graphic-cards').html(tl.join(''));

	}

};
var tl_finalizar_pagamento = {

	init: function( total, entradas, change ) {

		return content = [
			'<div class="col-xs-12">',
				'<p class="lead">Total R$ '+ helpers.moneyPtBr(total) +'</p>',
				'<div class="table-responsive">',
					'<table class="table">',
						'<tbody>',
							'<tr>',
								'<th>Valor Recebido</th>',
								'<td align="right">R$ '+ helpers.moneyPtBr(entradas) +'</td>',
							'</tr>',
							'<tr>',
								'<th>Troco:</th>',
								'<td align="right">R$ '+ change +'</td>',
							'</tr>',
						'</tbody>',
					'</table>',
				'</div>',
			'</div>'
		].join('');

	}

}
var tl_meals = {

	init: function( items ) {

		var tl = [], total = 0, price = 0;

		for( var key in items ) 
		{

			price = helpers.sumArray(items[key]);

			tl.push([
				'<span>'+ key +'</span><br>',
				'<div class="widget_summary">',
					'<div class="w_left w_55" style="width:75%;margin-right:6px;">',
						'<div class="progress" style="background:#3498DB">',
							'<div class="progress-bar bg-green" role="progressbar" ',
							'aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">',
								'<span>60%</span>',
							'</div>',
						'</div>',
					'</div>',
					'<div class="w_right w_20">',
						'<b>R$</b>'+ price.toFixed(2),
					'</div>',
					'<div class="clearfix"></div>',
				'</div>'
			].join(' '));

			graphic.divers.push(price);

			total = total + price;

		}

		graphic.lot.push(total);

		$('.graphic-meals').html(tl.join(' '));

	}

};
var tl_modal_desconto = {

	products: function() {

		var products = shift.command.items.map(function( item ) {
			return [
				'<div class="col-xs-6"><label class="checkbox-inline item-da-comanda" >',
  					'<input type="checkbox" data-price="'+ item.products_price +'"> ',
  					item.products_name,
				'</label></div>'
			].join('');
		});

		return products.join('');

	},

	cupons: function() {

		var cupons = shift.cupons.map(function(item) {
			return [
				'<option value="'+ item.value +' - '+ item.type +' - '+ item.id +'">',
					item.name,
				'</option>'
			].join('');
		});

		return cupons.join('');

	},

	init: function() {

		console.log(shift.command)

		return [
			'<div class="col-xs-12" style="overflow:hidden;">',
				'<form class="formName">',
					'<div class="form-group row">',
						'<strong>Produtos da Comanda</strong><br>', this.products(),
					'</div>',
					'<div class="form-group row">',
						'<strong>Cupons</strong><br>',
						'<select name="codigo-cupom-de-desconto" class="form-control">',
							'<option value="...">Cupom de Desconto</option>',
								this.cupons(),
						'</select>',
					'</div>',
				'</form>',
			'</div>'
		].join('');

	}


};
var tl_open_command = {

	init: function() 
	{

		return [
			'<div class="col-xs-12" style="overflow:hidden;">',
				// '<form class="formName">',
					'<p style="color:#900;display:none;" class="message-error">Necessário digitar código da comanda.</p>',
					'<div class="form-group">',
						'<input type="text" name="code_command" placeholder="Numero da Comanda" maxlength="3" class="code form-control" required />',
					'</div>',
				// '</form>',
			'</div>'
		].join('');

	}

};
var tl_others = {

	init: function( items ) {

		var tl = [], color = ['blue', 'red', 'purple'], i = 0;

		var labels = Object.keys(items), data = [];
		

		for( var key in items ) 
		{

			data.push(items[key].length);

			tl.push([
				'<tr>',
					'<td style="width:67%">',
						'<p><i class="fa fa-square '+ color[i] +'"></i> ',
						'<small>'+ key +'</small></p>',
					'</td>',
					'<td align="left">R$ '+ helpers.sumArray(items[key]).toFixed(2) +'</td>',
				'</tr>',
			].join(''));

			i++;
		}

		charts.doughnut(labels, data);

		$('.graphic-others').find('table').show();
		$('.info-others').html(tl.join(''));

	}

};
window.commands = {

	shifts: {},

	filter: function() {

		var self = this;

		$('button[name="submit"]').on('click', function(event) {
			event.preventDefault();

			self.data = {};

			var $select = $('select[name="turno"]').val(),
				$input  = $('input[name="datefilter"]').val(),

				count   = 0;

			if( $select.length != 0 ) {
				self.data = Object.assign({}, self.data, {turno: $select}); count++;
			}

			if( $input.length != 0 ) {
				self.data = Object.assign({}, self.data, {date: $input}); count++;
			}

			if( count == 0 ) {
				helpers.aviso('Nenhum valor informado ao filtro!');
			}

			else {
				src.host = helpers.host;

				src.post(self.data);
				src.api.done(function( items ) {
					
					resCommands.add_items_in_table(table.api, items.data);

					serCommands.items = items.data;
					serCommands.init();

				});
			}


		});

	},

	init: function() {

		console.log('Commands');

		this.filter();

		table.init();
		date.init($('input[name="datefilter"]'));

	}

};
var dashboard = {

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
var graphic = {

	target: 'temperodefamilia', // temperodefamilia or v1

	divers: [],
	cards: {},

	lot: [],

	sales: [],

	taxa: [],

	frames: function() {

		var tt_taxa = helpers.sumArray(this.taxa), 
			tt_lot  = helpers.sumArray(this.lot);

		var finalprice = this.sales.map(function(item) {
			return item.final_price;
		});

		$('.frames').find('.sub-total')
			.html('R$ '+ helpers.moneyPtBr(tt_lot.toFixed(2)));

		$('.frames').find('.total-commands')
			.html( this.sales.length );

		$('.frames').find('.taxa')
			.html('R$ '+  helpers.moneyPtBr(tt_taxa.toFixed(2)));

		$('.frames').find('.total')
			.html('R$ '+ helpers.moneyPtBr( (tt_lot - tt_taxa).toFixed(2) ));

	},

	porcents: function() {

		var self = this;

		this.divers.forEach(function(price, i) {

			var porcents = ((price * 100) / self.lot[0]).toFixed(2);

			$('.graphic-meals > div').eq(i).find('.progress .progress-bar')
				.css('width', porcents +'%').find('span').html(porcents +'%');

		});

		for( var key in this.cards ) {

			this.cards[key].forEach(function(price, i) {

				var porcents = ((price * 100) / self.lot[1]).toFixed(2);

				$('.graphic-cards .row > .bands').eq(i)
					.find('.progress .progress-bar').css('width', porcents +'%')
					.find('span').html(porcents +'%');

			});

		}

	},

	init: function() {

		var self = this;

		$('#reportrange').on('apply.daterangepicker', function(ev, picker) {

			self.lot.length = 0;

			var start = picker.startDate.format('YYYY-MM-DD'), 
				end = picker.endDate.format('YYYY-MM-DD');

			end = start == end ? '' : end;

			src.host = helpers.getHost(self.target) +'/filter';

			src.post({
				"action":picker.chosenLabel,
				"start" :start,
				"end"   :end
			});

			src.api.done(function( res ) {

				tl_meals.init(res.divers);
				tl_cards.init(res.cards);
				tl_others.init(res.outros);

				self.sales = res.sales;
				self.taxa = res.taxa;

				self.porcents();
				self.frames();

			});

		});

		// components...
		charts.init();
		date.predefined('#reportrange');

	}

};
var payments = {

	fill: {
		title:'',
		type:'',
		taxa:'',
		payment_service_id:'',
		payment_pointer:'',
		payment_day:''
	},

	data: {},

	paymentsMethod: function() 
	{

		var self = this, req = payRequest, $form = $('#paymentMethodForm');

		$('#btn-salvar-dados-payment-method').on('click', function(event) {
			event.preventDefault()

			host = $form.attr('action');

			if( req.validate() != 0 ) {
				return false;
			}

			src.host = $('#paymentMethodForm').attr('action');
			src.post( self.fill );

			payResponse.createPaymentsMethodSuccess();

		});
	},

	getPaymentsMethod: function() {

		var $form = $('#paymentMethodForm'), host;

		$('#paymentMethodContainer .editButton').on('click', function(event) {
			event.preventDefault();

			host = $(this).attr('href');
			
			$form.find('div > .error-message').text('');
			$form.attr('action', host+'/update');

			$('#paymentMethodId').val( $(this).attr('id-payment-method') );

			src.host = host;
			src.get();

			payResponse.getPaymentsMethod();


		});

	},

	destroyPaymentsMethod: function() {

		var res = payResponse;

		$('#paymentMethodContainer .deleteButton').on('click', function(event) {
			event.preventDefault();

			var id = $(this).attr('id-payment-method');
			var host = $(this).attr('href');
			console.log(host);
			alert.confirme('Deseja Excluir esse Metodo de Pagamento?');

			alert.api.onAction = function( action ) {
				if( action == 'save' ) {
					src.host = host;
					src.get();
					res.destroyPaymentsMethod();
				}
			}


		});

	},

	init: function() {
		
		$('input[name="taxa"]').mask('000.000.000.000.000,00', {reverse: true});

		this.paymentsMethod();
		this.getPaymentsMethod();
		this.destroyPaymentsMethod();

	}

};
var reports = {

	target: 'temperodefamilia', // temperodefamilia or v1

	shift: [],
	payment: [],

	list: [],

	filter: function() {

		var self = this, res = res_reports;

		$('#reportrange').on('apply.daterangepicker', function(ev, picker) {
  				
			var start = picker.startDate.format('YYYY-MM-DD'), end = picker.endDate.format('YYYY-MM-DD');

			end = start == end ? '' : end;

			src.host = helpers.getHost(self.target) +'/filter';

			$('#gifload').modal('show');

			src.post({
				"action":picker.chosenLabel,
				"start" :start,
				"end"   :end,
				'where' : {
					shift: self.shift,
					payment: self.payment
				}
			});

			res.filter();
			
		});

	},

	opcoes: function() {

		var self = this, list = [];

		$('input[type="checkbox"]').off('click').on('click', function(event) {

			var $val = $(this).val(), $class = $(this).attr('class'), $text = $(this).next().text(), index;

			self.add_or_rem_where($class, $val);

			// add dados no html
			index = list.indexOf($text);

			if( index != -1 ) {
				list.splice(index, 1);
			}

			else{
				list.push($text);
			}

			$('.list-opcoes').show().find('ul').html('');

			$.each(list, function(i, item) {
				$('.list-opcoes').show().find('ul').append('<li>'+ item +';</li>');
			});

		});

	},

	add_or_rem_where: function( $class, $val ) {

		var self = this, index;


		index = self[$class].indexOf($val);

		if( index != -1 )
			self[$class].splice(index, 1);				
		else
			self[$class].push($val);

	},

	init: function() {

		// events
		this.filter();
		this.opcoes();

		// components
		date.predefined('#reportrange');
		table.init('#datatable');
	}
};
window.sales = {

	data: {
		id: '',
	},

	table: '',

	service: [], // servicos de pagamento

	method: [], // metodos de pagamentos

	// methods

	filter: function() {

		var self = this;

		$('button[name="submit"]').on('click', function( event ) {

			event.preventDefault();

			self.data = {};

			var $select = $('select[name="pays"]').val(),
				$input  = $('input[name="datefilter"]').val(),

				count   = 0;

			if( $select.length != 0 ) {
				self.data = Object.assign({}, self.data, {pays: $select});
				count++;
			}

			if( $input.length != 0 ) {
				self.data = Object.assign({}, self.data, {date: $input});
				count++;
			}

			if( count == 0 ) {
				helpers.aviso('Nenhum valor informado ao filtro!');
			}

			else{

				src.host = helpers.host;

				src.post(self.data);
				src.api.done(function( items ) {
					
					resSales.add_items_in_table(table.api, items.data);

					serSales.items = items.data;

					serSales.init();

				});


			}

		})

	},

	
	init: function() {

		console.log('Sales');

		this.filter();

		table.init();
		date.init($('input[name="datefilter"]'));

		serSales.getPaymentServices();
		serSales.getMethodPayment();

	}

};
var sales = {

	packs: [
		'abrir_comanda',
		'fechamento_direto', 
		'fechamento_pos_visualizacao',
		'atualizar_comanda',
		'adicionar_item_na_comanda',
		'atualizar_item_da_comanda',
		'atualizar_item_por_id',
		'configuracao_modal',
		'entradas_de_pagamento',
		'entrada_do_desconto' 
	],

	fill: [],

	abrir_comanda: function() {

		var self = this;

		$('.abrir-comanda').off('click').on('click', function(e) {

			e.preventDefault();

			shift.id = $(this).attr('data-id');

			src.host = helpers.getHost(shift.target) +'/controls/'+ shift.id +'/item-exists';
			src.post();

			$('.line-two').show();
			$('html, body').stop().animate({scrollTop:0}, 600, 'swing');
			$('.sub-total-command').find('tr:eq(0) > td').text('R$ 0,00');
			$('.code-command').text(ser_sales.get_code(shift.id));

			src.api.done(function( res ) {
				console.log(res.items);
				var line = [], sub_total = 0;

				shift.command.items = res.items;

				ser_sales.linha_da_comanda();
				ser_sales.deletar_item_da_comanda();

				self.atualizar_item_por_id();

			});

			src.api.fail(function( res ) {
				shift.command.items.length = 0;
				$('.items').find('tbody').html('<tr><td colspan="4">Essa comanda esta vazia!</td></tr>');
			});

		});

	},

	fechamento_direto: function() 
	{

		$('.fechamento_direto').off('click').on('click', function(e) {

			var command;

			e.preventDefault();

			shift.id = $(this).attr('data-id');
			command = ser_sales.get_command_for_id( shift.id );

			if( !command ) {
				alert.aviso("Essa Comanda esta Vazia.");
			}

			else{

				src.host = helpers.getHost(shift.target) +'/controls/'+ shift.id +'/item-exists';
				src.post();

				src.api.done(function( res ) {

					shift.command.items = res.items;
					ser_sales.modal_fechamento();

				});

				src.api.fail(function(res) {
					alert.aviso("Essa Comanda esta Vazia.");
				});

			}

		});

	},

	fechamento_pos_visualizacao: function() 
	{

		$('.fechamento_pos_visualizacao').off('click').on('click', function(e) {
			
			e.preventDefault();

			if( shift.command.items.length == 0 ) {
				alert.aviso("Essa Comanda esta Vazia.");
			}

			else{
				src.host = helpers.getHost(shift.target) +'/controls/'+ shift.id +'/items';
				src.post( {'items':shift.command.items} );

				src.api.done(function( res ) {

					ser_sales.modal_fechamento();

					var key, uids;

					uids = helpers.searchByKey( shift.commands, 'id' );
					key = uids.indexOf(parseFloat(shift.id));

					shift.commands[key].total_price = shift.command.sub_total;

					$('.commands').find('tbody > tr').each(function(i, el) {
						if( shift.commands[key].code == $(el).find('td:eq(0)').text().trim() ) {
							$(el).find('td:eq(3)').text(shift.command.items.length)
								.next().text('R$ '+ helpers.moneyPtBr(shift.command.sub_total));
						}
					});

					shift.command.items = res.items;

					ser_sales.linha_da_comanda();
					ser_sales.deletar_item_da_comanda();
					
					sales.entrada_do_desconto();
					sales.atualizar_item_por_id();

				});	

				src.api.fail(function( res ) {
					console.log('Error: Fechamento Pos Visualização!');
				});	
			}		

		});

	},

	atualizar_comanda: function() {

		$('.update-command').off('click').on('click', function(e) {
			e.preventDefault();

			if( !shift.id || shift.command.items.length == 0 ) {
				alert.aviso("Essa Comanda esta Vazia.");
			}

			else{

				src.host = helpers.getHost(shift.target) +'/controls/'+ shift.id +'/items';
				src.post({'items':shift.command.items});

				src.api.done(function(res) {
					// alert.success("Comanda <b>"+ ser_sales.get_code(shift.id) +"</b> Atualizada.");
					
					$('.message-up-comanda').addClass('has-success').html([
						'<p class="help-block">',
						'<i class="fa fa-lightbulb-o"></i>',
						' Comanda esta sendo atualizada aguarde!</p>'
					].join(''))

					var time = setTimeout(function() {
						location.reload();
					}, 800);

				});

				src.api.fail(function(res) {});

			}

		})

	},

	adicionar_item_na_comanda: function() {

		var id, lotprice;

		$('.add-item-command').off('click').on('click', function(e) {
			e.preventDefault();

			if( !shift.id ) {
				alert.aviso("Nenhuma comanda selecionada.");
			}

			else{

				id = $(this).attr('data-id'); // id do produto...

				if(!ser_sales.get_product(id)){
					return false;
				}

				ser_sales.linha_da_comanda();
				ser_sales.deletar_item_da_comanda();

				sales.atualizar_item_por_id();

			}	

		});

	},

	atualizar_item_por_id: function() {

		$('.update-item-command').off('click').on('click', function(e) {

			var key = $(this).parents('tr').index(), $form = $('#editableProductForm');

			e.preventDefault();	

			ser_sales.abrir_modal_info_produto(key);

		});

	},

	configuracao_modal: function() {
		$('.modal').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
			
			var modal = $(this), key = shift.command.items.length - 1;

			if( modal.attr('id') == 'closeControlModal' ) {

				// clear...
				shift.command.cupons_id = 0; 
				shift.command.desconto = 0;
				shift.entradas.length = 0;

				$('.table-comanda').find('tbody > tr:eq(1) td').text('R$ 0,00');
				$('.table-entradas').hide();

			}

			else{

				modal.find('form > input[name="id"]').val('');
			
				if(modal.find('input[name="unit_price"]').val() != 0 ){
					return false;
				}

	  			if( modal.attr('id') == 'addEditableProductModal' ) {
	  				shift.command.items.splice(key, 1);
	  			}

			}

		});
	
	},

	atualizar_item_da_comanda: function() 
	{

		var self = this;

		$('.update-data-modal').off('click').on('click', function(e) {

			var id, uids, key, $modal = $(this).parents('.modal');

			e.preventDefault();

			id = $modal.find('input[name="id"]').val();
		
			if( id ) {
				uids = helpers.searchByKey( shift.command.items, 'id' );
				key = uids.indexOf(parseInt(id));
			}
			
			if(!req_sales.validar_modal_produto($modal, key)){
				return false;
			}

			ser_sales.linha_da_comanda();
			ser_sales.deletar_item_da_comanda();

			self.atualizar_item_por_id();

			$('#addEditableProductModal').modal('hide');

			$('.update-command').focus();

		});

		$('input[name="qtd"], input[name="unit_price"]').on('keypress', function(e) {
			if(e.which == 13) {

				var id, uids, key, $modal = $(this).parents('.modal');

				e.preventDefault();

				id = $modal.find('input[name="id"]').val();
		
				if( id ) {
					uids = helpers.searchByKey( shift.command.items, 'id' );
					key = uids.indexOf(parseInt(id));
				}
				
				if(!req_sales.validar_modal_produto($modal, key)){
					return false;
				}

				ser_sales.linha_da_comanda();
				ser_sales.deletar_item_da_comanda();

				self.atualizar_item_por_id();

				$('#addEditableProductModal').modal('hide');

				$('.update-command').focus();

			}
		})

	},

	entradas_de_pagamento: function() 
	{

		var $entrada = $('input[name="valor-de-entrada"]'), 

			$service = $('select[name="servico-de-pagamento"]'), 
			$method  = $('select[name="metodo-de-pagamento"]'),

			ttents = 0, change, valor = 0; // valor da entrada

		$('.executar-pagamento-da-comanda').off('click').on('click', function() { // event click

			valor = $entrada.val();

			if( !req_sales.validar_meios_pagamento($service, $method) ) {
				return false;
			}

			ttents = ser_sales.entradas( $service, $method, valor );

			if( parseFloat(ttents) >= parseFloat(shift.command.total) ) {

				change = ser_sales.change_exists( ttents ); // existencia do troco
				res_sales.finalizar_pagamento( ttents, change );

			}

			$entrada.val('');

		});

		$entrada.off('keypress').on('keypress', function(e) { // event enter

			if( e.which == 13 ){
				e.preventDefault();

				valor = $entrada.val();

				if( !req_sales.validar_meios_pagamento($service, $method) ) {
					return false;
				}

				ttents = ser_sales.entradas( $service, $method, valor );

				if( parseFloat(ttents) >= parseFloat(shift.command.total) ) {

					change = ser_sales.change_exists( ttents ); // existencia do troco
					res_sales.finalizar_pagamento( ttents, change );

				}
				
				$entrada.val('');

			}

		})

	},

	entrada_do_desconto: function() {

		$('.abrir-modal-de-desconto')
			.off('click').on('click', function(e) {

			e.preventDefault();

			var $aviso = $('.aviso-desconto');
			var api = ser_sales.abrir_modal_cupom_de_desconto(), prices = [], data_price, i;

			api.onOpen = function() {

				$('.item-da-comanda').find('input[type="checkbox"]').on('click', function() {

					data_price = parseFloat($(this).attr('data-price'));
					i = prices.indexOf(data_price);

					if( i == -1 ) {
						prices.push(data_price);
					}

					else{
						prices.splice(i, 1);
					}

				});

			}

			api.onAction = function( action ) {

				if( action == 'apl_desconto' ) {

					var cupom_value = this.$content
						.find('select[name="codigo-cupom-de-desconto"]').val();
					
					$aviso.hide();

					if( shift.command.desconto != 0 ){
						$aviso.show(); return false;
					}

					req_sales.calcular_desconto(prices, cupom_value.split('-'));
					ser_sales.aplicar_desconto();

				}
			}

		});

	},

	init: function() {

		var self = this;

		ser_sales.deletar_comanda();

		res_sales.pegar_cupons_de_desconto();

		self.packs.forEach(function(pack) {
			self[pack]();
		});

	}

};
var shift = {

	target: 'temperodefamilia', // online: temperodefamilia; offline: v1

	id_money: 12, // online: 12; offline: 9

	data: {},

	id: 0,
	code: '',

	commands: [],

	command: {
		id: 0, // codigo da comanda
		sales_controls_id: 0,
		cupons_id: 0,
		sub_total: 0.0,
		total: 0.0,
		desconto: 0.0,
		entrada: 0.0,
		items: [],
	},

	agregadas: [],

	cupons: [],

	entradas: [],	

	createCommand: function() {
		
		var self = this, $code;

		$('#btnOpeningSalesControls').on('click', function(event) {
			event.preventDefault();

			src.host = $(this).attr("href");

			alert.form('&nbsp;Insira aqui <b>código</b> da comanda.', tl_open_command.init());

			alert.api.buttons = {
				ok: {
					text: 'Salvar!',
		        	btnClass: 'btn-blue',
					action: function() 
					{

						$el   = this.$content;
						$code = $el.find('.code').val(); 
						req_sales.create_command( $el, $code );

						return false;

					}
				},
				cancel: {
					text: 'Fechar',
				}
			};

			alert.api.onOpen = function() {

				var $el = this.$content,
					$input = $('input[name="code_command"]');

				$input.focus();

				$input.on('keypress', function(event) {
					
					if ( event.which == 13 )
					{

						event.preventDefault();
						$code = $(this).val();
						req_sales.create_command( $el, $code );

						return false;

					}

				});

			}

		});

	},

	getMethodPayment: function() {

		var self = this, $metodo = $('.payment_methodContainer');

		$('#formClosingControl').on('change', 'select[name="servico-de-pagamento"]', function() {
			
			var id = $(this).val();

			if( self.id_money == id ) {

				$metodo.find('select').val('').hide().next().show();
				$metodo.find('.error-payment-method').hide();
			}

			else{

				$metodo.find('select').show().next().hide();

				src.host = [
					$('meta[name="url-app"]').attr('content'),
					'/payments_service/',
					id,
					'/payments-methods'
				].join('');

				src.post();

				resShift.getMethodPayment();
			}

		});

	},

	getResultFrame: function(host) {

		var sales, total, discount;

		src.host = helpers.getHost(this.target) +'/result-frames';
		src.get();

		src.api.done(function(res) {

			var sales = res.sales;

			$('.frames .total-commands').text(sales.length);

			if( sales.length != 0 ) {

				prices = sales.map(function(item) {
					return item.total_price
				});

				discount = sales.map(function(item) {
					return item.discount_price
				});

				total = helpers.moneyPtBr(helpers.sumArray(prices) - helpers.sumArray(discount));

				$('.frames .sub-total').text('R$ '+ helpers.moneyPtBr(helpers.sumArray(prices)));
				$('.frames .discount').text('R$ '+ helpers.moneyPtBr(helpers.sumArray(discount)));

			}

			$('.frames .total').text('R$ '+ total);

		});

	},

	closeShift: function() {

		var self = this, host = location.href;

		$('#closeShift').on('click', function(event) {
			event.preventDefault();

			if( self.commands.length != 0 ) {
				alert.aviso('Todas as Comandas não foram Encerradas!');
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

			            	src.host = helpers.getHost(self.target).replace('shift', 'shifts') +'/closing';
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

		this.getMethodPayment();
		this.getResultFrame(location.href);

		this.closeShift();

		table.init('.datatable');

		sales.init();

	}

};
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
window.onload = function( event ) {

	helpers.setHost();

	var modules = [
		'commands', 
		'shift', 
		'sales', 
		'dashboard', 
		'employees', 
		'companies', 
		'shifts',
		'payments',
		'reports',
		'graphic'
	];

	bootstrap(location.href.split('/'))

	function bootstrap( route ) {

		var target = route.pop().trim();
		var index  = modules.indexOf( target );

		if( index != -1 ) {
			window[modules[index]].init();
		}else{
			return bootstrap( route );
		}

	}

};



//# sourceMappingURL=controlls.js.map
