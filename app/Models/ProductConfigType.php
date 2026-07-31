<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductConfigType extends Model
{
    protected $fillable = [
        'name',
        'desc',
        'created_at',
        'updated_at'
    ];

    protected function casts() : array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }

    public function mapToConfig(){
        return $this->belongsToMany(ProductConfig::class, 'product_config_type_maps', 'type_id', 'config_id');
    }
}
