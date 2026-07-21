<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    // Đăng nhập
    public function login(){
        return Inertia::render('Admin/Auth/Login');
    }

    public function storeLogin(Request $request){
        $attempt = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(!Auth::attempt($attempt)){
            throw ValidationException::withMessages([
                'email' => 'Email hoặc mật khẩu không chính xác.'
            ]);
        }

        $request->session()->regenerate();
        return redirect('/admin/dashboard');
    }

    // Đăng xuất
    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');   
    }

    // Đăng ký
    public function register(){
        return Inertia::render('Admin/Auth/Register');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => ['required','min:2','max:100','regex:/^[\p{L}\s]+$/u'],
            'email' => ['required', 'email'],
            'password' => ['required','confirmed']
        ], [
            'name.required' => 'Họ và tên không được để trống.'
        ]);
        $newUser = User::create($validated);

        $request->session()->regenerate();
        Auth::login($newUser);
        return redirect('/admin/dashboard');
    }
}
