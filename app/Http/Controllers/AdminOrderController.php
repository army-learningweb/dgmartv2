<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;

use App\Http\Resources\AdminProductOrderResource;

class AdminOrderController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $orders = Order::query()->with('customer:id,name')
            ->when($request->input("search"), function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where("code", "like", "%{$value}%");
                });
            })
            ->when($request->input('status_shipping'), function ($query, $value) {
                $query->where('status_shipping', $value);
            })
            ->when($request->input('status_payment'), function ($query, $value) {
                $query->where('status_payment', $value);
            })
            ->latest()
            ->paginate(7)
            ->withQueryString();

        $suggest_orders = Order::latest()->take(5)->get(['id', 'code']);

        $total = Order::count();
        $awaiting = Order::where('status_shipping', 'awaiting')->count();
        $processing = Order::where('status_shipping', 'processing')->count();
        $shipped = Order::where('status_shipping', 'shipped')->count();
        $delivery = Order::where('status_shipping', 'delivery')->count();
        $deliveryfailed = Order::where('status_shipping', 'deliveryfailed')->count();
        $delivered = Order::where('status_shipping', 'delivered')->count();
        $canceled = Order::where('status_shipping', 'canceled')->count();
        $refund = Order::where('status_shipping', 'refund')->count();

        $paid = Order::where('status_payment', 'paid')->count();
        $unpaid = Order::where('status_payment', 'unpaid')->count();

        return Inertia::render("Admin/Order/Read", [
            "orders" => $orders,
            "suggest_orders" => $suggest_orders,
            "search" => $request->input("search"),
            "status_shipping" => $request->input("status_shipping"),
            "status_payment" => $request->input("status_payment"),
            "total" => $total,
            "awaiting" => $awaiting,
            "processing" => $processing,
            "shipped" => $shipped,
            "delivery" => $delivery,
            "deliveryfailed" => $deliveryfailed,
            "delivered" => $delivered,
            "canceled" => $canceled,
            "refund" => $refund,
            "paid" => $paid,
            "unpaid" => $unpaid
        ]);
    }

    // Chi tiết
    public function detail(int $id){
        $order_info = Order::where('id', $id)->with('customer:id,name,email,tel')->first();
        $order_details = OrderItem::with(['product' => function($productModel) {
            $productModel
            ->with('mainImage')
            ->select(['id','name']);
        }, 
        'variant' => function($productVariantModel) {
            $productVariantModel
            ->with(['configs' => function ($productVariantConfigModel) {
                $productVariantConfigModel->with('configDetail');
            }])
            ->select(['id','code','price','price_discount','discount','created_at']);
        }])
        ->where('order_id',$id)
        ->get();

        return Inertia::render("Admin/Order/Detail", [
            'order_info' => $order_info,
            'order_details' => AdminProductOrderResource::collection($order_details)
        ]);
    }
    
    // Cập nhật
    public function update(Request $request,Order $order){
        $validated = $request->validate([
            'status_payment' => ['required'],
            'status_shipping' => ['required']
        ]);

        $order->update($validated);

        return redirect('admin/orders')->with('success','Cập nhật thành công');
    }
}
