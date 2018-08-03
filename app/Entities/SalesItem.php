<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class SalesItem extends Model
{
    //
    protected $fillable = [
         'sales_controls_id',
         'products_id',
         'products_name',
         'products_price',
         'unit_price',
         'qtd'
    ];

    public function salesControls(){
        return $this->belongsTo(SalesControl::class);
    }
}
