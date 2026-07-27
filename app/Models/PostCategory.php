<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'status',
        'created_at',
        'user_id',
        'updated_at'
    ];

    protected function casts(): array
    {
        return [
            "created_at" => "datetime:d/m/Y",
            "updated_at" => "datetime:d/m/Y",
        ];
    }
}
