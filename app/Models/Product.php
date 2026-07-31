<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'code',
        'name',
        'desc',
        'slug',
        'qty_stock',
        'qty_sale',
        'content',
        'price',
        'disscount',
        'disscount_price',
        'status',
        'category_id',
        'user_id',
        'created_at',
        'updated_at'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function medias(){
        return $this->belongsToMany(Media::class, 'object_id');
    }

    public function category(){
        return $this->belongsTo(ProductCategory::class);
    }
}
