<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use App\Models\Post;

class AdminDashboardController extends Controller
{
    // Đọc
    public function read(Request $request){
        $revenue = Order::where('status_payment', 'paid')->sum('total');
        $order = Order::where('status_shipping', 'awaiting')->count();
        $product = Product::get()->count();
        $post = Post::get()->count();

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
            ->paginate(10)
            ->withQueryString();

        return Inertia::render("Admin/Dashboard/Read",[
            'orders' => $orders,
            'revenue' => $revenue,
            'order' => $order,
            'product' => $product,
            'post' => $post
        ]);
    }
}
