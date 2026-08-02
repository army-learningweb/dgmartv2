<?php

namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;

class AdminPostController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $posts = Post::query()->with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'post')
                ->where('role', 'main');
        }])
            ->when($request->input('search'), function ($query, $value) {
                $query->where('title', 'like', "%{$value}%");
            })
            ->when($request->input('filter'), function ($query, $value) {
                $query->where('status', $value);
            })
            ->select(['id', 'title', 'desc', 'status', 'user_id', 'category_id', 'created_at', 'slug'])
            ->latest()
            ->paginate(5)
            ->withQueryString();

        $total = Post::count();
        $active = Post::where('status', 'active')->count();
        $inactive = Post::where('status', 'inactive')->count();

        return Inertia::render("Admin/Post/Read", [
            'posts' => $posts,
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
        $post_categories = PostCategory::get(['id', 'name']);
        return Inertia::render("Admin/Post/Create", [
            "post_categories" => $post_categories
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
        $parent_category_slug = PostCategory::where('id', $request->input('category_id'))->value('slug');
        $validated["slug"] = $parent_category_slug . "/" . Str::slug($request->input('title'));
        $new_post = Post::create($validated);

        // Xử lí ảnh bìa
        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("post", $file_url, "public");
            $object_id = $new_post->id;
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
                return asset("/storage/post/$file_name");
            }, $img_urls);

            Media::whereIn('file_url', $file_names)
                ->whereNull('object_id')
                ->where('object_type', 'post')
                ->where('role', 'content')
                ->update([
                    'object_id' => $new_post->id,
                    'updated_at' => now()
                ]);
        }
    }

    // Xóa
    public function delete(Request $request, Post $post)
    {
        // Xóa file
        $files = Media::where('object_id', $post->id)->where('object_type', 'post')->get();
        if ($files) {
            foreach ($files as $file) {
                $path = str_replace(asset('/storage'), '', $file->file_url);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
                $file->delete();
            }
        }
        // Xóa bài viết
        $post->delete();

        if ($request->input('post_on_page') === 1) {
            $current_page = (int) $request->input('current_page') - 1;
            return redirect("/admin/posts?page={$current_page}");
        }

        return redirect("/admin/posts?page={$request->input('current_page')}");
    }

    // Sửa
    public function edit(Post $post)
    {

        $post_categories = PostCategory::get(['id', 'name']);
        $post = $post->with(['media' => function ($querry) {
            $querry->where('object_type', 'post')
                ->where('role', 'main');
        }])->first();

        return Inertia::render("Admin/Post/Edit", [
            'post_categories' => $post_categories,
            'post_info' => $post
        ]);
    }

    public function update(Request $request, Post $post)
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
        $parent_category_slug = PostCategory::where('id', $request->input('category_id'))->value('slug');
        $validated["slug"] = $parent_category_slug . "/" . Str::slug($request->input('title'));
        $validated["updated_at"] = now();
        $post->update($validated);

        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("post", $file_url, "public");
            $object_id = $post->id;
            $object_type = "post";
            $role = "main";

            $old_file = Media::where('object_id', $post->id)
                ->where('object_type', 'post')
                ->where('role', 'main')
                ->first();

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

        Media::where('object_id', $post->id)
            ->where('object_type', 'post')
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
                return asset("/storage/post/$file_name");
            }, $img_urls);

            Media::whereIn('file_url', $file_names)
                ->whereNull('object_id')
                ->where('object_type', 'post')
                ->where('role', 'content')
                ->update([
                    'object_id' => $post->id,
                    'updated_at' => now()
                ]);
        }
    }
}
