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
        Schema::create("boletos", function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("name", 150);
            $table->bigInteger("governmentId");
            $table->string("email", 150);
            $table->decimal("debtAmount", 15, 4);
            $table->date("debtDueDate");
            $table->uuid("debtId");
            $table->enum(
                "bank_slip_status",
                [
                    "Pendente",
                    "Na fila",
                    "Enviado",
                    "Erro no envio"
                ]
            )->default("Pendente");
            $table->boolean("is_paid")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists("boletos");
    }
};
