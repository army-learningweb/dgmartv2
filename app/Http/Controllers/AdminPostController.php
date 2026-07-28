<?php

namespace App\Http\Controllers;

use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Media;
use BcMath\Number;
use Illuminate\Support\Facades\Storage;

class AdminPostController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $posts = Post::query()->with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])->where('object_type', 'post');
        }])
        ->when($request->input('search'), function($query,$value) {
            $query->where('title','like',"%{$value}%");
        })
        ->when($request->input('filter'), function($query,$value) {
            $query->where('status',$value);
        })
        ->select(['id', 'title', 'desc', 'status', 'user_id', 'category_id', 'created_at', 'slug'])
        ->paginate(5);

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
    public function create()
    {
        $post_categories = PostCategory::get(['id', 'name']);
        $total = PostCategory::count();
        return Inertia::render("Admin/Post/Create", [
            "post_categories" => $post_categories,
            "total" => $total,
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

        if ($request->hasFile("file")) {
            $file = $request->file("file");
            $file_size = $file->getSize();
            $file_name = $file->getClientOriginalName();
            $file_url = time() . "-" . Str::slug(pathinfo($file_name, PATHINFO_FILENAME)) . "." . pathinfo($file_name, PATHINFO_EXTENSION);
            $file_path = $file->storeAs("post", $file_url, "public");
            $object_id = $new_post->id;
            $object_type = "post";
            $is_main = 0;

            Media::create([
                'file_url' => asset('storage/' . $file_path),
                'file_name' => $file_name,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'is_main' => $is_main
            ]);
        }
    }

    // Xóa
    public function delete(Request $request,Post $post){
        $file = Media::where('object_type','post')->where('object_id', $post->id)->first();
        if($file){
            $path = str_replace(asset('/storage'), '',$file->file_url);
            if(Storage::disk('public')->exists($path)) Storage::disk('public')->delete($path);
            $file->delete();
        }
        $post->delete();

        // $page_visit = floor((int) $request->input('total') % 5);
        // if($page_visit % 2 == 0) $page_visit -= 1;    
        // return redirect("/admin/posts?page={$page_visit}");
        return redirect("/admin/posts");
    }

    // Sửa
    public function edit(Post $post){

        $post_categories = PostCategory::get(['id', 'name']);
        $post = $post->load('media:object_id,file_url,file_name');

        return Inertia::render("Admin/Post/Edit", [
            'post_categories' => $post_categories,
            'post_info' => $post
        ]);
    }

    public function update(Request $request, Post $post){

        $rule_file = ["nullable"];
        if($request->input('file_id') == null && $request->file("file") == null){
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
            $is_main = 0;

            $old_file = Media::where('object_type','post')->where('object_id',$post->id)->first();
            if($old_file){
                $old_file_path = str_replace(asset('/storage'), '',$old_file->file_url);
                if(Storage::disk("public")->exists($old_file_path)) Storage::disk("public")->delete($old_file_path);
                $old_file->delete();
            }

            Media::create([
                'file_url' => asset('storage/' . $file_path),
                'file_name' => $file_name,
                'file_size' => $file_size,
                'object_type' => $object_type,
                'object_id' => $object_id,
                'is_main' => $is_main
            ]);
        }
    }
}
