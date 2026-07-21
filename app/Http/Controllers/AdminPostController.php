<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminPostController extends Controller
{
    public function read(){
        return Inertia::render("Admin/Post/Read");
    }
}
