<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            'category_id' => $this->category_id,
            'name' => $this->name,
            'desc' => $this->desc,
            'image' => $this->mainImage,
            'childs_image' => $this->childsImage,
            'content' => $this->content,
            'variants' => $this->variants->map(fn($variant) => [
                'id' => $variant->id,
                'code' => $variant->code,
                'price' => $variant->price,
                'discount' => $variant->discount,
                'price_discount' => $variant->price_discount,
                'qty' => $variant->qty,
                'sold' => $variant->sold,
                'configs' => $variant->configs
                    ->sortByDesc(fn($config) => $config->configDetail->name)->values()
                    ->map(fn($config) => [
                    'label' => $config->configDetail->group->name,
                    'name' => $config->configDetail->name
                ])
            ])
        ];
    }
}
