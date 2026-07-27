<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'status',
        'parent_id',
        'user_id',
        'created_at',
        'updated_at'
    ];

    protected function casts(): array
    {
        return [
            "created_at" => "datetime:d/m/Y",
            "updated_at" => "datetime:d/m/Y",
        ];
    }

    public function childs() {
        return $this->hasMany(ProductCategory::class, 'parent_id');
    }
}
