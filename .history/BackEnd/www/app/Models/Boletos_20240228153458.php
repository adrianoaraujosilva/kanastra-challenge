<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Boletos extends Model
{
    use HasFactory;

    protected $id = "debt_id";

    protected $fillable = [
        "debt_id",
        "name",
        "government_id",
        "email",
        "debtAmount",
        "debtDueDate",
        "isPaid"
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->debt_id = Str::uuid();
        });
    }
}
