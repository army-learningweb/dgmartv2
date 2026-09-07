<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductConfig;
use App\Models\ProductVariant;
use App\Models\ProductVariantConfig;

class CartController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $products_suggest = Product::with([
            'variants' => function ($query) {
                $query
                    ->where('is_default','default')
                    ->select(['id', 'product_id', 'code', 'price', 'discount', 'price_discount', 'qty', 'qty_sold', 'is_default'])
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
            ->inRandomOrder()
            ->take(8)
            ->get();
            
        $cart = $request->session()->get('cart', []);
        return Inertia::render("Client/Cart/Read", [
            'cart' => $cart,
            'products_suggest' => ProductResource::collection($products_suggest)
        ]);
    }

    // Thêm
    public function create(Request $request)
    {
        $variant_id = $request->input('version_id');
        $product_id = $request->input('product_id');

        // Lấy thông tin sản phẩm
        $product_info = Product::where('id', $product_id)->first(['id', 'name', 'slug']);
        $product_price = ProductVariant::where('id', $variant_id)->first(['price', 'discount', 'price_discount', 'qty']);
        $product_image = Media::where('object_id', $product_id)->where('role', 'main')->first(['file_url', 'file_name']);

        $product_configs_id = ProductVariantConfig::where('variant_id', $variant_id)->get()->pluck('config_id');
        $product_configs = ProductConfig::with(['group' => function ($q) {
            $q->select(['id', 'name']);
        }])
            ->whereIn('id', $product_configs_id)
            ->get(['id', 'name', 'group_id']);
        $configs = [];
        foreach ($product_configs as $item) {
            $configs[] = [
                'label' => $item->group->name,
                'value' => $item->name
            ];
        }

        // Thêm vào giỏ hàng
        $cart = $request->session()->get('cart', []);
        $KEY = $product_info->id . $variant_id;

        if (isset($cart[$KEY])) {
            $offical_price = ($product_price->price_discount > 0 ? $product_price->price_discount : $product_price->price);
            $cart[$KEY]['qty'] = $cart[$KEY]['qty'] + 1;
            $cart[$KEY]['total'] = $cart[$KEY]['qty'] * $offical_price;
        } else {
            $cart[$KEY] = [
                'key' => $KEY,
                'slug' => $product_info->slug,
                'product_id' => $product_info->id,
                'image' => $product_image->file_url,
                'image_alt' => $product_image->file_name,
                'name' => $product_info->name,
                'qty' => 1,
                'discount' => $product_price->discount ?? 0,
                'price' => $product_price->price,
                'price_discount' => $product_price->price_discount ?? 0,
                'total' => ($product_price->price_discount > 0 ? $product_price->price_discount : $product_price->price) * ($cart[$product_info->id]['qty'] ?? 1),
                'configs' => $configs
            ];
        }

        $request->session()->put('cart', $cart);
        $this->total($request);
        return redirect("/gio-hang");
    }

    // Xóa
    public function delete(Request $request, int $key)
    {
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$key])) {
            unset($cart[$key]);
        }
        $request->session()->put('cart', $cart);
        $this->total($request);
        return redirect('/gio-hang');
    }

    // Xóa tất cả
    public function destroy(Request $request)
    {
        $request->session()->forget('cart');
        $request->session()->forget('total');
        return redirect('/gio-hang');
    }

    // Tăng số lượng
    public function increase(Request $request, int $key)
    {
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$key])) {
            $offical_price = $cart[$key]['price_discount'] > 0
                ? $cart[$key]['price_discount']
                : $cart[$key]['price'];

            $cart[$key]['qty'] += 1;
            $cart[$key]['total'] = $offical_price * $cart[$key]['qty'];
        }

        $request->session()->put('cart', $cart);
        $this->total($request);
        return redirect('/gio-hang');
    }

    // Giảm số lượng
    public function decrease(Request $request, int $key)
    {
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$key])) {
            if ($cart[$key]['qty'] === 1) {
                unset($cart[$key]);
            } else {
                $offical_price = $cart[$key]['price_discount'] > 0
                    ? $cart[$key]['price_discount']
                    : $cart[$key]['price'];

                $cart[$key]['qty'] -= 1;
                $cart[$key]['total'] = $offical_price * $cart[$key]['qty'];
            }
        }

        $request->session()->put('cart', $cart);
        $this->total($request);
        return redirect('/gio-hang');
    }

    // Tính tổng giỏ hàng
    public function total(Request $request)
    {
        $cart = $request->session()->get('cart');

        if (!empty($cart)) {
            $total['count'] = 0;
            $total['total_price'] = 0;

            foreach ($cart as $item) {
                $total['count'] += $item['qty'] ?? 0;
                $total['total_price'] += $item['total'] ?? 0;
            }

            $request->session()->put('total', $total);
        }
    }
}
