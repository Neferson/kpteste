<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class DiscountCupon extends Model
{
    //
    protected $fillable = [
         'name',
         'code',
         'type',
         'value',
         'obs'
    ];
}
