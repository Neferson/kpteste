<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class SalesShift extends Model
{
    //
    protected $fillable = [
         'user_id',
         'name',
         'opening_date',
         'closing_date',
         'status'
    ];


    public static function GetIdShifts( $str ) 
    {

        $data = parent::where('name', $str)->orderBy('id', 'asc')
        	->select('id')->get();

        return $data;

    }

}
