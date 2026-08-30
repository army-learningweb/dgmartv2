<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariantConfig extends Model
{
    public function configDetail (){
        return $this->belongsTo(ProductConfig::class, 'config_id');
    }
}
