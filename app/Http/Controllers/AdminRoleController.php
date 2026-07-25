<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;

class AdminRoleController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        $roles = Role::all();
        $total = Role::count();
        return Inertia::render("Admin/Role/Read", [
            'roles' => $roles,
            'total' => $total
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/", "unique:roles"],
            "desc" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
        ], [
            "name.required" => "Tên vai trò không được để trống",
            "name.regex" => "Chữ cái đầu viết hoa, không chứa kí tự và số.",
        ], [
            "name" => "Tên vai trò"
        ]);
        
        Role::create($validated);
    }

    // Sửa
    public function update(Request $request, Role $role) {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/", "unique:roles,id,". $role->id],
            "desc" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
        ], [
            "name.required" => "Tên vai trò không được để trống",
            "name.regex" => "Chữ cái đầu viết hoa, không chứa kí tự và số.",
        ], [
            "name" => "Tên vai trò"
        ]);

        $role->update($validated);
    }

    // Xóa
    public function delete(Role $role) {
        $role->delete();
    }
}
