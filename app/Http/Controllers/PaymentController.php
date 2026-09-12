<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderMail;
use App\Http\Controllers\CheckoutController;

class PaymentController extends Controller
{
    // Đọc
    public function read(){
        return Inertia::render("Client/Payment/Read");
    }

    // Xác nhận đã thanh toán
    public function confirm(Request $request)
    {
        $is_payment = $request->input('is_payment');

        if($is_payment == true){
            $cart = $request->session()->get('cart', []);
            $total = $request->session()->get('total', []);
            $checkout_info = $request->session()->get('checkout_info', []);
            $checkout_payment = $request->session()->get('checkout_payment', []);

            $new_order = CheckoutController::OrderAction($checkout_info, $checkout_payment, $cart, $total);
            $data = [
                'code' => $new_order->code,
                'cart' => $cart,
                'total' => $total,
                'checkout_info' => $checkout_info,
                'checkout_payment' => $checkout_payment
            ];
            
            Mail::to($checkout_info['email'])->send(new OrderMail($data));

            $request->session()->forget('checkout_info');
            $request->session()->forget('checkout_payment');
            $request->session()->forget('cart');
            $request->session()->forget('total');
            return redirect()->route('dat-hang-thanh-cong', $new_order->code);
        }else{
            return abort(404);
        }
        
    }
}
