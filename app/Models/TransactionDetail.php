<?php

namespace App\Models;
use App\Casts\MoneyCast;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongTo;

class TransactionDetail extends Model
{
    use SoftDeletes;
    protected $fillable =[
        'price',
        'product_id',
        'transaction_id'
    ];
    protected $casts=[
        'price' => MoneyCast::class
    ];
    public function productTransactions(): BelongsTo {
        return $this->belongsTo(ProductTransactions::class);
    }
}
