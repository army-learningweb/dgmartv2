<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function read(){

        $new_products = Product::with(['user:id,name', 'category:id,name', 'basePrice:product_id,id,price,discount,price_discount' , 'mainImage' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'product')
                ->where('role', 'main');
        }])
            ->latest()
            ->take(10)
            ->get(['id', 'name', 'desc', 'status', 'user_id', 'category_id', 'slug']);

        return Inertia::render('Client/Home/Read', [
            'new_products' => $new_products
        ]);
    }
}
