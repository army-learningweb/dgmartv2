<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminUserController extends Controller
{

    // Đọc
    public function read(Request $request)
    {
        $users = User::select(["id", "name", "email", "tel", "status", "created_at"])->paginate(6);
        return Inertia::render("Admin/User/Read", ["users" => $users]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            "tel" => ["required", "regex:/^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/"],
            "email" => ["required", "email"],
            "password" => ["required", "min:8", "max:50", "confirmed", "regex:/^[\p{L}\p{N}\s!@#$%^&*]+$/u"],
        ]);
        User::create($validated);
    }

    // Sửa
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            "tel" => ["required", "regex:/^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/"],
            "email" => ["required", "email"],
            "password" => ["sometimes", "nullable", "min:8", "max:50", "confirmed", "regex:/^[\p{L}\p{N}\s!@#$%^&*]+$/u"],
        ]);

        if (!$request->input("password")) unset($validated['password']);
        User::find($user->id)->update($validated);
    }

    // Xóa
    public function delete(User $user){
        if($user->id === 1) return;
        $user->delete();
        
    }
}
