<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductConfig;
use App\Models\ProductConfigGroup;

class AdminProductConfigController extends Controller
{
    // Đọc
    public function read()
    {
        $configs = ProductConfig::with('group:id,name')->get()->groupBy(function($value){
            return $value->group->name;
        });

        $total = ProductConfig::count();
        $groupConfigs = ProductConfigGroup::get(['id','name']);

        return Inertia::render("Admin/Product/ReadConfig", [
            'configs' => $configs,
            'total' => $total,
            'groupConfigs' => $groupConfigs
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                "group_id" => ["required", "exists:product_config_groups,id"],
                "name" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_configs"],
            ],
            [
                "name.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
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
    public function update(Request $request, ProductConfig $config) {
        $validated = $request->validate(
            [
                "group_id" => ["required", "exists:product_config_groups,id"],
                "name" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_configs,id,".$config->id],
            ],
            [
                "name.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
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
    public function delete(ProductConfig $config) {
        $config->delete();
    }
}
