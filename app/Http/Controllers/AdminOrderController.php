<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\OrderItem;

use App\Http\Resources\AdminProductOrderResource;
use App\Models\ProductVariant;

class AdminOrderController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $orders = Order::query()->with('customer:id,name')
            ->when($request->input("search"), function ($query, $value) {
                $query->where("code", "like", "%{$value}%");
            })
            ->when($request->input('status_shipping'), function ($query, $value) {
                $query->where('status_shipping', $value);
            })
            ->when($request->input('status_payment'), function ($query, $value) {
                $query->where('status_payment', $value);
            })
            ->when($request->input('filter_date'), function ($query, $value) {
                $query->whereDate('created_at', $value);
            })
            ->latest()
            ->paginate(9)
            ->withQueryString();
        $suggest_orders = Order::latest()->take(5)->get(['id', 'code as name']);
        $revenue = Order::where('status_payment','paid')->sum('total');

        $total = Order::count();
        $awaiting = Order::where('status_shipping', 'awaiting')->count();
        $paid = Order::where('status_payment', 'paid')->count();
        $unpaid = Order::where('status_payment', 'unpaid')->count();

        return Inertia::render("Admin/Order/Read", [
            "revenue" => $revenue,
            "orders" => $orders,
            "suggest_orders" => $suggest_orders,
            "search" => $request->input("search"),
            "status_shipping" => $request->input("status_shipping"),
            "status_payment" => $request->input("status_payment"),
            "filter_date" => $request->input("filter_date"),
            "total" => $total,
            "awaiting" => $awaiting,
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
            'status_shipping' => ['required'],
        ]);

        $order->update($validated);

        $minusQty = ['shipped', 'processing', 'delivery', 'delivered'];
        $plusQty = ['refund', 'canceled', 'deliveryfailed'];

        // Trừ kho
        if (in_array($validated['status_shipping'], $minusQty) && $order->qty_adjust == 'false') {
            $this->adjustQty($order, -1);
            $order->update(['qty_adjust' => 'true']);
        }

        // Hoàn kho
        if (in_array($validated['status_shipping'], $plusQty) && $order->qty_adjust == 'true') {
            $this->adjustQty($order, +1);
            $order->update(['qty_adjust' => 'false']);
        }

        return redirect('admin/orders')->with('success','Cập nhật thành công');
    }

    // Xử lí số lượng sản phẩm trong kho
    public function adjustQty($order, int $direction)
    {
        $order_items = OrderItem::where('order_id', $order->id)->get(['variant_id', 'qty']);

        foreach ($order_items as $item) {
            $variant_qty = ProductVariant::where('id', $item->variant_id)->value('qty');
            ProductVariant::where('id', $item->variant_id)->update([
                'qty' => $variant_qty + ($direction * $item->qty),
            ]);
        }
    }

    // Lấy thông tin đơn hàng ở gợi ý tìm kiếm
    public function getOrders(Request $request)
    {
        $query = $request->input('search');
        $orders = Order::where('code', 'like', "%{$query}%")->get(['id', 'code as name']);
        return response()->json($orders);
    }
}
