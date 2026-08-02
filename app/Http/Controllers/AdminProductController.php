<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Media;
use App\Models\ProductConfigType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class AdminProductController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $products = Product::query()->with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
            ->where('object_type', 'product')
            ->where('role','main');
        }])
            ->when($request->input('search'), function ($query, $value) {
                $query->where('name', 'like', "%{$value}%");
            })
            ->when($request->input('filter'), function ($query, $value) {
                $query->where('status', $value);
            })
            ->select(['id', 'name', 'desc', 'status', 'user_id', 'category_id', 'created_at', 'slug'])
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $total = Product::count();
        $active = Product::where('status', 'active')->count();
        $inactive = Product::where('status', 'inactive')->count();

        return Inertia::render("Admin/Product/Read", [
            'products' => $products,
            'total' => $total,
            'active' => $active,
            'inactive' => $inactive,
            'filter' => $request->input('filter'),
            'search' => $request->input('search')
        ]);
    }

    // Thêm
    public function create(Request $request)
    {
        $product_categories = ProductCategory::whereNot('id',1)->get(['id', 'name', 'parent_id']);
        return Inertia::render("Admin/Product/Create", [
            "product_categories" => $product_categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "file" => ["required", "mimes:jpg,jpeg,png,avif,webp", "max:20480"],
            "title" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u"],
            "desc" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u"],
            "content" => ["required"],
            "category_id" => ["required"]
        ], [
            "category_id.required" => "Danh mục bài viết không được để trống."
        ]);

        $validated["user_id"] = Auth::user()->id;
        $validated["status"] = $request->input('status');
        $parent_category_slug = ProductCategory::where('id', $request->input('category_id'))->value('slug');
        $validated["slug"] = $parent_category_slug . "/" . Str::slug($request->input('title'));
        $new_product = ProductCategory::create($validated);

        // Xử lí ảnh bìa
        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("post", $file_url, "public");
            $object_id = $new_product->id;
            $object_type = "post";
            $role = "main";

            Media::create([
                'file_url' => asset('storage/' . $file_path),
                'file_name' => $file_name,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'role' => $role
            ]);
        }

        // Xử lí ảnh trong nội dung
        preg_match_all('/<img[^>]+src="([^">]+)"/i', $validated['content'], $matches);
        $img_urls = $matches[1] ?? [];

        if (!empty($img_urls)) {
            $file_names = array_map(function ($url) {
                $file_name = basename($url);
                return asset("/storage/product/$file_name");
            }, $img_urls);

            Media::whereIn('file_url', $file_names)
                ->whereNull('object_id')
                ->where('object_type', 'product')
                ->where('role', 'content')
                ->update([
                    'object_id' => $new_product->id,
                    'updated_at' => now()
                ]);
        }
    }

    // Xóa
    public function delete(Request $request, Product $product)
    {
        // Xóa file
        $files = Media::where('object_id', $product->id)->where('object_type', 'product')->get();
        if ($files) {
            foreach($files as $file){
                $path = str_replace(asset('/storage'), '', $file->file_url);
                if (Storage::disk('public')->exists($path)){
                    Storage::disk('public')->delete($path);
                }
                $file->delete();
            }
        }
        // Xóa bài viết
        $product->delete();

        if ($request->input('product_on_page') === 1) {
            $current_page = (int) $request->input('current_page') - 1;
            return redirect("/admin/product?page={$current_page}");
        }

        return redirect("/admin/product?page={$request->input('current_page')}");
    }

    // Sửa
    public function edit(Product $product)
    {

        $product_categories = ProductCategory::get(['id', 'name']);
        $product = $product->with(['media' => function($querry){
            $querry->where('object_type','product')
            ->where('role','main');
        }])->first();

        return Inertia::render("Admin/Product/Edit", [
            'product_categories' => $product_categories,
            'product_info' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {

        $rule_file = ["nullable"];
        if ($request->input('file_id') == null && $request->file("file") == null) {
            $rule_file = ["required", "mimes:jpg,jpeg,png,avif,webp", "max:20480"];
        }
        $validated = $request->validate([
            "file" => $rule_file,
            "title" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u"],
            "desc" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u"],
            "content" => ["required"],
            "category_id" => ["required"]
        ], [
            "category_id.required" => "Danh mục bài viết không được để trống."
        ]);

        $validated["status"] = $request->input('status');
        $parent_category_slug = ProductCategory::where('id', $request->input('category_id'))->value('slug');
        $validated["slug"] = $parent_category_slug . "/" . Str::slug($request->input('title'));
        $validated["updated_at"] = now();
        $product->update($validated);

        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("product", $file_url, "public");
            $object_id = $product->id;
            $object_type = "product";
            $role = "main";

            $old_file = Media::where('object_type', 'product')->where('object_id', $product->id)->first();
            if ($old_file) {
                $old_file_path = str_replace(asset('/storage'), '', $old_file->file_url);
                if (Storage::disk("public")->exists($old_file_path)) Storage::disk("public")->delete($old_file_path);
                $old_file->delete();
            }

            Media::create([
                'file_url' => asset('storage/' . $file_path),
                'file_name' => $file_name,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'role' => $role
            ]);
        }

        Media::where('object_id',$product->id)
        ->where('object_type','product')
        ->where('role','content')
        ->update([
            'object_id' => null
        ]);

        // Xử lí ảnh trong nội dung
        preg_match_all('/<img[^>]+src="([^">]+)"/i', $validated['content'], $matches);
        $img_urls = $matches[1] ?? [];

        if (!empty($img_urls)) {
            $file_names = array_map(function ($url) {
                $file_name = basename($url);
                return asset("/storage/product/$file_name");
            }, $img_urls);

            Media::whereIn('file_url', $file_names)
                ->whereNull('object_id')
                ->where('object_type', 'product')
                ->where('role', 'content')
                ->update([
                    'object_id' => $product->id,
                    'updated_at' => now()
                ]);
        }
    }

    public function getConfigs(Request $request, ProductConfigType $type){

        return response()->json($type);
    }
}
