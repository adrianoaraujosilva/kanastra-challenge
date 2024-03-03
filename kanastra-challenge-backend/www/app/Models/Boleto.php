<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Boleto extends Model
{
    use HasFactory;

    protected $primaryKey  = "debtId";
    protected $keyType     = "string";

    protected $fillable = [
        "debtId",
        "name",
        "governmentId",
        "email",
        "debtAmount",
        "debtDueDate",
        "bank_slip_status",
        "is_paid"
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->debt_id = $model->debt_id ?? Str::uuid();
        });
    }
}
