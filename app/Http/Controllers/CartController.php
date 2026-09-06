<?php

namespace App\Http\Controllers;
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
    public function read(Request $request){
        $cart = $request->session()->get('cart');
        // $request->session()->forget('cart');
        return Inertia::render("Client/Cart/Read", [
            'cart' => $cart['cart'] ?? []
        ]);
    }

    // Thêm
    public function create(Request $request){
        // Lấy thông tin sản phẩm
        $product_info = Product::where('id', $request->input('product_id'))->first(['id','name', 'slug']);
        $product_price = ProductVariant::where('id', $request->input('version_id'))->first(['price','discount','price_discount','qty']);
        $product_image = Media::where('object_id',$request->input('product_id'))->where('role','main')->first(['file_url','file_name']);

        $product_configs_id = ProductVariantConfig::where('variant_id', $request->input('version_id'))->get()->pluck('config_id'); 
        $product_configs = ProductConfig::with(['group' => function ($q) {
            $q->select(['id','name']);
        }])
        ->whereIn('id', $product_configs_id)
        ->get(['id','name','group_id']);
        $configs = [];
        foreach($product_configs as $item){
            $configs[] = [
                'label' => $item->group->name,
                'value' => $item->name
            ];
        }

        // Thêm vào giỏ hàng
        $cart = $request->session()->get('cart', []);
        $cart['cart'][] = [
            'product_id' => $product_info->id,
            'image' => $product_image->file_url,
            'image_alt' => $product_image->file_name,
            'name' => $product_info->name,
            'qty' => 1,
            'discount' => $product_price->discount ?? 0,
            'price' => $product_price->price,
            'price_discount' => $product_price->price_discount ?? 0,
            'total' => $product_price->price_discount ?? $product_price->price,
            'configs' => $configs
        ];
        $request->session()->put('cart', $cart);
        
        return redirect("/gio-hang");
    }

    // Xóa
    public function delete(Request $request){

    }
}
