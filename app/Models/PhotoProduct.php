<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PhotoProduct extends Model
{
    use SoftDeletes;
    protected $fillable =[
        'photo',
        'product_id'
    ];
}
