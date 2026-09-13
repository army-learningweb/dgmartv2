<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductSearchResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'price' => $this->basePrice ? $this->basePrice->price : 0,
            'price_discount' => $this->basePrice ? $this->basePrice->price_discount : 0,
            'image' => $this->mainImage->file_url,
            'image_alt' => $this->mainImage->file_name
        ];
    }
}
