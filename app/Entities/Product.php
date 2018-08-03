<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $fillable = [
        'name',
        'slug',
        'category_id',
        'measurement',
        'amount',
        'obs',
        'status'
    ];
}
