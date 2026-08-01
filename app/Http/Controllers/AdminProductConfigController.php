<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductConfig;

class AdminProductConfigController extends Controller
{
    // Đọc
    public function read()
    {
        $configs = ProductConfig::all()->groupBy('group');
        $total = ProductConfig::count();
        return Inertia::render("Admin/Product/ReadConfig", [
            'configs' => $configs,
            'total' => $total
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                "group" => ["required", "min:2", "max:50", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u"],
                "name" => ["required", "min:2", "max:50", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_configs"],
                "price_include" => ["nullable", "regex:/^[\p{N}]+$/"],
            ],
            [
                "name.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
                "group.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự"
            ],
            [
                "name" => "Cấu hình",
                "group" => "Nhóm cấu hình",
                "price_include" => "Giá"
            ]
        );
        
        $validated['name'] = ucfirst($request->input('name'));
        $validated['group'] = ucfirst(strtolower($request->input('group')));

        if($validated['price_include'] == 0) $validated['price_include'] = null;

        ProductConfig::create($validated);
    }

    // Sửa
    public function update(Request $request, ProductConfig $config) {
        $validated = $request->validate(
            [
                "group" => ["required", "min:2", "max:50", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u"],
                "name" => ["required", "min:2", "max:50", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_configs,id,".$config->id],
                "price_include" => ["nullable", "regex:/^[\p{N}]+$/"],
            ],
            [
                "name.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
                "group.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự"
            ],
            [
                "name" => "Cấu hình",
                "group" => "Nhóm cấu hình",
                "price_include" => "Giá"
            ]
        );

        $validated['name'] = ucfirst($request->input('name'));
        $validated['group'] = ucfirst(strtolower($request->input('group')));
        $validated['updated_at'] = now();

        $config->update($validated);
    }

    // Xóa
    public function delete(ProductConfig $config) {
        $config->delete();
    }
}
