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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('code');
            $table->integer('price');
            $table->integer('discount')->nullable();
            $table->integer('price_discount')->nullable();
            $table->integer('qty')->default(0);
            $table->integer('qty_sold')->default(0);
            $table->integer('qty_available')->default(0);
            $table->enum('is_default',['default','variant']);
            $table->enum('status',['active','inactive'])->default('active');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
