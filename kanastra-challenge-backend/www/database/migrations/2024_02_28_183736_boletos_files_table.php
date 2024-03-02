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
            $table->string("type", 20);
            $table->string("size", 20);
            $table->string("process_time", 20)->nullable();
            $table->enum(
                "status",
                [
                    "Na fila",
                    "Processando",
                    "Processado",
                    "Erro no processamento"
                ]
            )->default("Na fila");
            $table->string("name_temp", 100);
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
