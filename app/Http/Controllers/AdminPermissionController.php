<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Permission;

class AdminPermissionController extends Controller
{
    // Đọc
    public function read()
    {
        $permissions = Permission::all()->groupBy("module");
        $total = Permission::count();
        return Inertia::render("Admin/Permission/Read", [
            'permissions' => $permissions,
            'total' => $total
        ]);
    }

    // Thêm
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                "name" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/"],
                "slug" => ["required", "min:2", "max:50", "regex:/^[a-zA-Z\.]+$/"],
                "desc" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
                "module" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/"],
            ],
            [
                "name.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
                "module.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
                "slug.regex" => "Slug không hợp lệ, vui lòng điền như hướng dẫn"
            ],
            [
                "name" => "Tên quyền",
                "slug" => "Slug"
            ]
        );

        Permission::create($validated);
    }

    // Sửa
    public function update(Request $request, Permission $permission)
    {
        $validated = $request->validate(
            [
                "name" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z\s]+$/", "unique:permissions,id," . $permission->id],
                "slug" => ["required", "min:2", "max:50", "regex:/^[a-zA-Z\.]+$/"],
                "desc" => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
                "module" => ["required", "min:2", "max:100", "regex:/^[A-Z][a-zA-Z]+$/", "unique:permissions,id," . $permission->id],
            ],
            [
                "name.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
                "module.regex" => "Chữ cái đầu viết hoa, không chứa dấu và kí tự",
                "slug.regex" => "Slug không hợp lệ, vui lòng điền như hướng dẫn"
            ],
            [
                "name" => "Tên quyền",
                "slug" => "Slug"
            ]
        );

        $permission->update($validated);
    }

    // Xóa
    public function delete(Permission $permission)
    {
        $permission->delete();
    }
}
