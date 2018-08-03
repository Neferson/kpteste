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
$('.couponModal').on('hidden.bs.modal', function (e) {
	clearFormByID('couponForm');
});

$('#couponForm input[type="radio"]').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue',
    increaseArea: '20%' // optional
});

$('#couponForm .typeContainer').on('change', function(){
	if( $(this).find('select').val() == 'real' ){
		$('#couponForm .valueContainer').find('input[name="value"]').addClass('amount');
		$('#couponForm .valueContainer').find(".input-group-addon").html('R$');
	}else{
		$('#couponForm .valueContainer').find('input[name="value"]').removeClass('amount');
		$('#couponForm .valueContainer').find(".input-group-addon").html('%');
	}
});

$('#btn-salvar-dados-coupon').click( function(e){
	
	var link = $('#couponForm').attr('action');
	
	$.ajax({
		url: link,
		method: "POST",
		dataType: 'json',
		data: $('#couponForm').serialize(),
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
			$('#couponForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
			
			$.each( data , function( index, value ) {
				if(index){
					$('#couponForm .' + index + 'Container').addClass('has-error');
					$('#couponForm .' + index + 'ContainerMessage').append( value );
				}
			});
			
		}
	})
	return false;
});

$('#btnAddCoupon').click(function(){
	var link = $(this).attr('data-link');
	// esconde informação do campo em branco
	$('#couponForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
	$('#couponForm').attr('action', link);
})

$('#couponContainer .editButton').click( function(e){

	var id =  $(this).attr('id-coupon');	
	var link =  $(this).attr('href');

	$('#couponForm').attr('action', link+'/update');


	// informa id editado
	$('#couponId').val( id );
	
	// limpa qualquer erro 
	$('#couponForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
				
	$.ajax({
		url: link,
		method: "GET",
		dataType: 'json',
		success: function( data ) {
			
			// abre modal com formulário
			$('.couponModal').modal('toggle');

			// insere dados do usuário no formulário
			$("#couponForm input[name='name']").val( data.name );
			$("#couponForm input[name='code']").val( data.code );
			$("#couponForm select option[value='"+ data.type +"']").prop("selected", true);
			$("#couponForm input[name='value']").val( data.value );

			if( data.type == 'real' ){
				$('#couponForm .valueContainer').find('input[name="value"]').addClass('amount');
				$('#couponForm .valueContainer').find(".input-group-addon").html('R$');
			}else{
				$('#couponForm .valueContainer').find('input[name="value"]').removeClass('amount');
				$('#couponForm .valueContainer').find(".input-group-addon").html('%');
			}
			
			$("#couponForm textarea[name='obs']").val( data.obs );
			console.log( data );
		},
		error: function(){
			// invoca toast de erro
			dangerToast();
		}
	});

	return false;
});

$('#couponContainer .deleteButton').click( function(){
	var id = $(this).attr('id-coupon');
	var link = $(this).attr('href');

	$.confirm({
		title: 'Atenção!',
		content: 'Tem certeza que deseja excluir este cupom?!',
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
							$("#coupon-"+ id).fadeOut();
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

