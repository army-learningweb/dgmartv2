<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function read(){
        return Inertia::render("Admin/Product/Read");
    }
}
