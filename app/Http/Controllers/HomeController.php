<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductVariantResource;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\ProductVariant;

class HomeController extends Controller
{
    public function read(){

        $onshop_products = ProductVariant::query()->with([
            'mainImage' => function ($query) {
                $query->select(['object_id', 'file_url', 'file_name']);
            },
            'info'
        ])
            ->select(['id', 'product_id', 'price', 'discount', 'price_discount'])
            ->where('is_default', 'default')
            ->where('discount', null)
            ->latest()
            ->take(10)
            ->get();

        $discount_products = ProductVariant::query()->with([
            'mainImage' => function ($query) {
                $query->select(['object_id', 'file_url', 'file_name']);
            },
            'info'
        ])
            ->select(['id', 'product_id', 'price', 'discount', 'price_discount'])
            ->where('is_default', 'default')
            ->where('discount', '!=' , null)
            ->latest()
            ->take(10)
            ->get();
           
        $posts = Post::with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'post')
                ->where('role', 'main');
        }])
            ->latest()
            ->take(10)
            ->get(['id', 'title', 'desc', 'user_id', 'category_id', 'created_at', 'slug']);

        return Inertia::render('Client/Home/Read', [
            'onshop_products' => ProductVariantResource::collection($onshop_products),
            'discount_products' => ProductVariantResource::collection($discount_products),
            'posts' => $posts
        ]);
    }
}
