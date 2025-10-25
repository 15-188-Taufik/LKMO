<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use SoftDeletes;
    protected $fillable =[
        'product_id',
        'user_id',
    ];
}
