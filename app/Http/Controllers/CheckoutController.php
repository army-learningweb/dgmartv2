<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function read(){
        return Inertia::render('Client/Checkout/Read');
    }
}
