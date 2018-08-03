@extends('admin_master') 

@section("content")
@if( count($images->data) )
    <div class="row">
        <div class="col-md-12">
            <div class="x_panel">				
                <div class="x_content">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                    
                        <div class="profile_img">
                            <div id="crop-avatar">
                                <img class="img-responsive avatar-view" src="{{ $images->data[0]->user->profile_picture }}" alt="Avatar" title="Change the avatar">
                            </div>
                        </div>
                        <h3>{{ $images->data[0]->user->full_name }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12">
            <div class="x_panel">				
                <div class="x_content">                
                    @for($i=0; $i < count($images->data); $i++)             
                        <div class="col-md-3">
                            <div class="thumbnail">
                                <div class="">
                                    <img style="width: 100%; display: block;" src="{{ $images->data[$i]->images->standard_resolution->url }}" alt="image">
                                </div>
                            </div>
                        </div>
                    @endfor
                </div>
            </div>
        </div>
    </div>
@else
    <div class="row">
        <div class="col-md-12">
            <div class="alert alert-danger alert-dismissible fade in" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <strong>Galeria vazia!</strong> Verifique suas configurações e tente novamente!
            </div>
        </div>
    </div>
@endif

 @endsection