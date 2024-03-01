<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BoletoTemp extends Model
{
    use HasFactory;

    protected $table  = "boletos_temp";
    protected $primaryKey = null;
    public $incrementing = false;

    protected $fillable = [
        "name",
        "governmentId",
        "email",
        "debtAmount",
        "debtDueDate",
        "debtId"
    ];
}
