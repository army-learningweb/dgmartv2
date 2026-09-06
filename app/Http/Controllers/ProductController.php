<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ProductVariant;
use App\Http\Resources\ProductVariantResource;
use App\Models\Product;
use App\Models\ProductCategory;

class ProductController extends Controller
{
    // Laptop
    public function read(Request $request)
    {
        $slug = $request->segment(1);
        $products = ProductVariant::query()->with([
            'mainImage' => function ($query) {
                $query->select(['object_id', 'file_url', 'file_name']);
            },
            'configs' => function ($query) {
                $query->with('configDetail');
            },
            'info'
        ])
            ->select(['id', 'product_id', 'price', 'discount', 'price_discount'])
            ->where('is_default', 'default');

        $configFilters = ['ram', 'cpu', 'gpu', 'design'];
        foreach ($configFilters as $filter) {
            $products->when($request->input($filter), function ($q, $value) {
                $q->whereHas('configs.configDetail', function ($subQuery) use ($value) {
                    $subQuery->where('name', 'like', "%$value%");
                });
            });
        }

        $products = $products
            ->when($request->input('price'), function ($q, $value) {
                return $q->orderBy('price', $value);
            })
            ->when($request->input('category'), function ($q, $value) {
                $q->whereHas('info', function ($subQuery) use ($value) {
                    $subQuery->where('category_id', $value);
                });
            })
            ->whereHas('info', function ($query) use ($slug) {
                $query->where('slug', 'like', "$slug%");
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        // Lấy danh mục sản phẩm
        $categories = ProductCategory::with('childs:id,name,parent_id')
            ->where('slug', 'laptop')
            ->select(['id', 'name'])
            ->first();

        return Inertia::render('Client/Product/Read', [
            'products' => ProductVariantResource::collection($products),
            'categories' => $categories,
            'category' => $request->input('category'),
            'price' => $request->input('price'),
            'ram' => $request->input('ram'),
            'cpu' => $request->input('cpu'),
            'gpu' => $request->input('gpu'),
            'design' => $request->input('design'),
        ]);
    }

    // Phụ kiện
    public function readAccessory(Request $request)
    {
        $slug = $request->segment(1);
        $products = ProductVariant::query()->with([
            'mainImage' => function ($query) {
                $query->select(['object_id', 'file_url', 'file_name']);
            },
            'configs' => function ($query) {
                $query->with('configDetail');
            },
            'info'
        ])
            ->select(['id', 'product_id', 'price', 'discount', 'price_discount'])
            ->where('is_default', 'default');

        $products = $products
            ->when($request->input('price'), function ($q, $value) {
                return $q->orderBy('price', $value);
            })
            ->when($request->input('category'), function ($q, $value) {
                $q->whereHas('info', function ($subQuery) use ($value) {
                    $subQuery->where('category_id', $value);
                });
            })
            ->whereHas('info', function ($query) use ($slug) {
                $query->where('slug', 'like', "$slug%");
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        // Lấy danh mục phụ kiện
        $categories = ProductCategory::with('childs:id,name,parent_id')
            ->where('slug', $slug)
            ->select(['id', 'name'])
            ->first();

        return Inertia::render('Client/Product/ReadAccessory', [
            'products' => ProductVariantResource::collection($products),
            'categories' => $categories,
            'category' => $request->input('category'),
            'price' => $request->input('price'),
        ]);
    }

    // Camera - đồng hồ
    public function readCameraWatch(Request $request)
    {
        $slug = $request->segment(1);

        $products = ProductVariant::query()->with([
            'mainImage' => function ($query) {
                $query->select(['object_id', 'file_url', 'file_name']);
            },
            'configs' => function ($query) {
                $query->with('configDetail');
            },
            'info'
        ])
            ->select(['id', 'product_id', 'price', 'discount', 'price_discount'])
            ->where('is_default', 'default');

        $products = $products
            ->when($request->input('price'), function ($q, $value) {
                return $q->orderBy('price', $value);
            })
            ->when($request->input('category'), function ($q, $value) {
                $q->whereHas('info', function ($subQuery) use ($value) {
                    $subQuery->where('category_id', $value);
                });
            })
            ->whereHas('info', function ($query) use ($slug) {
                $query->where('slug', 'like', "$slug%");
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();

        // Lấy danh mục phụ kiện
        $categories = ProductCategory::with('childs:id,name,parent_id')
            ->where('slug', $slug)
            ->select(['id', 'name'])
            ->first();

        return Inertia::render('Client/Product/ReadCameraWatch', [
            'products' => ProductVariantResource::collection($products),
            'categories' => $categories,
            'category' => $request->input('category'),
            'price' => $request->input('price'),
        ]);
    }

    // Chi tiết sản phẩm
    public function detail(Request $request)
    {
        $category = $request->segment(2);
        $slug = $request->segment(3);

        // Thông tin sản phẩm
        $product = Product::with(['variants' => function($query) {
            $query
            ->select(['id','product_id','code','price','discount','price_discount','qty','qty_sold', 'is_default'])
            ->with('configs', function ($q) {
                $q->with('configDetail', function ($n) {
                    $n->with('group');
                });
            });
        }, 
        'mainImage' => function($query) {
            $query->select(['id','object_id','file_url','file_name']);
        },
        'childsImage' => function($query) {
            $query->select(['id','object_id','file_url','file_name']);
        }])
        ->where('slug','like',"%$category/$slug")
        ->first();

        // Sản phẩm tương tự
        $category_id = ProductCategory::where('slug','like',"%$category")->value('id');
        $products_suggest = Product::with([
            'variants' => function ($query) {
                $query
                    ->where('is_default', 'default')
                    ->select(['id', 'product_id', 'price', 'discount', 'price_discount','is_default'])
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
            ->whereNot('slug','like',"%$slug%")
            ->inRandomOrder()
            ->take(6)
            ->get();


        return Inertia::render('Client/Product/Detail', [
            'product' => new ProductResource($product),
            'products_suggest' => ProductResource::collection($products_suggest)
        ]);
    }
}
