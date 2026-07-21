<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function read(){
        return Inertia::render("Admin/User/Read");
    }
}
