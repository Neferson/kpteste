////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////// MEIOS DE PAGAMENTO ///////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/*
* INICIO DADOS DE CONFIGURAÇÔES DE SERVIÇOS DE PAGAMENTO
* INICIO DADOS DE CONFIGURAÇÔES DE SERVIÇOS DE PAGAMENTO
*/

// limpa formulário 
$('.paymentModal').on('hidden.bs.modal', function (e) {
	clearFormByID('paymentForm');
});

$('#paymentForm input[type="radio"]').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue',
    increaseArea: '20%' // optional
});

$('#btn-salvar-dados-payment').click( function(e){
	
	var link = $('#paymentForm').attr('action');
	
	$.ajax({
		url: link,
		method: "POST",
		dataType: 'json',
		data: $('#paymentForm').serialize(),
		success: function( data ) {
			console.log( data );
			
			// invoca toast					
			successToast();	

			setTimeout(function(){
				location.reload();
			}, 1500);
		},
		error: function(response, status, error){
			// invoca toast de erro
			dangerToast();

			var data = $.parseJSON(response.responseText);
			console.log( data );

			// limpa informaçõe de erros anteriores no formulário
			$('#paymentForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
			
			$.each( data , function( index, value ) {
				if(index){
					$('#paymentForm .' + index + 'Container').addClass('has-error');
					$('#paymentForm .' + index + 'ContainerMessage').append( value );
				}
			});
			
		}
	})
	return false;
});

$('#btnAddPayment').click(function(){
	var link = $(this).attr('href');
	// esconde informação do campo em branco
	$('#paymentForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
	$('#paymentForm').attr('action', link);
})

$('#paymentContainer .editButton').click( function(e){

	var id =  $(this).attr('id-payment');	
	var link =  $(this).attr('href');

	$('#paymentForm').attr('action', link+'/update');

	// informa id editado
	$('#paymentId').val( id );
	
	// limpa qualquer erro 
	$('#paymentForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
				
	$.ajax({
		url: link,
		method: "GET",
		dataType: 'json',
		success: function( data ) {
			
			// abre modal com formulário
			$('.paymentModal').modal('toggle');

			// insere dados do usuário no formulário
			$("#paymentForm input[name='name']").val( data.name );
			$("#paymentForm select option[value='"+ data.category_id +"']").prop("selected", true);
			$("#paymentForm input[name='amount']").val( data.amount );
			
			$("#paymentForm textarea[name='obs']").val( data.obs );
			console.log( data );
		},
		error: function(){
			// invoca toast de erro
			dangerToast();
		}
	});

	return false;
});

$('#paymentContainer .deleteButton').click( function(){
	var id = $(this).attr('id-payment');
	var link = $(this).attr('href');

	$.confirm({
		title: 'Atenção!',
		content: 'Tem certeza que deseja excluir este meio de pagamento?!',
		animation: 'zoom',
		closeAnimation: 'scale',
		buttons: {
			Sim: function () {

				$.ajax({
					url: link,
					method: "GET",
					dataType: 'json',
					success: function( data ) {
	
						if(data){
							$("#payment-"+ id).fadeOut();
							// invoca toast					
							successToast();					
						}
						console.log(data);								
					},
					error: function(){
						// invoca toast de erro
						dangerToast();
					}
				});
				
			},
			Cancelar: {
				btnClass: 'btn-red'
				
			}
		}
	});

	return false;
});


/*
* FINALIZA DADOS DE CONFIGURAÇÔES DE SERVIÇOS DE PAGAMENTO
* FINALIZA DADOS DE CONFIGURAÇÔES DE SERVIÇOS DE PAGAMENTO
*/


// limpa formulário 
$('.paymentMethodModal').on('hidden.bs.modal', function (e) {
	clearFormByID('paymentMethodForm');
});

$('#paymentMethodForm input[type="radio"]').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue',
    increaseArea: '20%' // optional
});

$('#btn-salvar-dados-payment-method').click( function(e){
	
	var link = $('#paymentMethodForm').attr('action');
	
	$.ajax({
		url: link,
		method: "POST",
		dataType: 'json',
		data: $('#paymentMethodForm').serialize(),
		success: function( data ) {
			console.log( data );
			
			// invoca toast					
			successToast();	

			setTimeout(function(){
				location.reload();
			}, 1500);
		},
		error: function(response, status, error){
			// invoca toast de erro
			dangerToast();

			var data = $.parseJSON(response.responseText);
			console.log( data );

			// limpa informaçõe de erros anteriores no formulário
			$('#paymentMethodForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
			
			$.each( data , function( index, value ) {
				if(index){
					$('#paymentMethodForm .' + index + 'Container').addClass('has-error');
					$('#paymentMethodForm .' + index + 'ContainerMessage').append( value );
				}
			});
			
		}
	})
	return false;
});

$('#btnAddPaymentMethod').click(function(){
	
	var link = $(this).attr('data-action');
	// esconde informação do campo em branco
	$('#paymentMethodForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
	$('#paymentMethodForm').attr('action', link);
})

$('#paymentMethodContainer .editButton').click( function(e){

	var id =  $(this).attr('id-payment-method');	
	var link =  $(this).attr('href');

	$('#paymentMethodForm').attr('action', link+'/update');

	// informa id editado
	$('#paymentMethodId').val( id );
	
	// limpa qualquer erro 
	$('#paymentMethodForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
				
	$.ajax({
		url: link,
		method: "GET",
		dataType: 'json',
		success: function( data ) {
			
			// abre modal com formulário
			$('.paymentMethodModal').modal('toggle');

			// insere dados do usuário no formulário
			$("#paymentMethodForm input[name='title']").val( data.title );
			$("#paymentMethodForm .payment-service option[value='"+ data.payment_service_id +"']").prop("selected", true);
			$("#paymentMethodForm .payment-pointer option[value='"+ data.payment_pointer +"']").prop("selected", true);
			$("#paymentMethodForm input[name='payment_day']").val( data.payment_day );
			
			$("#paymentMethodForm textarea[name='obs']").val( data.obs );
			console.log( data );
		},
		error: function(){
			// invoca toast de erro
			dangerToast();
		}
	});

	return false;
});

$('#paymentMethodContainer .deleteButton').click( function(){
	var id = $(this).attr('id-payment-method');
	var link = $(this).attr('href');

	$.confirm({
		title: 'Atenção!',
		content: 'Tem certeza que deseja excluir esta forma de pagamento?!',
		animation: 'zoom',
		closeAnimation: 'scale',
		buttons: {
			Sim: function () {

				$.ajax({
					url: link,
					method: "GET",
					dataType: 'json',
					success: function( data ) {
	
						if(data){
							$("#payment-method-"+ id).fadeOut();
							// invoca toast					
							successToast();					
						}
						console.log(data);								
					},
					error: function(){
						// invoca toast de erro
						dangerToast();
					}
				});
				
			},
			Cancelar: {
				btnClass: 'btn-red'
				
			}
		}
	});

	return false;
});