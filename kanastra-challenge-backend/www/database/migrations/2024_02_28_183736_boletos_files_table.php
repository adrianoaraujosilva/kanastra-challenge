<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("boletos_files", function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string("name", 100);
            $table->string("type", 30);
            $table->integer("size");
            $table->enum("status", ["Aguardando", "Processando", "Processado"])->default("Aguardando");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("boletos_files");
    }
};