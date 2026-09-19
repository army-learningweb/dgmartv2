<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminProductOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'order_id' => $this->order_id,
            'variant_id' => $this->variant_id,
            'qty' => $this->qty,
            'price' => $this->price,
            'total' => $this->total,
            'created_at' => $this->created_at,
            'product_image' => $this->product->mainImage->file_url,
            'product_image_alt' => $this->product->mainImage->file_name,
            'product_name' => $this->product->name,
            'variant_code' => $this->variant->code,
            'variant_price' => $this->variant->price,
            'variant_price_discount' => $this->variant->price_discount ?? 0,
            'variant_discount' => $this->variant->discount ?? 0,
            'configs' => $this->variant->configs->map(fn($config) => [
                'name' => $config->configDetail->name
            ])
        ];
    }
}
