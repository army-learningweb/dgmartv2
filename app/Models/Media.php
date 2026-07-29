<?php

namespace App\Models;

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
    ];
}
