<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /*
    * sobrescreve o método nativo de logout para adicionar algumas regras
    * usei essa forma pois é a mais simples e objetiva, caso querira escalar a velocidade
    * devemos adicionar o parametro de usuário logado para algum tipo de bando de dados NoSql como o redis
    */
    public function logout(Request $request)
    {
        
        // atualiza tabela mostrando que usuário está deslogado
        User::where(['id' =>  Auth::user()->id])->update(['logged_in' => false]);

        // realiza o logout do usuário
        Auth::logout();

        // apaga toda a sessão do usuário
        $request->session()->flush();

        
        return redirect("/login");
    }

}
