import { Head } from '@inertiajs/react';
import { Plus, Minus, Trash } from 'lucide-react';

import { CartPropTypes } from '@/types/module/client_cart';
import { vndFormat } from '@/lib/currency_format';

export default function Read({ cart }: CartPropTypes) {

    const handleRemove = (id:number) => {
        console.log(id);
    }

    return (
        <>
            <Head title="Giỏ hàng" />

            <div className="mx-auto mt-4 min-h-400 max-w-312 space-y-8">
                <h1 className="mt-4 inline-block text-5xl font-bold tracking-tight select-none">
                    Giỏ hàng
                </h1>

                <div className="flex min-h-120 gap-4">
                    <div className="w-[70%] space-y-2 rounded-3xl bg-white shadow p-2">
                        {cart.map((item) => (
                            <div
                                key={item.product_id}
                                className="flex items-center justify-between rounded-2xl py-2 pr-6 pl-2 border border-gray-200"
                            >
                                {/* Ảnh */}
                                <div className="relative flex h-20 w-28 items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-white">
                                    <img
                                        src={item.image}
                                        alt={item.image_alt}
                                        className="h-full w-20"
                                    />

                                    {item.discount > 0 && (
                                        <div className="absolute top-0 left-0 z-50 rounded-br-2xl bg-red-600 px-3 py-0.75 text-xs text-white">
                                            Giảm {item.discount}%
                                        </div>
                                    )}
                                </div>

                                {/* tên */}
                                <p className="w-60 truncate">{item.name}</p>

                                {/* tăng giảm số lượng */}
                                <div className="flex items-center gap-1">
                                    <div className="rounded-lg border border-gray-200 bg-gray-200 p-1">
                                        <Minus size={18} />
                                    </div>
                                    <div className="rounded-lg border border-gray-200 px-4 py-0.75">
                                        <input
                                            type="number"
                                            name=""
                                            id=""
                                            value={item.qty}
                                            className="w-5 text-center"
                                        />
                                    </div>
                                    <div className="rounded-lg border border-gray-200 bg-gray-200 p-1">
                                        <Plus size={18} />
                                    </div>
                                </div>

                                {/* Số lượng */}
                                <div>
                                    <span className="text-xs text-gray-400">
                                        X
                                    </span>{' '}
                                    {item.qty}
                                </div>
                                
                                {/* giá */}
                                <div>
                                    <p
                                        className={`${item.price_discount ? 'text-gray-500 line-through' : 'font-semibold'}`}
                                    >
                                        {vndFormat(item.price)}
                                    </p>

                                    {item.price_discount > 0 && (
                                        <p className="font-medium">
                                            {vndFormat(item.price_discount)}
                                        </p>
                                    )}
                                </div>
                                
                                {/* Xóa */}
                                <Trash size={18} onClick={() => handleRemove(item.product_id)}/>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 rounded-3xl bg-white shadow">
                        THANH TOÁN HÓA ĐƠN
                    </div>
                </div>

                <h2 className="mt-4 inline-block text-3xl font-bold tracking-tight select-none">
                    Có thể bạn sẽ thích
                </h2>
            </div>
        </>
    );
}
