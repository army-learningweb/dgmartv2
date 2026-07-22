<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class AdminUserController extends Controller
{
    public function read(Request $request){
        $users = User::select(["id","name","email","created_at"])->paginate(6);
        return Inertia::render("Admin/User/Read", ["users" => $users]);
    }
}
