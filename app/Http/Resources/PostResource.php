<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
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
            'title' => $this->title,
            'desc' => $this->desc,
            'slug' => $this->slug,
            'image' => $this->media->file_url,
            'image_alt' => $this->media->file_name,
            'content' => $this->content,
            'created_at' => $this->created_at->format("d/m")
        ];
    }
}
