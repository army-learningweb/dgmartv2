<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class HomeController extends Controller
{
    public function read(){

        // new product
        $new_products = Product::with([ 
        'mainImage' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'product')
                ->where('role', 'main');
        }, 
        'basePrice' => function ($query){
            $query->select(['product_id','id','price','discount','price_discount']);
        }])
            ->whereHas('basePrice', function ($query) {
                $query->whereNull('discount');
                
            })
            ->latest()
            ->take(10)
            ->get(['id', 'name', 'desc', 'category_id', 'slug']);

        // discount product
        $discount_products = Product::with([
        'mainImage' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'product')
                ->where('role', 'main');
        }, 
        'basePrice' => function ($query){
            $query->select(['product_id','id','price','discount','price_discount']);
        }])
            ->whereHas('basePrice', function ($query) {
                $query->whereNotNull('discount');
                
            })
            ->take(10)
            ->get(['id', 'name', 'desc', 'category_id', 'slug']);
           

        $posts = Post::with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'post')
                ->where('role', 'main');
        }])
            ->latest()
            ->take(6)
            ->get(['id', 'title', 'desc', 'user_id', 'category_id', 'created_at', 'slug']);

        return Inertia::render('Client/Home/Read', [
            'new_products' => $new_products,
            'discount_products' => $discount_products,
            'posts' => $posts
        ]);
    }
}
