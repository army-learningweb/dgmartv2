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
use App\Models\ProductVariantConfig;

class AdminProductVariantController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $variants = ProductVariant::query()
            ->when($request->input('sort_price'), function ($query,$value) {
                $query->orderBy('price', $value);
            })
            ->when($request->input('filter_role'), function ($query, $value) {
                $query->where('is_default', $value);
            })
            ->when($request->input('filter_product'), function ($query, $value) {
                $query->where('product_id', $value);
            })
            ->when($request->input('search'), function ($query, $value) {
                $products_search = Product::where('name','like',"%{$value}%")->get('id');
                $query->whereIn('product_id', $products_search);
            })
            ->with(['product:id,name', 'user:id,name', 'mainImage:file_url,file_name,object_id'])
            ->latest()
            ->paginate(5)
            ->withQueryString();
        
        $products = Product::latest()->take(5)->get(['id','name']);
        $total = ProductVariant::count();
        $default = ProductVariant::where('is_default','default')->count();
        $variant = ProductVariant::where('is_default','variant')->count();

        return Inertia::render("Admin/Product/ReadVariant", [
            'variants' => $variants,
            'products' => $products,
            'total' => $total,
            'defaultCount' => $default,
            'variant' => $variant,
            'sort_price' => $request->input('sort_price'),
            'filter_role' => $request->input('filter_role'),
            'filter_product' => $request->input('filter_product'),
            'search' => $request->input('search')
        ]);
    }

    // Thêm
    public function create()
    {
        $products = Product::with('category:id,name')
            ->get(['id', 'name', 'category_id'])
            ->groupBy(function ($products) {
                return $products->category->name;
            });
        $product_config_types = ProductConfigType::get(['id', 'name']);

        return Inertia::render("Admin/Product/CreateVariant", [
            'products' => $products,
            'productConFigTypes' => $product_config_types
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => ["required"],
            'code' => ["required", "min:2", "max:50", "regex:/^[A-Z0-9\p{P}]+$/", "unique:product_variants"],
            'qty' => ["required", "integer", "min:0", "max:999"],
            'price' => ["required", "integer", "min:1", "max:999999999"],
            'discount' => ["nullable", "integer", "min:0", "max:100"],
            'is_default' => ["required"],
            'config_id' => ["required", "array"],
            'type_id' => ["required"]
        ], [
            'product_id.required' => 'Chưa chọn sản phẩm.',
            'discount.max' => ':attribute tối đa :max%.',
            'discount.min' => ':attribute không hợp lệ.',
            'price.max' => ':attribute tối đa :max.',
            'price.min' => ':attribute tối thiểu :min.',
            'qty.max' => ':attribute tối đa :max.',
            'qty.min' => ':attribute tối thiểu :min.',
            'is_default.exists' => 'Sản phẩm đã có cấu hình mặc định.',
            'is_default.required' => 'Chưa chọn vai trò cho cấu hình.'
        ], [
            'discount' => 'Giảm giá',
            'config_id' => 'Cấu hình sản phẩm'
        ]);

        if ($validated['is_default'] === 'default') {
            $exists_default = ProductVariant::where('product_id', $validated['product_id'])->where('is_default', 'default')->exists();
            if ($exists_default) return back()->withErrors(['is_default' => 'Sản phẩm đã có cấu hình mặc định']);
        }

        if ($validated['discount'] > 0) {
            $validated['price_discount'] = $validated['price'] - (($validated['price'] / 100) * $validated['discount']);
        }

        $validated['user_id'] = Auth::id();
        $new_variant = ProductVariant::create($validated);
        $new_variant->mapConfigs()->attach($validated['config_id']);
    }

    // Sửa
    public function edit(ProductVariant $variant)
    {
        $products = Product::with('category:id,name')
            ->get(['id', 'name', 'category_id'])
            ->groupBy(function ($products) {
                return $products->category->name;
            });
        $product_config_types = ProductConfigType::get(['id', 'name']);
        $config_ids = ProductConfigTypeMap::where('type_id', $variant->type_id)->pluck('config_id');
        $dataConfig = ProductConfig::with('group:id,name')
            ->whereIn('id', $config_ids)
            ->get()
            ->groupBy(function ($value) {
                return $value->group->name;
            });

        $config_ids = ProductVariantConfig::where('variant_id', $variant->id)->pluck('config_id');
        $configChecked = ProductConfig::with('group:id,name')
            ->whereIn('id', $config_ids)
            ->get();
            
        return Inertia::render("Admin/Product/EditVariant", [
            'products' => $products,
            'productConFigTypes' => $product_config_types,
            'variant' => $variant,
            'dataConfig' => $dataConfig,
            'configChecked' => $configChecked
        ]);
    }

    public function update(Request $request, ProductVariant $variant)
    {
        $validated = $request->validate([
            'product_id' => ["required"],
            'code' => ["required", "min:2", "max:50", "regex:/^[A-Z0-9\p{P}]+$/", "unique:product_variants,id,".$variant->id],
            'qty' => ["required", "integer", "min:0", "max:999"],
            'price' => ["required", "integer", "min:1", "max:999999999"],
            'discount' => ["nullable", "integer", "min:0", "max:100"],
            'is_default' => ["required"],
            'config_id' => ["required", "array"],
            'type_id' => ["required"]
        ], [
            'product_id.required' => 'Chưa chọn sản phẩm.',
            'discount.max' => ':attribute tối đa :max%.',
            'discount.min' => ':attribute không hợp lệ.',
            'price.max' => ':attribute tối đa :max.',
            'price.min' => ':attribute tối thiểu :min.',
            'qty.max' => ':attribute tối đa :max.',
            'qty.min' => ':attribute tối thiểu :min.',
            'is_default.exists' => 'Sản phẩm đã có cấu hình mặc định.',
            'is_default.required' => 'Chưa chọn vai trò cho cấu hình.'
        ], [
            'discount' => 'Giảm giá',
            'config_id' => 'Cấu hình sản phẩm'
        ]);

        if ($validated['discount'] > 0) {
            $validated['price_discount'] = $validated['price'] - (($validated['price'] / 100) * $validated['discount']);
        }
        $validated['updated_at'] = now();

        $variant->update($validated);
        $variant->mapConfigs()->sync($validated['config_id']);
    }

    // Xóa
    public function delete(ProductVariant $variant)
    {
        if (!$variant) return back()->withErrors("Lỗi, không thể xóa biến thể không tồn tại !");
        $variant->delete();
    }

    // Lấy cấu hình
    public function getConfigs(ProductConfigType $type)
    {
        $config_ids = ProductConfigTypeMap::where('type_id', $type->id)->pluck('config_id');
        $configs = ProductConfig::with('group:id,name')
            ->whereIn('id', $config_ids)
            ->get()
            ->groupBy(function ($value) {
                return $value->group->name;
            });

        return response()->json($configs);
    }
}
