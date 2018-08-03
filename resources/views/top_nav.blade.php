
<div class="top_nav">
	<div class="nav_menu">
		<nav>
			<div class="nav toggle">
				<a id="menu_toggle">
					<i class="fa fa-bars"></i>
				</a>
			</div>

			<ul class="nav navbar-nav navbar-right">
				<li>
					<form action="{{ url('logout') }}" method="post" style="padding:11px 0 7px;">
						{{ csrf_field() }}
						<button type="submit" class="btn btn-danger">
							<i class="fa fa-power-off"></i>
						</button>
					</form>
				</li>
				<li class="">
					<a href="javascript:;" class="user-profile dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
						<img src="{{ asset('/') }}images/logo.png" alt="">
						<strong>{{ Auth::user()->name }}</strong>
						<!-- <span class=" fa fa-angle-down"></span> -->
					</a>
				</li>
			</ul>
		</nav>
	</div>
</div>
<!-- /top navigation