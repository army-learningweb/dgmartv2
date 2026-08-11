<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductConfigGroup extends Model
{
    protected $fillable = [
        'name',
        'desc'
    ];

    protected function casts() : array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }
}
