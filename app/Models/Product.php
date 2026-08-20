<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'desc',
        'slug',
        'content',
        'status',
        'category_id',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected function casts() : array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y',
        ];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(ProductCategory::class);
    }

    public function medias(){
        return $this->hasMany(Media::class, 'object_id');
    }

    public function mainImage(){
        return $this->hasOne(Media::class, 'object_id');
    }

    public function basePrice(){
        return $this->hasOne(ProductVariant::class, 'product_id')->where('is_default','default');
    }
}
