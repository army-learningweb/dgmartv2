<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductSearchResource;
use App\Models\Product;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    // Lấy sản phẩm tìm kiếm
    public function getProductSearch(Request $request){
        $querySearch = $request->input('search');

        $products = '';
        if($querySearch != ''){
            $products = Product::with('mainImage', 'basePrice')
                ->whereHas('basePrice')
                ->where('name', 'like', "%{$querySearch}%")
                ->get(['id', 'name', 'slug']);
        }else{
            $products = Product::with('mainImage', 'basePrice')
                ->select(['id', 'name', 'slug'])
                ->inRandomOrder()
                ->take(6)
                ->get();
        }
        

        return response()->json(ProductSearchResource::collection($products));
    }
}
