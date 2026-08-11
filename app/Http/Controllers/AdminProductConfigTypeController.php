<?php

namespace App\Http\Controllers;

use App\Models\ProductConfig;
use App\Models\ProductConfigType;
use App\Models\ProductConfigTypeMap;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProductConfigTypeController extends Controller
{
    // Đọc
    public function read()
    {
        $configs = ProductConfig::with('group:id,name')
            ->get()
            ->groupBy(function ($value) {
                return $value->group->name;
            });

        $types = ProductConfigType::all();
        $total = ProductConfigType::count();
        return Inertia::render("Admin/Product/ReadConfigType", [
            'configs' => $configs,
            'types' => $types,
            'total' => $total
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\s]+$/u", "unique:product_config_types"],
            'desc' => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\s]+$/u"],
            'configs' => ["required", "array"]
        ], [
            'configs.required' => "Bạn chưa chọn cấu hình, hãy chọn ít nhất 1 đến 2 cấu hình cho loại này."
        ]);

        $new_type = ProductConfigType::create($validated);
        $new_type->mapToConfig()->attach($validated['configs']);
    }

    // Sửa
    public function update(Request $request, ProductConfigType $type)
    {
        $validated = $request->validate([
            'name' => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\s]+$/u", "unique:product_config_types,id," . $type->id],
            'desc' => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\s]+$/u"],
            'configs' => ["required", "array"]
        ], [
            'configs.required' => "Bạn chưa chọn cấu hình, hãy chọn ít nhất 1 đến 2 cấu hình cho loại này."
        ]);

        $type->update($validated);
        $type->mapToConfig()->sync($validated['configs']);
    }

    // Xóa
    public function delete(ProductConfigType $type)
    {
        $type->delete();
    }

    // get config
    public function getConfigs(ProductConfigType $type)
    {
        $config_ids = ProductConfigTypeMap::where('type_id', $type->id)->pluck('config_id');
        return response()->json($config_ids);
    }
}
