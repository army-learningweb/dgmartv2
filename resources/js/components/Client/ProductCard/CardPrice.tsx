import clsx from "clsx";
import { vndFormat } from "@/lib/currency_format";

interface CardPriceProps{
    dataPrice : {
        price: string | number;
        price_discount: string | number;
    }
}

export default function CardPrice({dataPrice} : CardPriceProps) {

    return (
        <div className="flex flex-col gap-2">
            <span className="text-gray-500">Giá chỉ từ</span>
            {dataPrice && (
                <div className="flex justify-between text-[16px] font-medium">
                    <div
                        className={clsx('', {
                            'line-through': dataPrice.price_discount,
                        })}
                    >
                        {vndFormat(Number(dataPrice?.price))}
                    </div>

                    <div className="text-red-600">
                        {vndFormat(Number(dataPrice?.price_discount))}
                    </div>
                </div>
            )}
        </div>
    );
}
