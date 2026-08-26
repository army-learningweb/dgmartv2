<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class ProductController extends Controller
{
    public function read(Request $request){

    // new product
        $products = Product::query()->with([
            'mainImage' => function ($query) {
                $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'product')
                ->where('role', 'main');
            },
            'basePrice' => function ($query){
                $query->select(['product_id','id','price','discount','price_discount']);
            }])
            // ->when($request->input('search'), function ($query, $value) {
            //     $query->where('name', 'like', "%{$value}%");
            // })
            // ->when($request->input('filter_status'), function ($query, $value) {
            //     $query->where('status', $value);
            // })
            // ->when($request->input('filter_category'), function ($query, $value) {
            //     $query->where('category_id', $value);
            // })
            ->select(['id', 'name', 'desc', 'status', 'created_at', 'slug'])
            ->latest()
            ->paginate(10)
            ->withQueryString();
            

        return Inertia::render('Client/Product/Read', [
            'products' => $products
        ]);
    }
}
