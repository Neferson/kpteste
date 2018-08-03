<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Session;

class DashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $session = Session::all();
        return view('admin_master', compact('session'));
    }

    public function session(Request $request)
    {
        dd( $request->session() );
    }
}
