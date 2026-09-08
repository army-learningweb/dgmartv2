<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\ProductSliderResource;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Product;

class HomeController extends Controller
{
    // Đọc
    public function read()
    {
        // Laptop
        $onshop_products = Product::with(['variants','mainImage'])
            ->where('slug','like',"%laptop%")
            ->latest()
            ->take(10)
            ->get();

        // Phụ kiện
        $accessories_products = Product::with(['variants', 'mainImage'])
            ->where('slug', 'like', "%phu-kien%")
            ->latest()
            ->take(10)
            ->get();

        // Bài viết & Tin tức
        $posts = Post::with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'post')
                ->where('role', 'main');
        }])
            ->latest()
            ->take(10)
            ->get(['id', 'title', 'desc', 'user_id', 'category_id', 'created_at', 'slug']);

        return Inertia::render('Client/Home/Read', [
            'onshop_products' =>  ProductSliderResource::collection($onshop_products),
            'accessories_products' => ProductSliderResource::collection($accessories_products),
            'posts' => PostResource::collection($posts)
        ]);
    }
}
