<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = [
        'name',
        'desc',
        'created_at',
        'updated_at'
    ];

    protected function casts(): array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
    }

    public function permissions(){
        return $this->belongsToMany(Permission::class,'role_permissions');
    }
}
