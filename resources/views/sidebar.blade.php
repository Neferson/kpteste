

	<div class="col-md-3 left_col">
		<div class="left_col scroll-view">
			
			<!-- menu profile quick info -->
			<div class="profile clearfix">
				<div class="profile_pic">
					<img src="{{ url('images/logo.png') }}" alt="..." class="img-circle profile_img">
				</div>
				<div class="profile_info">
					<span>Bem vindo,</span><br>
					<p>{{ Auth::user()->name }}</p>
				</div>
			</div>
			<!-- /menu profile quick info -->

			<br />

			<!-- sidebar menu -->
			<div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
				<div class="menu_section">
					<!-- <h3>Menu Principal</h3> -->
					<ul class="nav side-menu">
							
						<li><a href="{{ route('dashboard') }}"><i class="fa fa-user" aria-hidden="true"></i> Usuários</a></li>
						
						<li><a><i class="fa fa-instagram"></i> Instragram <span class="fa fa-chevron-down"></span></a>
							<ul class="nav child_menu">
								<li><a href="{{ route('insta-config') }}">Configurações</a></li>
								<li><a href="{{ route('instagram-images-list') }}">Galeria</a></li>																	
							</ul>
						</li>					
						
					</ul>
				</div>
				
			</div>
			<!-- /sidebar menu -->

			
		</div>
	</div>