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
            $table->id();
            $table->string("name", 100);
            $table->bigInteger("government_id");
            $table->string("email", 100);
            $table->double("debtAmount", 2);
            $table->dae("debtDueDate");
            $table->uuid("debt_id");
            $table->boolean("isPaid")->default(false);
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
