<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use App\Models\Order;
use App\Models\OrderItem;
use App\Mail\OrderMail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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

        $checkout_payment = [
            'payment_method' => $validated['payment_method'],
        ];

        $request->session()->put('checkout_payment', $checkout_payment);
        Cookie::queue('checkout_payment', $checkout_payment['payment_method'], 60);

        return redirect('/thanh-toan?step=3');
    }

    // Xử lí đặt hàng
    public function orderProcessing(Request $request){
        $is_confirm_order = $request->input('is_confirm_order');
        $checkoutInfo = $request->session()->has('checkout_info');

        if($is_confirm_order == true && $checkoutInfo){
            $cart = $request->session()->get('cart', []);
            $total = $request->session()->get('total',[]);
            $checkout_info = $request->session()->get('checkout_info',[]);
            $checkout_payment = $request->session()->get('checkout_payment',[]);
    
            if($cart && $checkout_info && $checkout_payment && $total){
                if($checkout_payment['payment_method'] == 'cod'){
                    $new_order = $this->OrderAction($checkout_info, $checkout_payment, $cart, $total);
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
                    return redirect('/thanh-toan-online');
                }
            }
        }
        return redirect('/');
    }

    // Order Action
    static function OrderAction($checkout_info, $checkout_payment, $cart, $total){
        $new_customer = Customer::create([
            'name' => $checkout_info['name'],
            'tel' => $checkout_info['tel'],
            'email' => $checkout_info['email']
        ]);

        $new_order = Order::create([
            'code' => 'DG-' . Str::random(10),
            'shipping_address' => $checkout_info['address'],
            'shipping_note' => $checkout_info['note'],
            'qty' => $total['count'],
            'total' => $total['total_price'],
            'payment_method' => $checkout_payment['payment_method'],
            'customer_id' => $new_customer->id
        ]);

        foreach ($cart as $item) {
            OrderItem::create([
                'order_id' => $new_order->id,
                'product_id' => $item['product_id'],
                'variant_id' => $item['variant_id'],
                'qty' => $item['qty'],
                'price' => $item['price_discount'] > 0 ? $item['price_discount'] : $item['price'],
                'total' => $item['total']
            ]);
        };

        return $new_order;
    }

    // Đặt hàng thành công
    public function checkoutComplete(Request $request, $code){
        $exits_order = Order::where('code', $code)->first();
        if(!$exits_order) return abort(404);
        return Inertia::render('Client/Checkout/Complete');
    }
}
