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
        Schema::create('product_config_type_maps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('type_id')->constrained('product_config_types')->onDelete('cascade');
            $table->foreignId('config_id')->constrained('product_configs')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_config_type_maps');
    }
};
