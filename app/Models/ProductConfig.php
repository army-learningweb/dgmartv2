<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductConfig extends Model
{
    protected $fillable = [
        'name',
        'price_include',
        'group',
        'created_at',
        'updated_at'
    ];

    protected function casts() : array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
        
    }
}
