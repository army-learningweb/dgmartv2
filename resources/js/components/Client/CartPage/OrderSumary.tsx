import { Link } from "@inertiajs/react";
import { vndFormat } from "@/lib/currency_format";

interface OrderSumaryProps {
    total_price: number;
}

export default function OrderSumary({total_price} : OrderSumaryProps){

    return (
        <div className="flex-1 space-y-2 rounded-3xl bg-white p-4 shadow select-none">
            <h2 className="my-2 text-lg font-medium tracking-tight">
                Tạm tính
            </h2>

            <hr className="mt-3 border-gray-200" />

            <div className="flex items-center justify-between">
                <span>Phí vận chuyển:</span>
                <span className="text-gray-500">Miễn phí</span>
            </div>

            <div className="flex items-center justify-between">
                <span>Tổng:</span>
                <span className="text-lg font-medium">
                    {vndFormat(total_price)}
                </span>
            </div>

            <Link
                href="/laptop"
                className="inline-block w-full rounded-lg border border-gray-200 bg-gray-100 py-1.75 text-center transition-colors duration-150 hover:bg-gray-200 active:bg-gray-300"
            >
                Tiếp tục mua sắm
            </Link>

            <Link
                href="/thanh-toan?step=1"
                className="inline-block w-full rounded-lg bg-blue-600 py-2 text-center text-white transition-transform duration-150 active:bg-blue-700"
            >
                Tiến hành thanh toán
            </Link>
        </div>
    );
}