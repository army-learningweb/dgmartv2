<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use Inertia\Inertia;

class AdminCustomerController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $customers = Customer::query()
            ->when($request->input("search"), function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where("name", "like", "%{$value}%")
                        ->orWhere("tel", "like", "%{$value}%");
                });
            })
            ->latest()
            ->select(["id", "name", "email", "tel", "created_at"])
            ->paginate(7)
            ->withQueryString();

        $suggest_customers = Customer::latest()->take(5)->get(['id', 'name']);

        $total = Customer::count();

        return Inertia::render("Admin/Customer/Read", [
            "customers" => $customers,
            "suggest_customers" => $suggest_customers,
            "search" => $request->input("search"),
            "total" => $total,
        ]);
    }

    // Lấy thông tin gợi ý customers
    public function getCustomers(Request $request)
    {
        $query = $request->input('search');
        $customers = Customer::where('name', 'like', "%{$query}%")
            ->orWhere('tel', 'like', "%{$query}%")->get(['id', 'name']);
        return response()->json($customers);
    }
}
