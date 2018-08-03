<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;


class SalesControl extends Model
{
    //
    protected $fillable = [
        'sales_shifts_id',
        'payment_service_id',
        'payment_method_id',
        'cupons_id',
        'code',
        'opening_date',
        'closing_date',
        'total_price',
        'discount_price',
        'final_price',
        'created_by',
        'closed_by',
        'status'
    ];


    public function items(){
        return $this->hasMany(\App\Entities\SalesItem::class, 'sales_controls_id');
    }
    
    static function ReportsSalesDate( $between ) 
    {
        
        return self::whereBetween('sales_controls.closing_date', $between) 
            ->join('payment_services as payment', 'sales_controls.payment_service_id', '=', 'payment.id')
            ->select('payment.name', 'sales_controls.*')
            ->get();
    }

    static function ReportsSalesId( $collection ) 
    {

        return self::whereIn('payment_service_id', $collection)
            ->join('payment_services as payment', 'sales_controls.payment_service_id', '=', 'payment.id')
            ->select('payment.name', 'sales_controls.*')
            ->get();

    }

    static function ReportsSalesAll( $items )
    {   

        extract( $items );

        return self::whereIn('payment_service_id', $collection)
            ->whereBetween('sales_controls.closing_date', $between)
            ->join('payment_services as payment', 'sales_controls.payment_service_id', '=', 'payment.id')
            ->select('payment.name', 'sales_controls.*')
            ->get();

    }

    static function ReportsCommandsDate( $between ) 
    {

        return self::whereBetween('sales_controls.closing_date', $between)
            ->join('sales_shifts as shift', 'sales_controls.sales_shifts_id', '=', 'shift.id')
            ->select('shift.name', 'sales_controls.*')
            ->get();

    }

    static function ReportsCommandsId( $collection ) 
    {

        return self::whereIn('sales_shifts_id', $collection)
            ->join('sales_shifts as shift', 'sales_controls.sales_shifts_id', '=', 'shift.id')
            ->select('shift.name', 'sales_controls.*')
            ->get();

    }

    static function ReportsCommandsAll( $items )
    {   

        extract( $items );

        return self::whereIn('sales_shifts_id', $collection)
            ->whereBetween('sales_controls.closing_date', $between)
            ->join('sales_shifts as shift', 'sales_controls.sales_shifts_id', '=', 'shift.id')
            ->select('shift.name', 'sales_controls.*')
            ->get();

    }


}
