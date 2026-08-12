<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'type_id',
        'code',
        'price',
        'discount',
        'price_discount',
        'qty',
        'qty_sold',
        'is_default',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected function cast():array{
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }

    public function mapConfigs() {
        return $this->belongsToMany(ProductVariantConfig::class, 'product_variant_configs', 'variant_id' , 'config_id');
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function mainImage(){
        return $this->hasOne(Media::class, 'object_id' ,'product_id')
        ->where('role','main');
    }

    public function configChecked(){
        return $this->hasMany(ProductVariantConfig::class, 'variant_id');
    }
}
