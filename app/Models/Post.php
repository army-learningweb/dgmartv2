<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'desc',
        'slug',
        'status',
        'content',
        'user_id',
        'category_id',
        'created_at',
        'updated_at'
    ];

    public function casts(): array{
        return[
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function category(){
        return $this->belongsTo(PostCategory::class);
    }

    public function media(){
        return $this->hasOne(Media::class, 'object_id');
    }
}
