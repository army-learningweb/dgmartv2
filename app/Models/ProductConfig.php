<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductConfig extends Model
{
    protected $fillable = [
        'name',
        'group_id',
        'created_at',
        'updated_at'
    ];

    protected function casts() : array {
        return [
            'created_at' => 'datetime:d/m/Y',
            'updated_at' => 'datetime:d/m/Y'
        ];
        
    }

    public function group(){
        return $this->belongsTo(ProductConfigGroup::class, 'group_id');
    }

    // public function details(){
    //     return $this->
    // }


}
