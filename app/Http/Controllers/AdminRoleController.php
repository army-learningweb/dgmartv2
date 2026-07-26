<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use App\Models\Role;
use Inertia\Inertia;
use App\Models\role_permission;

class AdminRoleController extends Controller
{
    // Đọc
    public function read()
    {
        $roles = Role::all();
        $permissions = Permission::all()->groupBy('module');
        $total = Role::count();
        return Inertia::render("Admin/Role/Read", [
            'roles' => $roles,
            'total' => $total,
            'permissions' => $permissions
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/", "unique:roles"],
            "desc" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            "permissions" => ["required", "array"]
        ], [
            "name.required" => "Tên vai trò không được để trống",
            "name.regex" => "Chữ cái đầu viết hoa, không chứa kí tự và số.",
        ], [
            "name" => "Vai trò",
            "permissions" => "Quyền"
        ]);
        
        $new_role = Role::create($validated);
        $new_role->permissions()->attach($request->input('permissions'));
    }

    // Sửa
    public function update(Request $request, Role $role) {
        $validated = $request->validate([
            "name" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/", "unique:roles,id,". $role->id],
            "desc" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            "permissions" => ["required", "array"]
        ], [
            "name.required" => "Tên vai trò không được để trống",
            "name.regex" => "Chữ cái đầu viết hoa, không chứa kí tự và số.",
        ], [
            "name" => "Tên vai trò",
            "permissions" => "Quyền"
        ]);

        $role->update($validated);
        $role->permissions()->sync($request->input('permissions'));
    }

    // Xóa
    public function delete(Role $role) {
        $role->delete();
    }

    // Lấy permissions
    public function getPermissions(Role $role){
        $permissions_id = role_permission::where('role_id', $role->id)->pluck('permission_id');
        return response()->json($permissions_id);
    }
    
}
