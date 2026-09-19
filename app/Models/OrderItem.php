<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'variant_id',
        'qty',
        'price',
        'total',
        'created_at',
        'updated_at'
    ];

    public function casts(): array
    {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }

    public function product(){
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function variant(){
        return $this->belongsTo(ProductVariant::class, 'variant_id');
    }
}
