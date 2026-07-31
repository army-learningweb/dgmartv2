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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name');
            $table->string('desc');
            $table->string('slug');
            $table->integer('qty_stock')->default(0);
            $table->integer('qty_sale')->default(0);
            $table->string('content')->nullable();
            $table->integer('price');
            $table->integer('disscount')->nullable();
            $table->integer('disscount_price')->nullable();
            $table->enum('status',['active', 'inactive'])->default('active');
            $table->foreignId('category_id')->nullable()->constrained('product_categories')->onDelete('set null');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
