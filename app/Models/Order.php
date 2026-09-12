<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'code',
        'shipping_address',
        'shipping_note',
        'qty',
        'total',
        'payment_method',
        'status_payment',
        'status_shipping',
        'customer_id',
        'created_at',
        'updated_at',
    ];

    public function casts() : array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }
}
