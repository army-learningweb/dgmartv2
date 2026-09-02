<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductVariantResource extends JsonResource
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
            'discount' => $this->discount,
            'price' => $this->price,
            'price_discount' => $this->price_discount,
            'main_image' => $this->mainImage?->file_url,
            'name' => $this->info->name,
            'desc' => $this->info->desc,
            'slug' => $this->info->slug,
            'category_id' => $this->info->category_id,
            'configs' => $this->configs->map(fn($config) => [
                'name' => $config->configDetail->name,
            ]),
        ];
    }
}
