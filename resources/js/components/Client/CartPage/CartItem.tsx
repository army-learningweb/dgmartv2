import { vndFormat } from '@/lib/currency_format';
import { Trash } from 'lucide-react';
import { Link } from '@inertiajs/react';
import MinusButton from './MinusButton';
import PlusButton from './PlusButton copy';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface CartItemProps {
    dataItem: any;
}

export default function CartItem({ dataItem }: CartItemProps) {
    const [isDisableButton, setIsDisableButton] = useState<boolean>(false);

    // Hàm route dùng chung
    const action = (route: string) => {
        router.post(
            route,
            {},
            {
                only: ['cart', 'total'],
                preserveScroll: true,
                onError: (error) => {
                    toast.error(error[0]);
                },
                onFinish: () => setIsDisableButton(false),
            },
        );
    };

    // Tăng số lượng
    const handleIncrease = (key: number) => {
        setIsDisableButton(true);
        action(`/gio-hang/${key}/increase`);
    };

    // Giảm số lượng
    const handleDecrease = (key: number, qty: number) => {
        if (qty === 1) {
            if (!confirm('Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng')) {
                return;
            }
        }
        setIsDisableButton(true);
        action(`/gio-hang/${key}/decrease`);
    };

    // Xóa 1
    const handleRemove = (key: number) => {
        if (confirm('Bạn đồng ý xóa sản phẩm khỏi giỏ hàng ?')) {
            action(`/gio-hang/${key}/delete`);
        }
    };

    return (
        <div className="flex items-center justify-between pr-1 pb-2">
            <div className="flex items-center gap-4">
                {/* Ảnh */}
                <div className="relative flex h-20 w-30 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-1">
                    <img
                        src={dataItem.image}
                        alt={dataItem.image_alt}
                        className="h-full w-full object-contain"
                    />

                    {dataItem.discount > 0 && (
                        <div className="absolute top-0 left-0 z-40 rounded-br-xl bg-red-600 px-2 py-0.75 text-[10px] font-medium text-white">
                            Giảm {dataItem.discount}%
                        </div>
                    )}
                </div>

                {/* tên */}
                <div className="">
                    <Link
                        href={dataItem.slug}
                        className="inline-block w-50 truncate font-medium hover:underline"
                    >
                        {dataItem.name}
                    </Link>
                    <p className="text-xs text-gray-500">
                        ({dataItem.variant_code})
                    </p>
                </div>
            </div>

            {/* giá */}
            <div className="w-25">
                <p
                    className={`${dataItem.price_discount ? 'text-gray-500 line-through' : 'font-semibold'}`}
                >
                    {vndFormat(dataItem.price)}
                </p>

                {dataItem.price_discount > 0 && (
                    <p className="font-medium">
                        {vndFormat(dataItem.price_discount)}
                    </p>
                )}
            </div>

            {/* tăng giảm số lượng */}
            <div className="flex items-center gap-1">
                <MinusButton
                    onClick={() => handleDecrease(dataItem.key, dataItem.qty)}
                    className={`${isDisableButton && 'pointer-events-none opacity-50'}`}
                />

                <div className="rounded-md border border-gray-200 px-4 py-0.75">
                    <input
                        type="number"
                        name="number"
                        id={`number-${dataItem.variant_id}`}
                        value={dataItem.qty}
                        readOnly
                        className="w-5 text-center select-none focus:ring-0 focus:outline-none"
                    />
                </div>

                <PlusButton
                    onClick={() => handleIncrease(dataItem.key)}
                    className={`${isDisableButton && 'pointer-events-none opacity-50'}`}
                />
            </div>

            {/* Tổng tiền của sản phẩm  */}
            <div className="w-30 font-medium select-none">
                {vndFormat(dataItem.total)}
            </div>

            {/* Xóa */}
            <Trash
                size={18}
                onClick={() => handleRemove(dataItem.key)}
                className="mr-0.5 text-gray-500 hover:text-red-600"
            />
        </div>
    );
}
