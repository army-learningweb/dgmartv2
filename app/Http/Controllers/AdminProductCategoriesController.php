<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AdminProductCategoriesController extends Controller
{
    // Đọc
    public function read(){
        $categories = ProductCategory::with('childs')->where('parent_id',0)->get();
        $parent_categories = ProductCategory::where('parent_id',0)->where('id','>',1)->get(['id','name']);
        $total = ProductCategory::count();
        return Inertia::render("Admin/Category/ReadCategoriesProduct", [
            "categories" => $categories,
            "parent_categories" => $parent_categories,
            "total" => $total
        ]);
    }
    
    // Thêm
    public function store(Request $request){
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{P}\s]+$/u", "unique:post_categories"]
        ],[
            "name.required" => "Tên danh mục không được để trống.",
            "name.regex" => "Tên danh mục không hợp lệ, không chứa số."
        ]);
        $validated["slug"] = Str::slug($request->input('name'));
        $validated["status"] = $request->input('status');
        $validated["user_id"] = Auth::user()->id;
        $validated["parent_id"] = $request->input('parent_id');

        if($request->input('parent_id') !== "0"){
            $parent_slug = ProductCategory::where('id',$request->input('parent_id'))->value('slug');
            $validated["slug"] = $parent_slug ."/". Str::slug($request->input('name'));
        }

        ProductCategory::create($validated);
    }

    // Sửa
    public function update(Request $request, ProductCategory $category){
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\p{P}\s]+$/u", "unique:post_categories"]
        ],[
            "name.required" => "Tên danh mục không được để trống.",
            "name.regex" => "Tên danh mục không hợp lệ, không chứa số."
        ]);

        $validated["slug"] = Str::slug($request->input('name'));
        $validated["status"] = $request->input('status');
        $validated["parent_id"] = $request->input('parent_id') ?? 0;

        if($request->input('parent_id') != 0){
            $parent_slug = ProductCategory::where('id',$request->input('parent_id'))->value('slug');
            $validated["slug"] = $parent_slug ."/". Str::slug($request->input('name'));
        }
        $category->update($validated);
    }

    // Xóa
    public function delete(ProductCategory $category){

        if($category->id == 1) return back()->withErrors(['message' => 'Không thể xóa danh mục lưu trữ']);

        $childs = ProductCategory::where('parent_id',$category->id)->get(['name','id']);
        if($childs) {
            $system_slug = ProductCategory::where('id',1)->value('slug');
            foreach($childs as $child){
                ProductCategory::where('id', $child->id)->update([
                    'slug' => $system_slug."/".Str::slug($child->name),
                    'parent_id' => 1,
                    'updated_at' => now()
                ]);
            }
        }
        $category->delete();
    }
}
