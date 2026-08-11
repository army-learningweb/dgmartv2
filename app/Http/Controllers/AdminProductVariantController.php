<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\ProductConfig;
use App\Models\ProductConfigType;
use App\Models\ProductConfigTypeMap;
use App\Models\ProductVariant;

class AdminProductVariantController extends Controller
{
    // Đọc
    public function read(){
        $variants = ProductVariant::with(['product:id,name','user:id,name'])
        ->latest()
        ->paginate(8);
        
        return Inertia::render("Admin/Product/ReadVariant",[
            'variants' => $variants
        ]);
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
    public function store(Request $request){
        $validated = $request->validate([
            'product_id' => ["required"],
            'code' => ["required" ,"min:2", "max:50", "regex:/^[A-Z0-9\p{P}]+$/"],
            'qty' => ["required", "integer", "min:0", "max:999"],
            'price' => ["required", "integer", "min:1", "max:999999999"],
            'discount' => ["nullable", "integer", "min:0", "max:100"],
            'is_default' => ["required", "exists:product_variants,id",function($attribute, $value, $fail) use ($request) {
                if($value !== 'default') return;
                $exists_default_variant = ProductVariant::where('product_id',$request->input('product_id'))
                ->where('is_default','default')
                ->get();

                if($exists_default_variant){
                    $fail("Lỗi, sản phẩm này đã có cấu hình mặc định");
                }
            }],

            'config_id' => ["required", "array"]
        ],[
            'product_id.required' => 'Chưa chọn sản phẩm.',
            'discount.max' => ':attribute tối đa :max%.',
            'discount.min' => ':attribute không hợp lệ.',
            'price.max' => ':attribute tối đa :max.',
            'price.min' => ':attribute tối thiểu :min.',
            'qty.max' => ':attribute tối đa :max.',
            'qty.min' => ':attribute tối thiểu :min.',
            'is_default.exists' => 'Sản phẩm đã có cấu hình mặc định.',
            'is_default.required' => 'Chưa chọn vai trò cho cấu hình.'
        ],[
            'discount' => 'Giảm giá',
            'config_id' => 'Cấu hình sản phẩm'
        ]);

        if($validated['discount'] > 0) {
            $validated['price_discount'] = $validated['price'] - (($validated['price'] / 100) * $validated['discount']);
        }
        $validated['user_id'] = Auth::id();
        $new_variant = ProductVariant::create($validated);
        $new_variant->mapConfigs()->attach($validated['config_id']);
    }

    // Sửa
    public function update(){}

    // Xóa
    public function delete(ProductVariant $variant){
        if(!$variant) return back()->withErrors("Lỗi, không thể xóa biến thể không tồn tại !");
        $variant->delete();
    }

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
