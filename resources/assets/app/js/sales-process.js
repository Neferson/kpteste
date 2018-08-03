
$(document).ready(function(){

	/* ABERTURA DE TURNO */
	$("#btnOpeningShift").click( function() {		
		var turno  = $('#opening-shift').val()
		
		if(turno.length){
			var link = $(this).attr('href');

			$.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				method: "POST",
				dataType: "JSON",
				data: {"turno": turno},
				url: link,
				success: function(data){
					console.log(data);
					window.location.href = data.link;
				},
				error: function(status, error, text) {
					//alert(status.responseJSON.error);
					$.confirm({
						title: 'Erro!',
						content: status.responseJSON.error,
						animation: 'zoom',
						closeAnimation: 'scale',
						buttons: {
							OK: {
								btnClass: 'btn-red'								
							}
						}
					});
				}
			})

		}else{
			alert("Teste");
		}

		return false;		
	});



	$("#btnClosingShift").click( function() {
		
		var link = $(this).attr('href');
		
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: "POST",
			dataType: "JSON",
			data: {"turno": turno},
			url: link,
			success: function(data){
				// console.log(data);
			},
			error: function() {
				// console.log('deu erro');
			}
		})
	});



	$('#closeShift').click( function(e) {
		e.preventDefault();
		var link = $(this).attr('href');

		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			method: 'POST',
			url: link,
			dataType: 'json',
			success: function( data ) {
				console.log( data );
				$.confirm({
					title: 'Sucesso!',
					content: data.success,
					animation: 'zoom',
					closeAnimation: 'scale',
					redirect: data.link,
					buttons: {
						OK: {
							btnClass: 'btn-red',
							action: function(redirect){
								// console.log(data);
								window.location.replace(data.link);
							}						
						}
					}
				});
				// setTimeout(function(){ location.reload(); }, 3000);
				// console.log(data);
			},
			error: function(status, error, text) {
				//alert(status.responseJSON.error);
				$.confirm({
					title: 'Erro!',
					content: status.responseJSON.error,
					animation: 'zoom',
					closeAnimation: 'scale',
					buttons: {
						OK: {
							btnClass: 'btn-red'								
						}
					}
				});
			}
		})
		return false;
	})



	$("#btnOpeningSalesControls").click( function() {

		var link = $(this).attr("href");
		
		if($('#salesControlsCode').val().length){		
			
			$.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				method: 'POST',
				url: link,
				dataType: 'json',
				data: {code: $('#salesControlsCode').val()},
				success: function( data ) {
					
					$('.cashier-content').fadeIn();
					$('#salesControlsCode').attr('readonly', true);
					$('#btnOpeningSalesControls').css('display', 'none');
					$('#btnSaveSalesControls').css('display', 'block');
					$('.openEditableProductModal').attr('data-control-id', data.id);

					console.log(data);
				},
				error: function(status, error, text) {
					//alert(status.responseJSON.error);
					$.confirm({
						title: 'Erro!',
						content: status.responseJSON.error,
						animation: 'zoom',
						closeAnimation: 'scale',
						buttons: {
							OK: {
								btnClass: 'btn-red'								
							}
						}
					});
				}
			})
		
		}else{
			alert('Insira o código da comanda')
		}
		return false;
	})


	// abre modal de edição de produto e povoa formulário
	$('.openEditableProductModal').click( function() {

		var control_id = $(this).attr('data-control-id');
		
		
		var product = {
			id: $(this).attr('data-id'),
			name: $(this).attr('data-name'),
			price: $(this).attr('data-price'),
			qtd: 1,
		}
		$('#addEditableProductModal').modal('toggle')

		$('#editableProductForm .editable-prod-control-id').val( control_id  );
		$('#editableProductForm .editable-prod-id').val( product.id );
		$('#editableProductForm .editable-prod-name').val( product.name);
		$('#editableProductForm .editable-prod-price').val( mascaraDecimal(product.price) );
		$('#editableProductForm .editable-prod-qtd').val( product.qtd );
		$('#editableProductForm .hidden-price').val( product.price);

		$('#editableProductForm .preco-total').html( mascaraValor( product.price ) );

		return false;
	})



	$('#editableProductForm .editable-prod-qtd').on('change', function(){
		var qtd = $(this).val();
		var price = $('#editableProductForm .editable-prod-price').val();

		$('#editableProductForm .hidden-price').val( qtd * price );
		$('#editableProductForm .preco-total').html( mascaraValor(qtd * price) );
	});



	$('#editableProductForm .editable-prod-price').on('keyup', function(){
		
		var qtd = $('#editableProductForm .editable-prod-qtd').val();
		var price = $('#editableProductForm .editable-prod-price').val();

		$('#editableProductForm .hidden-price').val( qtd * price );
		$('#editableProductForm .preco-total').html( mascaraValor(qtd * price) );
		// $('#editableProductForm .preco-total').html( mascaraValor($(this).val()) );
	});



	$('#btnAddEditableProduct').off().click(function(){
		
		var code = $('.openEditableProductModal').attr('data-control-id');
		var link = $('.openEditableProductModal').attr('href') + '/' + code +'/items';
		var itemExiste = false;

		var product = {
			sales_shifts_id: code,
			id: $('#editableProductForm .editable-prod-id').val(),
			name: $('#editableProductForm .editable-prod-name').val(),
			qtd: $('#editableProductForm .editable-prod-qtd').val(),
			price: $('#editableProductForm .hidden-price').val(),
		}

		$(".chosen-products tbody tr").each( function( index ) {
			if($( this ).hasClass("chosen-product-"+  product.id)){
				itemExiste = true
			}		
		});	
			
		if( itemExiste ){
			$.confirm({
				title: 'Atenção!',
				content: 'Percebemos de você já adicionou "'+ product.name +'" a comanda. Deseja aumentar a quantidade do produto?',
				animation: 'zoom',
				closeAnimation: 'scale',
				link: link,
				product: product,
				buttons: {
					SIM:  {
						keys: ['enter', 'shift'],
						action: function ( ) {
							$.ajax({
								headers: {
									'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
								},
								url: link,
								dataType: 'json',
								method: 'post',
								data: product,
								success: function( data ) {
									
									$(".chosen-products tbody .chosen-product-" + product.id).remove();
									$('.subtotal-price').html( mascaraValor(data.total_price) );
									var html = '';

									$(data.items).each(function( index, value ) {

										html += '<tr class="chosen-product-'+  value.products_id +'">'
													+'<td>'+  value.products_id +'</td>'
													+'<td>'+   value.products_name +'</td>'
													+'<td class="item-qtd">'+  value.qtd +'</td>'
													+'<td class="currency-type">'+  mascaraValor(value.products_price) +'</td>'
													+'<td>'
														+'<a href="'+ value.url_delete +'" class="btn-danger btn-xs deleteProduct" data-id="'+  value.products_id +'"><i class="fa fa-times" aria-hidden="true"></i></a>'
													+'</td>'
												+'</tr>';
											
									});

									$(".chosen-products tbody").html(html);
									
									deletaProdutos();

									$('.subtotal-price').html( mascaraValor(data.total_price) );
								},

								error: function(status, error, text) {
									// console.log(status);
									alert("deu erro");
								}
							});
						}
					},
					NÃO: {
						text: 'Não',
						btnClass: 'btn-red',							
						action: function(){
							return true;
						}
					},
				}
			});
			
		}else{

			$.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				url: link,
				dataType: 'json',
				method: 'post',
				data: product,
				success: function( data ) {
					var html = '';
					
					$(data.items).each(function( index, value ) {
						
						html += '<tr class="chosen-product-'+  value.products_id +'">'
									+'<td>'+  value.products_id +'</td>'
									+'<td>'+   value.products_name +'</td>'
									+'<td class="item-qtd">'+  value.qtd +'</td>'
									+'<td class="currency-type">'+  mascaraValor(value.products_price) +'</td>'
									+'<td>'
										+'<a href="'+ value.url_delete +'" class="btn-danger btn-xs deleteProduct" data-id="'+  value.products_id +'"><i class="fa fa-times" aria-hidden="true"></i></a>'
									+'</td>'
								+'</tr>';
							
					});
						
					$(".chosen-products tbody").html(html);
					console.log( data );

					$('.subtotal-price').html( mascaraValor(data.total_price) );

					deletaProdutos();
				},
				error: function(status, error, text) {
					var msgError = '';

					if( status.status == 422){
						msgError = status.responseJSON.error;
					}else{
						msgError = 'Não foi possível inserir o produto!';
					}
					
					$.confirm({
						title: 'Houve um erro!',
						content: msgError,
						animation: 'zoom',
						closeAnimation: 'scale',
						buttons: {
							OK: {
								btnClass: 'btn-red'								
							}
						}
					});
				}
			});
			
			deletaProdutos();
		}



		// parei aqui
		$('#addEditableProductModal').modal('toggle')

		// console.log( $('#editableProductForm').serialize() );
		return false;
	})
	


	$('.control-edit').click(function(){
		
		var href = $(this).attr('href');
		
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: href,
			dataType: 'json',
			method: 'get',
			success: function( data ) {

				console.log( data );				
				
				$('.openEditableProductModal').attr('data-control-id', data.id);
				$('#salesControlsCode').val(data.code).attr('readonly',true);
				$('.cashier-content').css('display', 'block');

				var html = '';

				$.each( data.items , function( index, value ) {
					
					var product = value;
					
					html += '<tr class="chosen-product-'+  product.products_id +'">'
									+'<td>'+  product.products_id +'</td>'
									+'<td>'+  product.products_name +'</td>'
									+'<td>'+  product.qtd +'</td>'
									+'<td class="currency-type">'+  mascaraValor(product.products_price) +'</td>'
									+'<td>'
										+'<a href="'+ product.url_delete +'" class="btn-danger btn-xs deleteProduct" data-id="'+ product.products_code +'"><i class="fa fa-times" aria-hidden="true"></i></a>'
									+'</td>'
								+'</tr>';
					
				});

				$('.chosen-products tbody').html( html );
				$('.subtotal-price').html( mascaraValor(data.total_price) );
				$('#btnOpeningSalesControls').css('display', 'none');
				$('#btnSaveSalesControls').css('display', 'block');
				deletaProdutos();
			},
			error: function(status, error, text) {

				$.confirm({
					title: 'Atenção!',
					content: 'Não foi possível recuperar esta comanda!',
					animation: 'zoom',
					closeAnimation: 'scale',
					buttons: {
						OK: {
							 btnClass: 'btn-red'								
						}
					}
				});
			}
		});


		return false;
	})



	$('.control-close').click(function(){
		
		var link = $(this).attr('href');
		var code = $(this).attr('data-code');
		var id = $(this).attr('data-id');

		// alert( id );
		// return false;

		$("#formClosingControl .control-id").val( id );
		
		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: link,
			dataType: 'json',
			method: 'get',
			success: function( data ) {
				console.log( data );

				var  html = '';
				var total_price = 0;

				$("#formClosingControl .control-id").val( data.id );
				
				$(data.items).each(function( index, value ) {									
					html += '<tr class="chosen-product-'+  value.products_id +'">'
								+'<td>'+  value.products_id +'</td>'
								+'<td>'+  value.products_name +'</td>'								
								+'<td class="item-qtd">'+  value.qtd +'</td>'
								// +'<td class="">'+  mascaraValor(value.unit_price) +'</td>'
								+'<td class="currency-type">'+  mascaraValor(value.products_price) +'</td>'												
							+'</tr>';
					total_price = Number(value.products_price) + Number(total_price); 
					
				});
				
				$("#closeControlModal .container-price span.val-parcial").html( mascaraValor(total_price) );
				$("#closeControlModal .container-price span.val-desconto").html(  mascaraValor(0.00) );
				$("#closeControlModal .container-price span.val-final").html( mascaraValor(total_price) );				
				$("#closeControlModal .produtos-comprados tbody").html(html);
			}

		});
		
		$('#closeControlModal').modal('toggle');
		$('#closeControlModal .cod-closing-control').html( code );

		return false;
	});



	$('.control-delete').click(function(){
		var link = $(this).attr('href');
		
		$.confirm({
			title: 'Atenção!',
			content: 'Tem certeza que deseja deletar esta comanda?',
			animation: 'zoom',
			closeAnimation: 'scale',
			link: link,
			buttons: {
				SIM:  {
					keys: ['enter', 'shift'],
					action: function ( ) {
						$.ajax({
							headers: {
								'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
							},
							url: link,
							dataType: 'json',
							method: 'post',
							success: function( data ) {
								console.log( data );
								$('.list-control-code-'+ data.id ).fadeOut();
							},
							error: function(status, error, text) {
								alert("deu erro");
							}
						});
					}
				},
				NÃO: {
					text: 'Não',
					btnClass: 'btn-red',							
					action: function(){
						return true;
					}
				},
			}
		});

		return false;
	});



	$('#formClosingControl .btn-aplicar-desconto').on('click', function(){
		
		var codDesconto = $('#formClosingControl input[name="desconto"]').val();
		var control_id = $('#formClosingControl input[name="control_id"]').val();
		var link = $(this).attr('href');
		
		if( codDesconto.length ){
			
			$.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				url: link,
				dataType: 'json',
				method: 'post',
				data: $('#formClosingControl').serialize(),
				success: function( data ) {
					console.log(data);
					
					$('#closeControlModal .container-price span.val-desconto').html( mascaraValor(data.discount_price) );
					$('#closeControlModal .container-price span.val-final').html( mascaraValor(data.final_price) );
				},
				error: function(status, error, text) {
					var cupon = status.responseJSON.cupon;
					if(cupon){
						$.confirm({
							title: 'Atenção!',
							content: cupon,
							animation: 'zoom',
							closeAnimation: 'scale',
							cupon: status.responseJSON.cupon,
							buttons: {								
								OK:{
									btnClass: 'btn-red',
									action: function() {
										$('#formClosingControl .descontoContainer').addClass("has-error");
										$('#formClosingControl .descontoContainerMessage').html( cupon );
									}
								}
							}
						});
					}
				}
			})


			$('#formClosingControl .descontoContainer').removeClass("has-error");
			$('#formClosingControl .descontoContainerMessage').html("");
		}else{
			$('#formClosingControl .descontoContainer').addClass("has-error");
			$('#formClosingControl .descontoContainerMessage').html("Preenchimento obrigatório.");
		}

		return false;
		// alert( $('#formClosingControl input[name="desconto"]').val() );
	})



	$('#formClosingControl select[name="payment_service"]').on('change', function(){
		var link = $('meta[name="url-app"]').attr('content');
		var service_id = $(this).val();

		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: link + '/payments_service/'+ service_id +'/payments-methods',
			dataType: 'json',
			method: 'post',
			success: function( data ) {
				// console.log( data );
				var html = '<option value="">Escolha uma opção</option>';
				$(data).each(function(index, value) {
					html +=  '<option value="'+value.id+'">'+ value.title +'</option>';
				});
				$('#formClosingControl select[name="payment_method"]').html( html );

				
			},
			error: function(status, error, text) {
				alert("deu erro");
			}
		});
	})



	$('#btnClosingControl').on('click', function(){
		
		// alert( $('#formClosingControl').serialize() );
		var link =  $('#formClosingControl').attr('action') + '/controls/'+ $('#formClosingControl input[name="control_id"]').val() +'/close';
		
		if($('#formClosingControl select[name="payment_service"]').val().length){
			$('#formClosingControl .payment_serviceContainer').removeClass("has-error");
			$('#formClosingControl .payment_serviceContainerMessage').html("");			
		}else{			
			$('#formClosingControl .payment_serviceContainer').addClass("has-error");
			$('#formClosingControl .payment_serviceContainerMessage').html("Campo obrigatório");
			return false;
		}

		if($('#formClosingControl select[name="payment_method"]').val().length){
			$('#formClosingControl .payment_methodContainer').removeClass("has-error");
			$('#formClosingControl .payment_methodContainerMessage').html("");
		}else{			
			$('#formClosingControl .payment_methodContainer').addClass("has-error");
			$('#formClosingControl .payment_methodContainerMessage').html("Campo obrigatório");
			return false;
		}

		// alert( link );

		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: link,
			dataType: 'json',
			method: 'post',
			data: $('#formClosingControl').serialize(),
			success: function( data ) {
				console.log( data );
				successToast();
				setTimeout(function(){ location.reload(); }, 3000);

			},
			error: function(status, error, text) {
				var cupon = status.responseJSON.cupon;
				var erro = status.responseJSON.error;
				if(cupon){
					$.confirm({
						title: 'Houve um problema!',
						content: 'Houve um erro inesperado, não foi possível finalizar esta comanda.',
						animation: 'zoom',
						closeAnimation: 'scale',
						cupon: status.responseJSON.cupon,
						buttons: {
							OK: function() {
							}
						}
					});
				}
				if(erro){
					$.confirm({
						title: 'Houve um problema!',
						content: erro,
						animation: 'zoom',
						closeAnimation: 'scale',
						buttons: {
							OK: function() {
							}
						}
					});
				}
			}
		})
		
	})

	
})



function deletaProdutos(){
	$('.deleteProduct').off().click( function( event ) {
		
		event.preventDefault();

		var urlDelete = $(this).attr('href');
		
		var id = $(this).attr('data-id');

		$.ajax({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			url: urlDelete,
			dataType: 'json',
			method: 'post',
			success: function( data ) {

				var html = '';
				
				$(data.items).each(function( index, value ) {
					
					html += '<tr class="chosen-product-'+  value.products_id +'">'
								+'<td>'+  value.products_id +'</td>'
								+'<td>'+   value.products_name +'</td>'
								+'<td class="item-qtd">'+  value.qtd +'</td>'								
								+'<td class="currency-type">'+  mascaraValor(value.products_price) +'</td>'
								+'<td>'
									+'<a href="'+ value.url_delete +'" class="btn-danger btn-xs deleteProduct" data-id="'+  value.products_id +'"><i class="fa fa-times" aria-hidden="true"></i></a>'
								+'</td>'
							+'</tr>';
						
				});
					
				$(".chosen-products tbody").html(html);

				// $('.chosen-product-'+ id).fadeOut();
				// $('.chosen-product-'+ id).remove();

				deletaProdutos();

				$('.subtotal-price').html( mascaraValor(data.total_price) );

			},
			error: function(status, error, text) {

				$.confirm({
					title: 'Atenção!',
					content: 'Não foi possível deletar o produto!',
					animation: 'zoom',
					closeAnimation: 'scale',
					buttons: {
						OK: {
							 btnClass: 'btn-red'								
						}
					}
				});

			}
		});
		
		return false;
	});
}


