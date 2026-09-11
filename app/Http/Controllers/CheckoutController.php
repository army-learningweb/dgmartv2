<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;

class CheckoutController extends Controller
{
    // Đọc
    public function read(Request $request)
    {
        if($request->session()->has('cart') == false) return redirect('gio-hang');

        $step = $request->input('step');
        if ($step == 2) {
            $is_confirm = $request->session()->has('checkout_info');
            if ($is_confirm == false){
                return redirect('thanh-toan/?step=1')->withErrors('Vui lòng nhập thông tin giao hàng.');
            } 
        }

        if ($step == 3) {
            $is_confirm_payment = $request->session()->has('checkout_payment');
            if ($is_confirm_payment == false) {
                return redirect('thanh-toan/?step=2')->withErrors('Vui lòng chọn phương thức thanh toán.');
            }
        }

        // Thông tin đã nhập
        $info_save = json_decode($request->cookie('checkout_info')) ?? null;

        // Phương thức thanh toán
        $payment_save = $request->cookie('checkout_payment');

        // Giỏ hàng
        $cart = $request->session()->get('cart', []);

        return Inertia::render('Client/Checkout/Read', [
            'step' => $step,
            'info_save' => $info_save,
            'payment_save' => $payment_save,
            'cart' => $cart,
        ]);
    }

    // Xác nhận thông tin
    public function storeInfo(Request $request)
    {
        $validated = $request->validate([
            'name' => ["required", "min:2", "max:100", "regex:/^[\p{L}\s]+$/u"],
            'tel' => [
                'required',
                'regex:/^(032|033|034|035|036|037|038|039|096|097|098|086|083|084|085|081|082|088|091|094|070|079|077|076|078|090|093|089|056|058|092|059|099)[0-9]{7}$/'
            ],
            'email' => 'required|email',
            'address' => 'required',
            'note' => 'nullable|regex:/^[\p{L}\p{P}\p{N}\p{S}\s]+$/u'
        ], [
            'tel.regex' => ':attribute không hợp lệ.'
        ], [
            'tel' => 'Số điện thoại',
            'address' => 'Địa chỉ'
        ]);

        $checkout_info = [
            'name' => $validated['name'],
            'tel' => $validated['tel'],
            'email' => $validated['email'],
            'address' => $validated['address'],
            'note' => $validated['note']
        ];

        $request->session()->put('checkout_info', $checkout_info);
        Cookie::queue('checkout_info', json_encode($checkout_info), 60);

        return redirect('/thanh-toan?step=2');
    }

    // Xác nhận phương thức thanh toán
    public function storePayment(Request $request) {
        $validated = $request->validate([
            'payment_method' => ['required', 'in:cod,bank,momo'],
        ], [
            'payment_method.required' => 'Vui lòng chọn phương thức thanh toán.',
            'payment_method.in' => 'Phương thức thanh toán không hợp lệ.',
        ]);

        $request->session()->put('checkout_payment', $validated['payment_method']);
        Cookie::queue('checkout_payment', $validated['payment_method'], 60);

        return redirect('/thanh-toan?step=3');
    }

    // Thanh toán thành công
    public function checkoutComplete(Request $request){
        $is_confirm_order = $request->input('is_confirm_order');
        $checkoutInfo = $request->session()->has('checkout_info');

        if($is_confirm_order == true && $checkoutInfo){
            $request->session()->forget('checkout_info');
            $request->session()->forget('checkout_payment');
            $request->session()->forget('cart');
            $request->session()->forget('total');
            return Inertia::render('Client/Checkout/Complete');
        }

        return abort(404);
    }
}
