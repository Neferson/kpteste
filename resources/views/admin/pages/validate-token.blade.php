@extends('admin_master') 

@section("content")

<div class="row">
	<div class="col-md-12">
		<div class="x_panel">
				<div class="x_title">
                    <h2>Configurações do instagram <small>Todos os dados de acesso para validar API</small></h2>
                    <div class="clearfix"></div>
				</div>
				<div class="x_content">
                    
					<div class="col-md-6">
                        <form action="">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <input id="insta-token" type="text" name="instagram_token" value="" class="form-control" readonly />
                            </div>
                            <div class="form-group">
                                <input id="insta-tag" type="text" name="instagram_tag" class="form-control" placeholder="Tag do instagram">
                                <small>Digite a <strong>tag sem a #</strong></small>
                            </div>

                            <div class="form-group">
                                <a href="#" class="save-data btn btn-success">Salvar</a>
                            </div>
                        </form>
                    </div>
                    

				</div>
            </div>
     </div>
 </div>

 @endsection

 @section('script')
    <script>
        $(function() {
            var url = document.URL;
            var token = url.substring(url.lastIndexOf('#access_token=') + 14);

            if( '-1' === url.lastIndexOf('#access_token=').toString() ){
                $.confirm({
                    title: 'OOPS  ',
                    content: 'Este não é um retorno válido do instagram',
                    type: 'red',
                    typeAnimated: true,
                    autoClose: 'cancelAction|8000',
                    buttons: {
                        cancelAction: {
                            text: 'Fechar',
                            btnClass: 'btn-red',
                            action: function(){
                                window.location.replace("{{ route('insta-config') }}");
                            }
                        }
                    }
                });
            }

            $('#insta-token').val( token );

            $('.save-data').click( function() {              
                
                if( $('#insta-tag').val().length ){

                    $.ajax({
                        method: 'POST',
                        dataType: 'JSON',
                        data: $('form').serialize(),
                        url: '{{ route("instagram-set-config") }}',
                        success: function( data ) {
                           
                            $.confirm({
                                title: 'Sucesso!',
                                content: data.message,
                                type: 'green',
                                typeAnimated: true,
                                buttons: {
                                    tryAgain: {
                                        text: 'Fechar',
                                        btnClass: 'btn-green',
                                        action: function(){
                                            window.location.replace("{{ route('instagram-images-list') }}");
                                        }
                                    }
                                }
                            });

                        }
                    })

                }else{

                    $.confirm({
                        title: 'Há algo de errado',
                        content: 'O campo Tag do Instagran é obrigatório',
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            tryAgain: {
                                text: 'Fechar',
                                btnClass: 'btn-red',
                                action: function(){
                                }
                            }
                        }
                    });

                }
                

                return false;
            })
            	
        })
    </script>
@endsection