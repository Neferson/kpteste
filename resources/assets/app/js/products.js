/*
* FINALIZA DADOS DE CONFIGURAÇÔES DE PRODUTOS
* FINALIZA DADOS DE CONFIGURAÇÔES DE PRODUTOS
*/


// limpa formulário 
$('.productModal').on('hidden.bs.modal', function (e) {
	clearFormByID('productForm');
});

$('#productForm input[type="radio"]').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue',
    increaseArea: '20%' // optional
  });

$('#kg').on('ifChecked', function(event){
	$('#productForm .amountContainer').css('display','none').find('input[name="amount"]').val('0.00');
});

$('#unidade').on('ifChecked', function(event){
	$('#productForm .amountContainer').css('display','block');
});


$('#btn-salvar-dados-product').click( function(e){
	
	var link = $('#productForm').attr('action');
	
	$.ajax({
		url: link,
		method: "POST",
		dataType: 'json',
		data: $('#productForm').serialize(),
		
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
			$('#productForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
			
			$.each( data , function( index, value ) {
				if(index){
					$('#productForm .' + index + 'Container').addClass('has-error');
					$('#productForm .' + index + 'ContainerMessage').append( value );
				}
			});			
		}
	})
	return false;
});

$('#btnAddProduct').click(function(){
	var link = $(this).attr('href');
	// esconde informação do campo em branco
	$('#productForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
	$('#productForm').attr('action', link);
})

$('#productContainer .editButton').click( function(e){

	var id =  $(this).attr('id-product');	
	var link =  $(this).attr('href');

	$('#productForm').attr('action', link+'/update');

	// informa id editado
	$('#productId').val( id );
	
	// limpa qualquer erro 
	$('#productForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
				
	$.ajax({
		url: link,
		method: "GET",
		dataType: 'json',
		success: function( data ) {
			
			// abre modal com formulário
			$('.productModal').modal('toggle');

			// insere dados do usuário no formulário
			$("#productForm input[name='name']").val( data.name );
			$("#productForm select option[value='"+ data.category_id +"']").prop("selected", true);
			$("#productForm input[name='amount']").val( data.amount );
			
			// $("#"+ data.measurement).attr('checked', 'checked');
			$("#"+ data.measurement).iCheck('check');
			
			$("#productForm textarea[name='obs']").val( data.obs );
			console.log( data );
		},
		error: function(){
			// invoca toast de erro
			dangerToast();
		}
	});

	return false;
});

$('#productContainer .deleteButton').click( function(){
	var id = $(this).attr('id-product');
	var link = $(this).attr('href');

	$.confirm({
		title: 'Atenção!',
		content: 'Tem certeza que deseja excluir este produto?!',
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
							$("#product-"+ id).fadeOut();
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
* FINALIZA DADOS DE CONFIGURAÇÔES DE PRODUTOS
* FINALIZA DADOS DE CONFIGURAÇÔES DE PRODUTOS
*/



////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////// CATEGORIA DE PRODUTOS ///////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



/*
* FINALIZA DADOS DE CONFIGURAÇÔES DE CATEGORIA DE PRODUTOS
* FINALIZA DADOS DE CONFIGURAÇÔES DE CATEGORIA DE PRODUTOS
*/


// limpa formulário 
$('.productCategoryModal').on('hidden.bs.modal', function (e) {
	clearFormByID('productCategoryForm');
});

$('#productCategoryForm input[type="radio"]').iCheck({
    checkboxClass: 'icheckbox_flat-blue',
    radioClass: 'iradio_flat-blue',
    increaseArea: '20%' // optional
});


$('#btn-salvar-dados-product-category').click( function(e){
	
	var link = $('#productCategoryForm').attr('action');
	
	$.ajax({
		url: link,
		method: "POST",
		dataType: 'json',
		data: $('#productCategoryForm').serialize(),
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
			$('#productCategoryForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
			
			$.each( data , function( index, value ) {
				if(index){
					$('#productCategoryForm .' + index + 'Container').addClass('has-error');
					$('#productCategoryForm .' + index + 'ContainerMessage').append( value );
				}
			});
			
		}
	})
	return false;
});

$('#btnAddProduct').click(function(){
	var link = $(this).attr('href');
	// esconde informação do campo em branco
	$('#productCategoryForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
	$('#productCategoryForm').attr('action', link);
})

$('#productCategoryContainer .editButton').click( function(e){

	var id =  $(this).attr('id-product-category');	
	var link =  $(this).attr('href');

	$('#productCategoryForm').attr('action', link+'/update');

	// informa id editado
	$('#productCategoryId').val( id );
	
	// limpa qualquer erro 
	$('#productCategoryForm').find('div.form-group').removeClass('has-error').find('.error-message').html('');
				
	$.ajax({
		url: link,
		method: "GET",
		dataType: 'json',
		success: function( data ) {
			
			// abre modal com formulário
			$('.productCategoryModal').modal('toggle');

			// insere dados do usuário no formulário
			$("#productCategoryForm input[name='name']").val( data.name );
			$("#productCategoryForm select option[value='"+ data.category_id +"']").prop("selected", true);
			$("#productCategoryForm input[name='amount']").val( data.amount );
			
			// $("#"+ data.measurement).attr('checked', 'checked');
			$("#"+ data.measurement).iCheck('check');
			
			$("#productCategoryForm textarea[name='obs']").val( data.obs );
			console.log( data );
		},
		error: function(){
			// invoca toast de erro
			dangerToast();
		}
	});

	return false;
});

$('#productCategoryContainer .deleteButton').click( function(){
	var id = $(this).attr('id-product-category');
	var link = $(this).attr('href');

	$.confirm({
		title: 'Atenção!',
		content: 'Tem certeza que deseja excluir esta categoria?!',
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
							$("#product-category-"+ id).fadeOut();
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
* FINALIZA DADOS DE CONFIGURAÇÔES DE PRODUTOS
* FINALIZA DADOS DE CONFIGURAÇÔES DE PRODUTOS
*/