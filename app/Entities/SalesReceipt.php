<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;


class SalesReceipt extends Model
{
    //
    protected $fillable = [
        'sales_controls_id',
        'service_id',
        'method_id',
        'type_pay',
        'price'
    ];

}
