<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductConfigGroup;

class AdminProductConfigGroupController extends Controller
{
     // Đọc
    public function read()
    {
        $configGroup = ProductConfigGroup::all();
        $total = ProductConfigGroup::count();
        return Inertia::render("Admin/Product/ReadConfigGroup", [
            'configGroup' => $configGroup,
            'total' => $total
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_config_groups"],
            "desc" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u"],
        ], [], [
            'name' => 'Tên nhóm'
        ]);

        $validated['name'] = ucfirst($validated['name']);
        $validated['desc'] = ucfirst($validated['desc']);

        ProductConfigGroup::create($validated);
    }

    // Sửa 
    public function update(Request $request, ProductConfigGroup $configGroup)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_config_groups,id,".$configGroup->id],
            "desc" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u"],
        ]);

        $validated['name'] = ucfirst($validated['name']);
        $validated['desc'] = ucfirst($validated['desc']);
        $validated['updated_at'] = now();

        $configGroup->update($validated);
        
    }

    // Xóa
    public function delete(ProductConfigGroup $configGroup)
    {
        if ($configGroup) {
            $configGroup->delete();
        }
    }
}
