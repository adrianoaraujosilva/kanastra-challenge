<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Boletos extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "government_id",
        "email",
        "debtAmount",
        "debtDueDate",
        "debt_id",
        "isPaid"
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
