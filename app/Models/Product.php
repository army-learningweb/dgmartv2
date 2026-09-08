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

    // Người tạo
    public function user(){
        return $this->belongsTo(User::class);
    }

    // Danh mục
    public function category(){
        return $this->belongsTo(ProductCategory::class);
    }

    // Toàn bộ ảnh
    public function medias(){
        return $this->hasMany(Media::class, 'object_id')->where('object_type','product');
    }

    // Ảnh chính
    public function mainImage(){
        return $this->hasOne(Media::class, 'object_id')->where('role','main')->where('object_type','product');
    }

    // Ảnh phụ
    public function childsImage(){
        return $this->hasMany(Media::class, 'object_id')->where('role','sub')->where('object_type', 'product')->orderBy('order','asc');
    }

    // Giá phiên bản mặc định
    public function basePrice(){
        return $this->hasOne(ProductVariant::class, 'product_id')->where('is_default','default');
    }

    // Biến thể
    public function variants(){
        return $this->hasMany(ProductVariant::class, 'product_id');
    }
}
