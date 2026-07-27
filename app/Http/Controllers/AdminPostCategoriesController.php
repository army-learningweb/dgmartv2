<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostCategory;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AdminPostCategoriesController extends Controller
{
    // Đọc
    public function read()
    {
        $categories = PostCategory::all();
        $total = PostCategory::count();
        return Inertia::render("Admin/Category/ReadCategoriesPost", [
            "categories" => $categories,
            "total" => $total
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{P}\s]+$/u", "unique:post_categories"]
        ],[
            "name.required" => "Tên danh mục không được để trống.",
            "name.regex" => "Tên danh mục không hợp lệ, không chứa số."
        ]);
        $validated["slug"] = Str::slug($request->input('name'));
        $validated["status"] = $request->input('status');
        $validated["user_id"] = Auth::user()->id;
        PostCategory::create($validated);
    }

    // Sửa
    public function update(Request $request, PostCategory $category) {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{P}\s]+$/u", "unique:post_categories,id,".$category->id]
        ],[
            "name.required" => "Tên danh mục không được để trống.",
            "name.regex" => "Tên danh mục không hợp lệ, không chứa số."
        ]);
        $validated["slug"] = Str::slug($request->input('name'));
        $validated["status"] = $request->input('status');
        $validated["updated_at"] = now();
        $category->update($validated);
    }

    // Xóa
    public function delete(PostCategory $category) {
        $category->delete();
    }
}
