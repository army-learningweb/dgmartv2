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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('shipping_address');
            $table->string('shipping_note');
            $table->integer('qty');
            $table->integer('total');
            $table->enum('payment_medthod',['cod','bank','momo']);
            $table->enum('status_payment', ['unpaid', 'paid']);
            $table
            ->enum('status_shipping', ['awaiting','processing','shipped','delivery','deliveryfailed','delivered','canceled','refund'])
            ->default('awaiting');
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
