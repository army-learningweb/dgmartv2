<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Models\PostCategory;

class PostController extends Controller
{
    public function read(Request $request){
        $posts = Post::query()->with(['user:id,name', 'category:id,name', 'media' => function ($query) {
            $query->select(['object_id', 'file_url', 'file_name'])
                ->where('object_type', 'post')
                ->where('role', 'main');
        }])
            ->when($request->input('category'), function ($query, $value) {
                $query->where('category_id', $value);
            })
            ->where('status', 'active')
            ->select(['id', 'title', 'desc', 'category_id', 'slug'])
            ->latest()
            ->paginate(15)
            ->withQueryString();

        // Lấy danh mục bài viết
        $categories = PostCategory::select(['id', 'name'])->where('status','active')->get();

        return Inertia::render('Client/Post/Read', [
            'posts' => PostResource::collection($posts),
            'categories' => $categories,
            'category' => $request->input('category')
        ]);
    }

    public function readDetail(Request $request){
        return Inertia::render('Client/Post/Detail');
    }
}
