<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Casts\MoneyCast;
use Illuminate\Support\Str;
class Product extends Model
{
    use SoftDeletes;
    protected $fillable = [
       'name',
        'slug',
        'color',
        'variant',
        'price',
        'about'
    ];
    public function setNameAttribute($value){
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }
    protected $casts=[
        'price' => MoneyCast::class
    ];
    public function photos():HasMany {
        return $this->hasMany(PhotoProduct::class);
    }
}
