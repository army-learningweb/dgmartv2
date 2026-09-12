<!DOCTYPE html>
<html>

<head>
    <meta charset='UTF-8'>
</head>

<body style='background:#F4F7FA; font-family:Segoe UI, Helvetica, sans-serif; line-height:1.5'>

    <style>
       @media only screen and (max-width: 480px) {
    .cart-table, .cart-table tr, .cart-table td {
      display: block !important;
      width: 100% !important;
    }
    .cart-table td.cart-price {
      text-align: left !important;
      padding-top: 0 !important;
      margin-top: -4px;
    }
  }
    </style>

    <div id='wrapper'
        style='background-color: white; font-size:14px; width:600px;margin:0px auto;min-height:500px;padding:20px;box-sizing:border-box;border-radius:20px;'>
        <h1 style="color:#2563eb; padding:0; margin:0; font-weight:bold">Digimart</h1>
        <p style="margin: 5px 0 5px 2px; ">Lapop - Phụ kiện Laptop - Link kiện Laptop</p>
        <hr style="border: 1px solid rgb(235, 234, 234)">
        <p style="margin: 5px 0 5px 2px; ;">
            Xin chào <strong>{{ $data['checkout_info']['name'] }}</strong>
            Cảm ơn bạn đã tin tưởng lựa chọn DGMART ! Đơn hàng của bạn đã được tiếp nhận và đang trong quá
            trình chuẩn bị để gửi đến bạn sớm nhất.
        </p>
        <p style="margin: 5px 0 5px 2px; ">Đơn hàng:
            <strong>{{ $data['code'] }}</strong>
        </p>
        
        <div style="border-radius:6px; margin-top:8px; overflow:hidden;">
    @foreach ($data['cart'] as $item)
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="cart-table"
               style="table-layout:fixed; border:1px solid #d1d5db; border-radius:15px; margin-bottom:8px;">
            <tr>
                <td style="width:65%; padding:10px 12px; vertical-align:top; word-wrap:break-word; overflow-wrap:break-word;">
                    <div style="font-weight:bold; color:#111827;">{{ $item['name'] }}</div>
                    <div style="font-size:11px; color:#9ca3af;">Mã sản phẩm: {{ $item['variant_code'] }}</div>
                    <div style="font-size:12px; color:#6b7280; margin-top:2px;">
                        {{ number_format($item['price_discount'] > 0 ? $item['price_discount'] : $item['price']) }}đ
                        &nbsp;x&nbsp; {{ $item['qty'] }}
                    </div>
                </td>
                <td class="cart-price" style="width:35%; padding:10px 12px; text-align:right; vertical-align:top;">
                    <div style="font-weight:bold; color:#111827; word-wrap:break-word;">{{ number_format($item['total']) }}đ</div>
                </td>
            </tr>
        </table>
    @endforeach
</div>

        <div style="padding:12px 4px;">
            <span>Tổng cộng:</span>  
            <span style="font-size:16px; font-weight:bold; color:#2563eb;">
                {{ num_format($data['total']['total_price']) }}
            </span>
        </div>
        
        <hr style="border: 1px solid rgb(235, 234, 234)">

        <strong style="margin:15px 0 10px 0; display:inline-block">Thông tin giao hàng</strong>
        <div style="">Giao đến: {{ $data['checkout_info']['address'] }} </div>
        <div style="">Số điện thoại: {{ $data['checkout_info']['tel'] }} </div>

        <strong style="margin:15px 0 10px 0; display:inline-block">Phương thức thanh toán</strong>
        <div style="">
            @if ($data['checkout_payment']['payment_method'] == 'cod')
                <div>Thanh toán khi nhận hàng</div>
            @elseif ($data['checkout_payment']['payment_method'] == 'bank')
                <div>Chuyển khoản (Ngân hàng)</div>
            @else
                <div>Chuyển khoản (Ví momo, Ví trả sau)</div>
            @endif
        </div>

        <strong style="margin:15px 0 10px 0; display:inline-block">Thông tin liên hệ cửa hàng</strong>
        <div style="">Email: dgmart.support@gmail.com</div>
        <div style="">Số điện thoại: 0123 456 7890</div>
        <div style="">Website: <a href="">dgmart.test</a></div>

        <strong style="margin:10px 0 10px 0; display:inline-block">
            Cảm ơn bạn đã chọn mua sắm tại DGMART !
        </strong>
    </div>
</body>

</html>
