<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\ProductDetailResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductCategory;

class ProductController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        // Lấy sản phẩm
        $slug = $request->segment(1);
        $products = Product::query()
            ->with(['variants', 'mainImage'])
            ->withMin('variants','price')
            ->where('slug', 'like', "$slug%")
            ->when($request->input('category'), function ($query, $value) {
                $query->where('category_id', $value);
            })
            ->when($request->input('price') === 'asc', function ($query) {
                $query->orderBy('variants_min_price', 'asc');
            })
            ->when($request->input('price') === 'desc', function ($query) {
                $query->orderBy('variants_min_price', 'desc');
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        // Lấy danh mục sản phẩm
        $categories = null;
        if ($slug === 'laptop') $categories = $this->getCategories('laptop');
        if ($slug === 'phu-kien') $categories = $this->getCategories('phu-kien');
        if ($slug === 'camera-dong-ho') $categories = $this->getCategories('camera-dong-ho');

        return Inertia::render('Client/Product/Read', [
            'products' => ProductResource::collection($products),
            'categories' => $categories,
            'category' => $request->input('category'),
            'price' => $request->input('price')
        ]);
    }

    // Chi tiết sản phẩm
    public function detail(Request $request)
    {
        $category = $request->segment(2);
        $slug = $request->segment(3);

        // Thông tin sản phẩm
        $product = Product::with([
            'variants' => function ($query) {
                $query
                    ->select(['id', 'product_id', 'code', 'price', 'discount', 'price_discount', 'qty', 'qty_sold', 'is_default'])
                    ->with('configs', function ($q) {
                        $q->with('configDetail', function ($n) {
                            $n->with('group');
                        });
                    });
            },
            'mainImage' => function ($query) {
                $query->select(['id', 'object_id', 'file_url', 'file_name']);
            },
            'childsImage' => function ($query) {
                $query->select(['id', 'object_id', 'file_url', 'file_name']);
            }
        ])
            ->where('slug', 'like', "%$category/$slug")
            ->first();

        // Sản phẩm tương tự
        $category_id = ProductCategory::where('slug', 'like', "%$category")->value('id');
        $products_suggest = Product::with([
            'variants' => function ($query) {
                $query
                    ->where('is_default', 'default')
                    ->select(['id', 'product_id', 'price', 'discount', 'price_discount', 'is_default'])
                    ->with('configs', function ($q) {
                        $q->with('configDetail', function ($n) {
                            $n->with('group');
                        });
                    });
            },
            'mainImage' => function ($query) {
                $query->select(['id', 'object_id', 'file_url', 'file_name']);
            }
        ])
            ->where('category_id', $category_id)
            ->whereNot('slug', 'like', "%$slug%")
            ->inRandomOrder()
            ->take(6)
            ->get();


        return Inertia::render('Client/Product/Detail', [
            'product' => new ProductDetailResource($product),
            'products_suggest' => ProductDetailResource::collection($products_suggest)
        ]);
    }

    // Lấy danh mục sản phẩm
    public function getCategories(string $slug)
    {
        $categories = ProductCategory::with('childs:id,name,parent_id')
            ->where('slug', $slug)
            ->select(['id', 'name'])
            ->first();
        return $categories;
    }
}
