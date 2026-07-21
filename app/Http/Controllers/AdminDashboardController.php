<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function read(){
        return Inertia::render("Admin/Dashboard/Read");
    }
}
