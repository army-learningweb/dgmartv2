<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;

class AdminUserController extends Controller
{

    // Đọc
    public function read(Request $request)
    {
        $users = User::query()->with('role:id,name')
            ->when($request->input("search"), function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where("name", "like", "%{$value}%")
                        ->orWhere("tel", "like", "%{$value}%");
                });
            })
            ->when($request->input('filter'), function ($query, $value) {
                $query->where('status', $value);
            })
            ->select(["id", "name", "email", "tel", "status", "role_id", "created_at", "updated_at"])
            ->paginate(7)
            ->withQueryString();

        $total = User::count();
        $active = User::where('status','active')->count();
        $inactive = User::where('status','inactive')->count();

        $roles = Role::get(['id','name']);
        return Inertia::render("Admin/User/Read", [
            "users" => $users,
            "search" => $request->input("search"),
            "filter" => $request->input("filter"),
            "total" => $total,
            "active" => $active,
            "inactive" => $inactive,
            "roles" => $roles
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            "tel" => ["required", "regex:/^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/"],
            "email" => ["required", "email", "unique:users"],
            "password" => ["required", "min:8", "max:50", "confirmed", "regex:/^[\p{L}\p{N}\s!@#$%^&*]+$/u"],
            "status" => ["required"]
        ]);

        $validated['role_id'] = $request->input('role_id') ?? null;
        User::create($validated);
        if($request->input("user_on_page") === 7){
            if($request->input("last_page") === 1){
                $next_page = $request->input("last_page") + 1;
                return redirect("/admin/users?page={$next_page}");
            }else{
                return redirect("/admin/users?page={$request->input('last_page')}");
            }
        }
        return redirect("/admin/users?page={$request->input('current_page')}");
    }

    // Sửa
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            "tel" => ["required", "regex:/^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/"],
            "email" => ["required", "email", "unique:users,id,".$user->id],
            "password" => ["sometimes", "nullable", "min:8", "max:50", "confirmed", "regex:/^[\p{L}\p{N}\s!@#$%^&*]+$/u"],
            "status" => ["required"]
        ]);
        
        $validated['updated_at'] = now();
        $validated['role_id'] = $request->input('role_id') ?? null;
        
        if (!$request->input("password")) unset($validated['password']);
        $user->update($validated);
    }

    // Xóa
    public function delete(Request $request, User $user)
    {
        if ($user->id === 1) return;
        $user->delete();
        if($request->input('user_on_page') === 1){
            $prev_page = $request->input('current_page') - 1;
            return redirect("/admin/users?page={$prev_page}");
        }
        return redirect("/admin/users?page={$request->input('current_page')}");
    }
}
