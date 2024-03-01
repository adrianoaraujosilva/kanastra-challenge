<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model;

class BoletoMongoDB extends Model
{
    use HasFactory;

    protected  $connection = 'mongodb';

    protected  $collection = 'boletos';

    protected $fillable = [
        "name",
        "governmentId",
        "email",
        "debtAmount",
        "debtDueDate",
        "debtId",
    ];
}
