<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['middleware'=>['web']], function() {

    // telas de login serão mostradas acessando as rotas / ou /login
    Route::get('/', function () {
        return view('login');
    })->name('login');

    Route::get('/login', function () {
        return view('login');
    })->name('login');

    Route::post('login', 'Auth\LoginController@login');

    // grupo de rotas dentro da rota admin (somente administradores e criadores poderão acessar essa rota)
    // pois estarão protegidos por senha
    Route::group(['middleware' => ['auth']],  function () {

        // SAIR DO SISTEMA
        Route::post('logout', 'Auth\LoginController@logout')->name('logout');
    
        Route::get('/dashboard', 'UsersController@index')->name("dashboard");
        Route::post('/loggedin', 'UsersController@getLoggedinUsers')->name("get.loggedin.users");

        // instagram routes(
        Route::prefix("instagram")->group( function() {
            Route::get('/configuration', 'InstagramController@config')->name('insta-config');
            Route::get('/token', 'InstagramController@setToken')->name('insta-config-token');
            Route::post('/config', 'InstagramController@setConfiguration')->name('instagram-set-config');
            Route::get('/list' , 'InstagramController@index')->name('instagram-images-list');
        });

    });
});

