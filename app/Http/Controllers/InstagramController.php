<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;
use Config;
use URL;
use Respose;
use Curl;

class InstagramController extends Controller
{

    // responsavel por capturar dados de configuração do insgram e realizar request na api do instagram
    public function index()
    {
        $user = User::find( Auth::user()->id );
        $response = Curl::to('https://api.instagram.com/v1/tags/'. $user->instagram_tag .'/media/recent?access_token='. $user->instagram_token .'')->get();
        $images = json_decode($response, false);
        return view('admin.pages.images-list' , compact('images'));
    }


    // recupera dados de configuração do APP criado no instagram
    public function config()
    {
        $user = User::find( Auth::user()->id );
        $instagram = (object) [
            'id' =>  Config::get('instagram.id'),
            'redirect' => Config::get('instagram.redirect_url')
        ];

        return view('admin.pages.instagram-config', compact('user', 'instagram'));
    }


    public function setToken( Request $request)
    {
        return view('admin.pages.validate-token');
    }


    public function setConfiguration(Request $request)
    {
        User::where(['id'=>Auth::user()->id])
        ->update([
            'instagram_token' => $request->instagram_token,
            'instagram_tag' => $request->instagram_tag
        ]);

        return response()->json(['message' => 'Ocorreu tudo bem, agora vc já pode ver suas imagens'], 200);
    }


}
