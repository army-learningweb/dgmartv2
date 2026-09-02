<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductConfig;
use App\Models\ProductConfigGroup;
use App\Models\ProductConfigType;

class AdminProductConfigController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $configs = ProductConfig::query()
            ->when($request->input('search'), function ($query, $value) {
                $query->where('name', 'like', "%$value%");
            })
            ->when($request->input('group'), function ($query, $value) {
                $query->where('group_id', $value);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        $configs_suggest = ProductConfig::latest()->take(5)->get(['id', 'name']);
        $groupConfigs = ProductConfigGroup::get(['id', 'name']);
        $total = ProductConfig::count();
        return Inertia::render("Admin/Product/ReadConfig", [
            'configs' => $configs,
            'total' => $total,
            'groupConfigs' => $groupConfigs,
            'search' => $request->input('search'),
            'group' => $request->input('group'),
            'configs_suggest' => $configs_suggest,
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                "group_id" => ["required", "exists:product_config_groups,id"],
                "name" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\p{M}\+\<\>\s]+$/u", "unique:product_configs"],
            ],
            [
                "name.regex" => ":attribute chứa kí tự không hợp lệ",
            ],
            [
                "name" => "Cấu hình",
                "group_id" => "Nhóm cấu hình",
            ]
        );
        $validated['name'] = ucfirst($request->input('name'));
        ProductConfig::create($validated);
    }

    // Sửa
    public function update(Request $request, ProductConfig $config)
    {
        $validated = $request->validate(
            [
                "group_id" => ["required", "exists:product_config_groups,id"],
                "name" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\+\<\>\s]+$/u", "unique:product_configs,id," . $config->id],
            ],
            [
                "name.regex" => ":attribute chứa kí tự không hợp lệ",
            ],
            [
                "name" => "Cấu hình",
                "group_id" => "Nhóm cấu hình",
            ]
        );
        $validated['name'] = ucfirst($request->input('name'));
        $validated['updated_at'] = now();
        $config->update($validated);
    }

    // Xóa
    public function delete(ProductConfig $config)
    {
        $config->delete();
    }

    // Lấy cấu hình theo gợi ý tìm kiếm
    public function getConfigs(Request $request)
    {
        $query = $request->input('search');
        $configs = null;

        if($query == ''){
            $configs = ProductConfig::latest()->take(5)->get(['id', 'name']);
        }else{
            $configs = ProductConfig::where('name', 'like', "%{$query}%")->get(['id', 'name']);
        }
        
        return response()->json($configs);
    }
}
