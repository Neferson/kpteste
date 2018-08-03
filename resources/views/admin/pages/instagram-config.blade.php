@extends('admin_master') 

@section("content")

<div class="row">
	<div class="col-md-12">
		<div class="x_panel">
				<div class="x_title">
                    <h2>Configurações do instagram <small>Todod os dados de acesso para validar API</small></h2>
                    <div class="clearfix"></div>
				</div>
				<div class="x_content">
                    
					<div class="col-md-6">
						@if($user->instagram_token)							
							<div class="form-group">
								<input id="insta-token" type="text" name="instagram_token" value="{{ $user->instagram_token }}" class="form-control" readonly />
							</div>
							<div class="form-group">
								<a href="https://api.instagram.com/oauth/authorize/?client_id={{ $instagram->id }}&redirect_uri={{ $instagram->redirect }}&response_type=token&scope=public_content" class="btn btn-success">Realizar nova consulta</a>
							</div>
						@else
							<a href="https://api.instagram.com/oauth/authorize/?client_id={{ $instagram->id }}&redirect_uri={{ $instagram->redirect }}&response_type=token&scope=public_content" class="btn btn-default">Acessar Instagram</a>
						@endif
					</div>

				</div>
            </div>
     </div>
 </div>

@endsection

@section('script')

@endsection