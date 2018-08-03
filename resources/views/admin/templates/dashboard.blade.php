@extends('admin_master') 

@section("content")

<div class="row tile_count">
	
		<div class="animated flipInY col-lg-3 col-md-3 col-sm-6 col-xs-12">
			<div class="tile-stats">
				<div class="icon"><i class="fa fa-users"></i></div>
				<div class="count">{{ count($users) }}</div>
				<h3>Logados</h3>
				<p>Usuários ativos no momento</p>
			</div>
		</div>
</div>
<div class="clearfix"></div>	
	
<div class="row">
	<div class="col-md-8">
		<div class="x_content">
			<div class="dashboard_graph">
				<div class="row x_title">
					<div class="col-md-9">
						<h3>Usuários logados no memento<small></small></h3>
					</div>			
				</div>
				<div class="row">
					<div class="col-xs-12">
						<canvas id="users-chart" class="center-block" ></canvas>					
					</div>
					
				</div>
			</div>
		</div>
	</div>
	<div class="clearfix"></div>
</div>

@endsection


@section('script')

	<script>
		
		$(function() { 	
			getUsersJson();
		})


		function getUsersJson(  ){
			var users = $.ajax({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				method:'POST',
				url:'{{ url("/loggedin")}}',
				dataType: 'JSON',
				success: function( data ) {
					buildChart(data);
				},
				cache: false
			})

			return users;
		}

		function buildChart( data ){
			
			var names = [], ids = [];

			for(i = 0; i < data.length; i++){
				names[i] = data[i].name
			}

			for(j = 0; j < data.length; j++){
				ids[j] = data[j].id
			}

			var ctx = document.getElementById("users-chart").getContext('2d');
			var myChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: names,
					datasets: [{
						data: ids,
						backgroundColor: [
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)'
						]
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});
		}
	</script>

@endsection