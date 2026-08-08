<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductConfig;
use App\Models\ProductConfigType;
use App\Models\ProductConfigTypeMap;

class AdminProductVariantController extends Controller
{
    // Đọc
    public function read(){
        return Inertia::render("Admin/Product/ReadVariant");
    }

    public function create(){
        $products = Product::with('category:id,name')
        ->get(['id','name','category_id'])
        ->groupBy(function($products){
            return $products->category->name;
        });

        $product_config_types = ProductConfigType::get(['id','name']);

        return Inertia::render("Admin/Product/CreateVariant", [
            'products' => $products,
            'productConFigTypes' => $product_config_types
        ]);
    }

    // Thêm
    public function store(){}

    // Sửa
    public function update(){}

    // Xóa
    public function delete(){}

    // Lấy cấu hình
    public function getConfigs(ProductConfigTypeMap $type)
    {
        $config_ids = ProductConfigTypeMap::where('type_id',$type->id)->pluck('config_id');
        $configs = ProductConfig::whereIn('id',$config_ids)
        ->get()
        ->groupBy('group');
        return response()->json($configs);
    }
}
