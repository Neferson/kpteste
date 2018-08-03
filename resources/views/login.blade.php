<!DOCTYPE html>
<html lang="en">
  <head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<!-- Meta, title, CSS, favicons, etc. -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Gentelella Alela! | </title>
	
	<link href='{{ asset("css/main.css") }}' rel="stylesheet">

	{{--  <!-- Bootstrap -->
	<link href="../vendors/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- Font Awesome -->
	<link href="../vendors/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- NProgress -->
	<link href="../vendors/nprogress/nprogress.css" rel="stylesheet">
	<!-- Animate.css -->
	<link href="../vendors/animate.css/animate.min.css" rel="stylesheet">

	<!-- Custom Theme Style -->
	<link href="../build/css/custom.min.css" rel="stylesheet">  --}}
	
	
	
  </head>

  <body class="login">
	<div>
		<a class="hiddenanchor" id="signup"></a>
	  	<a class="hiddenanchor" id="signin"></a>

	  	<div class="login_wrapper">
			<div class="animate form login_form">
		  		{{--  <section class="login_content">  --}}
				<section class="row">
					
					<div class="form-login">
						<form method="POST" action="{{ url('login') }}">
							{{ csrf_field() }}
							<h1 class="text-center">
								<img src="{{ asset('images/logo.png') }}" class="img-responsive center-block" />
							</h1>
							@if($errors->first('error-login'))
								<div class="alert alert-danger alert-dismissible fade in" role="alert">
									<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
									</button>
									<strong>Dados incorretos!</strong> E-mail e/ou senhas incorretos.
							  	</div>
							@endif
							<div class="col-md-12">
								<div class="form-group {{ ($errors->first('email')) ? 'has-error' : '' }}">
									<input type="text" name="email" class="form-control" placeholder="E-mail" value="{{ old('email') }}" />
									@if($errors->first('email'))
										<p class="error-message">{{ $errors->first('email') }}</p>
									@endif
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group {{ ($errors->first('password')) ? 'has-error' : '' }}">
									<input type="password" name="password" class="form-control" placeholder="Senha" value="{{ old('password') }}" />
								</div>
								@if($errors->first('password'))
									<p class="error-message">{{ $errors->first('password') }}</p>
								@endif
							</div>
							
							<div class="col-md-12">
								<div class="form-group text-center">
									<br>
									<input class="btn btn-success btn-md" type="submit" value="Entrar no sistema" />									
								</div>
							</div>
							<div class="col-md-12 text-center">
								<!-- <a id="recuperarSenha" href="#forget-password" class="">Esqueceu sua senha? Recuperar.</a>   -->
							</div>

							<div class="clearfix"></div>

						</form>
					</div>

		 		</section>
			</div>

			<div id="register" class="animate form registration_form">
				<section class="login_content">
					<form>
						<h1>Create Account</h1>
						<div>
							<input type="text" class="form-control" placeholder="Username" required="" />
						</div>
						<div>
							<input type="email" class="form-control" placeholder="Email" required="" />
						</div>
						<div>
							<input type="password" class="form-control" placeholder="Password" required="" />
						</div>
						<div>
							<a class="btn btn-default submit" href="index.html">Submit</a>
						</div>

						<div class="clearfix"></div>

						<div class="separator">
							<p class="change_link">Already a member ?
								<a href="#signin" class="to_register"> Log in </a>
							</p>

							<div class="clearfix"></div>
							<br />

							<div>
								<h1><i class="fa fa-paw"></i> Gentelella Alela!</h1>
								<p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
							</div>
						</div>
					</form>
					<a href="#signin" class="to_register"> Log in </a>
				</section>
			</div>
		
		</div>
	
	</div>
	<script type='text/javascript' src='{{ asset("js/main.js") }}'></script>
  </body>
</html>
