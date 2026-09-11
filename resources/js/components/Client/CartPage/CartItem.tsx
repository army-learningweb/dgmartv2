import { vndFormat } from '@/lib/currency_format';
import { Trash, MonitorCog } from 'lucide-react';
import MinusButton from './MinusButton';
import PlusButton from './PlusButton copy';

interface CartItemProps {
    dataItem: any;
    onRemove: (value: any) => void;
    onIncrease: (value: any) => void;
    onDecrease: (key: number, qty: number) => void;
}

export default function CartItem({
    dataItem,
    onRemove,
    onIncrease,
    onDecrease,
}: CartItemProps) {
    return (
        <div className="flex items-center justify-between pr-1 pb-2">
            <div className="flex items-center gap-4">
                {/* Ảnh */}
                <div className="relative flex h-20 w-30 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2">
                    <img
                        src={dataItem.image}
                        alt={dataItem.image_alt}
                        className="h-full w-full object-contain"
                    />

                    {dataItem.discount > 0 && (
                        <div className="absolute top-0 left-0 z-50 rounded-br-xl bg-red-600 px-2 py-0.75 text-[10px] font-medium text-white">
                            Giảm {dataItem.discount}%
                        </div>
                    )}
                </div>

                {/* tên */}
                <div className="cursor-pointer space-y-1">
                    <p className="w-50 truncate">{dataItem.name}</p>

                    <p className="text-xs">({dataItem.variant_code})</p>

                    <div className="flex w-fit items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-1.25 text-xs font-medium">
                        <MonitorCog size={15} />
                        <span>Xem cấu hình...</span>
                    </div>
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
                    onClick={() => onDecrease(dataItem.key, dataItem.qty)}
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

                <PlusButton onClick={() => onIncrease(dataItem.key)} />
            </div>

            {/* Tổng tiền của sản phẩm  */}
            <div className="w-30 font-medium select-none">
                {vndFormat(dataItem.total)}
            </div>

            {/* Xóa */}
            <Trash
                size={18}
                onClick={() => onRemove(dataItem.key)}
                className="text-gray-500 hover:text-red-600"
            />
        </div>
    );
}
