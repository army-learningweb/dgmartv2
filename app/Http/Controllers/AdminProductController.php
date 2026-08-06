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
        $products = Product::query()->with(['user:id,name', 'category:id,name', 'mainImage' => function ($query) {
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
    public function create()
    {
        $product_categories = ProductCategory::whereNot('id', 1)->get(['id', 'name', 'parent_id']);
        return Inertia::render("Admin/Product/Create", [
            "product_categories" => $product_categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => ["required","mimes:jpg,jpeg,png,avif,webp","max:20480"],
            'files.*' => ["mimes:jpg,jpeg,png,avif,webp","max:20480"],
            'name' => ["required", "min:2", "max:250", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u", "unique:products"],
            'desc' => ["required", "min:2", "max:250", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u", "unique:products"],
            'content' => ["required"],
            'category_id' => ["required"],
        ], [
            "category_id.required" => "Danh mục sản phẩm không được để trống.",
            "files.*" => "Lỗi ! không thể upload ảnh vui lòng kiểm tra lại định đạng hoặc kích cỡ File"
        ]);
        
        $parent_category_slug = ProductCategory::where('id', $validated['category_id'])->value("slug");
        $validated['slug'] = $parent_category_slug . "/" . Str::slug($validated['name']);
        $validated['user_id'] = Auth::user()->id;

        $new_product = Product::create($validated);

        // Ảnh chính
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $file_fullname = $file->getClientOriginalName();
            $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $file_ex = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
            $file_size = $file->getSize();
            $object_type = 'product';
            $role = 'main';
            $object_id = $new_product->id;
            $file_path = $file->storeAs("product/main", time() . "-" . $file_name . "." . $file_ex, "public");

            Media::create([
                'file_url' => $file_path,
                'file_name' => $file_fullname,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'role' => $role,
                'object_id' => $object_id
            ]);
        }

        // Ảnh phụ
        if ($request->hasFile('files')) {
            $files = $request->file('files');
            foreach ($files as $index => $file) {
                $file_fullname = $file->getClientOriginalName();
                $file_name = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $file_ex = pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION);
                $file_size = $file->getSize();

                $object_type = 'product';
                $role = 'sub';
                $object_id = $new_product->id;
                $file_order = $index;
                $file_path = $file->storeAs("product/sub", time() . "-" . $file_name . "." . $file_ex, "public");

                Media::create([
                    'file_url' => $file_path,
                    'file_name' => $file_fullname,
                    'file_size' => $file_size,
                    'object_type' => $object_type,
                    'role' => $role,
                    'object_id' => $object_id,
                    'order' => $file_order
                ]);
            }
        }

        // Ảnh nội dung chi tiết sản phẩm
        $pattern = '/<img[^>]+src=["\']([^"\']+)["\']/i';
        preg_match_all($pattern, $request->input('content'), $matches);
        $img_urls = $matches[1] ?? [];
        if (!empty($img_urls)) {
            $file_names = array_map(function ($url) {
                $file_name = basename($url);
                return "product/content/$file_name";
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
            foreach ($files as $file) {
                $path = $file->getRawOriginal('file_url');
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
                $file->delete();
            }
        }

        // Xóa sản phẩm
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
        $product_categories = ProductCategory::whereNot('id',1)->get(['id', 'name','parent_id']);
        $product = $product->with(['mainImage' => function ($query) use ($product) {
            $query->where('object_type', 'product')
                ->where('object_id', $product->id)
                ->where('role','main')
                ->select(['id','file_url','file_name','object_id']);
        }
        , 'medias' => function($query) use ($product){
            $query->where('object_type', 'product')
            ->where('object_id', $product->id)
            ->where('role','sub')
            ->select(['id','file_url','file_name','object_id']);
        }])->first();

        $sub_media = Media::where('object_id', $product->id)
            ->where('object_Type', 'product')
            ->where('role', 'sub')
            ->get(['id','order']);

        return Inertia::render("Admin/Product/Edit", [
            'product_categories' => $product_categories,
            'product' => $product,
            'sub_media' => $sub_media
        ]);
    }

    public function update(Request $request, Product $product)
    {
        return $request->all();
        $rule_file = ["nullable"];
        if ($request->input('file_id') == null && $request->file("file") == null) {
            $rule_file = ["required", "mimes:jpg,jpeg,png,avif,webp", "max:20480"];
        }
        $validated = $request->validate([
            "file" => $rule_file,
            "name" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u"],
            "desc" => ["required", "min:2", "max:255", "regex:/^[\p{L}\p{P}\p{N}\s]+$/u"],
            "content" => ["required"],
            "category_id" => ["required"]
        ], [
            "category_id.required" => "Danh mục sản phẩm không được để trống."
        ]);

        $validated["status"] = $request->input('status');
        $parent_category_slug = ProductCategory::where('id', $request->input('category_id'))->value('slug');
        $validated["slug"] = $parent_category_slug . "/" . Str::slug($request->input('name'));
        $validated["updated_at"] = now();
        $product->update($validated);

        // Xử lí ảnh chính
        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("product/main", $file_url, "public");
            $object_id = $product->id;
            $object_type = "product";
            $role = "main";

            $old_file = Media::where('object_type', 'product')
                ->where('object_id', $product->id)
                ->where('role', 'main')
                ->first();

            if ($old_file) {
                $old_file_path = $old_file->getRawOriginal('file_url');
                if (Storage::disk("public")->exists($old_file_path)){
                    Storage::disk("public")->delete($old_file_path);
                } 
                $old_file->delete();
            }

            Media::create([
                'file_url' => $file_path,
                'file_name' => $file_name,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'role' => $role
            ]);
        }

        Media::where('object_id', $product->id)
            ->where('object_type', 'product')
            ->where('role', 'content')
            ->update([
                'object_id' => null
            ]);

        // Xử lí ảnh trong nội dung
        preg_match_all('/<img[^>]+src="([^">]+)"/i', $validated['content'], $matches);
        $img_urls = $matches[1] ?? [];

        if (!empty($img_urls)) {
            $file_names = array_map(function ($url) {
                $file_name = basename($url);
                return "product/content/$file_name";
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

    public function getConfigs(ProductConfigType $type)
    {
        return response()->json($type);
    }
}
