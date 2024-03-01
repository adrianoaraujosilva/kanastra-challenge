<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Boleto extends Model
{
    use HasFactory;

    protected $primaryKey  = "debt_id";
    protected $keyType     = "string";

    protected $fillable = [
        "debt_id",
        "name",
        "government_id",
        "email",
        "debt_amount",
        "debt_due_date",
        "is_paid"
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->debt_id = $model->debt_id ?? Str::uuid();
        });
    }
}
