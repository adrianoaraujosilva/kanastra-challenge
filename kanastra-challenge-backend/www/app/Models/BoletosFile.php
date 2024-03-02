<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class BoletosFile extends Model
{
    use HasFactory;

    protected $keyType = "string";

    protected $fillable = [
        "name",
        "type",
        "size",
        "process_time",
        "status",
        "name_temp"
    ];

    public static function booted()
    {
        static::creating(function ($model) {
            $model->id = Str::uuid();
        });
    }
}
