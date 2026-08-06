<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'file_url',
        'file_name',
        'file_size',
        'object_type',
        'object_id',
        'role',
        'created_at',
        'updated_at',
        'order'
    ];

    protected function fileUrl() : Attribute{
        return Attribute::make(
            get: fn ($value) => asset('storage/' . $value),
        );
    }
}
