<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductSliderResource extends JsonResource
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
            'slug' => $this->slug,
            'name' => $this->name,
            'desc' => $this->desc,
            'image' => $this->mainImage,
            'variants' => $this->variants
                ->where('is_default','default')
                ->map(fn($variant) => [
                    'price' => $variant->price,
                    'price_discount' => $variant->price_discount,
                    'discount' => $variant->discount,
                    'qty' => $variant->qty
            ])
        ];
    }
}
