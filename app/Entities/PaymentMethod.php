<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    //

    protected $fillable = [
         'title',
         'payment_service_id',
         'payment_day',
         'payment_pointer',
         'type',
         'taxa',
         'status'
    ];
}
