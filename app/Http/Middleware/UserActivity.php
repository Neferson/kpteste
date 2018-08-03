<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Cache;
use App\User;
use Carbon\Carbon;
use Session;


/*
* Esse Middleware será responsável por atualizar usuário logado
* usei essa forma pois se torna mais simples a manutenabilidade
* devemos adicionar o parametro de usuário logado para algum tipo de bando de dados NoSql como o redis
* caso queiramos otimizar a velocidade
*/
class UserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
       
        if( Auth::guard()->check() ){
            User::where(['id' => Auth::user()->id])->update(['logged_in' => true]);
        }
        
        return $next($request);
    }
}
