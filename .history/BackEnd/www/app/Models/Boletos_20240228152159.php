<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
