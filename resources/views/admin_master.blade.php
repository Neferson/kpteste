<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>Kasulo Test</title>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<link href='{{ asset("css/main.css") }}' rel="stylesheet">
</head>
<body class="nav-md">
	<div class="container body">
		<div class="main_container">

			@include('sidebar')

			@include('top_nav')

			<!-- page content -->
			<div class="right_col" role="main">
				@yield('content')
				
			</div>	

			<footer>
				<div class="pull-right">
					<b>Sistema de Teste</b>, desenvolvido por <a href="https://wa5.com.br" target="_blank"><b>Neff oliveira</b></a>
				</div>
				<div class="clearfix"></div>
			</footer>		
			
		</div>
	</div>
</div>
	<!-- <script src="https://code.jquery.com/jquery-1.12.4.js" type="text/javascript"></script> -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" type="text/javascript"></script>	
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.js" type="text/javascript"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js" type="text/javascript"></script>
	<script type='text/javascript' src='{{ asset("js/app.js") }}'></script>

	@yield('script')
</body>
</html>