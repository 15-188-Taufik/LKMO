<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongTo;
use App\Casts\MoneyCast;

class ProductTransaction extends Model
{
    use SoftDeletes;
    protected $fillable =[
        'product_id',
        'name',
        'transaction_id',
        'total_amount',
        'is_paid',
        'address',
        'proof',
        'city',
        'post_code',
        'phone_number',
        'notes'
    ];
    protected $casts=[
        'total_amount' => MoneyCast::class
    ];
    public static function generateUniqueTransactionId(){
        $prefix = "FSHN";
        do {
            $randomString = $prefix . mt_rand(1000,9999);
        } while (self::where('transaction-id', $randomString)->exists());
        return $randomString;
    }

    public function products(): BelongsTo {
        return $this->belongsTo(Product::class);
    }
}
