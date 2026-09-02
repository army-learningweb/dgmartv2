<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductConfigGroup;

class AdminProductConfigGroupController extends Controller
{
     // Đọc
    public function read(Request $request)
    {
        $configGroup = ProductConfigGroup::query()
        ->when($request->input('search'), function ($query, $value) {
            $query->where('name','like',"%{$value}%");
        })
        ->latest()
        ->paginate(10);
        
        $configGroupSuggest = ProductConfigGroup::latest()->take(5)->get(['id','name']);
        $total = ProductConfigGroup::count();

        return Inertia::render("Admin/Product/ReadConfigGroup", [
            'configGroup' => $configGroup,
            'total' => $total,
            'configGroupSuggest' => $configGroupSuggest,
            'search' => $request->input('search')
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u", "unique:product_config_groups"],
            "desc" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{N}\p{P}\s]+$/u"],
        ], [
            "desc.regex" => ":attribute không hợp lệ, không được chứa kí tự đặc biệt"
        ], [
            'name' => 'Tên nhóm',
            
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
        ], [
            "desc.regex" => ":attribute không hợp lệ, không được chứa kí tự đặc biệt"
        ], [
            'name' => 'Tên nhóm',

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

    // Lấy nhóm cấu hình theo gợi ý tìm kiếm
    public function getGroup(Request $request)
    {
        $query = $request->input('search');
        $configs = null;

        if ($query == '') {
            $configs = ProductConfigGroup::latest()->take(5)->get(['id', 'name']);
        } else {
            $configs = ProductConfigGroup::where('name', 'like', "%{$query}%")->get(['id', 'name']);
        }
        return response()->json($configs);
    }
}
