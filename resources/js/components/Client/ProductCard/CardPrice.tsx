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
            {dataPrice && (
                <div className="flex gap-2 text-[16px]">
                    <span className="text-gray-500">Từ</span>

                    {dataPrice && (
                        <div>{vndFormat(Number(dataPrice?.price))}</div>
                    )}

                </div>
            )}
        </div>
    );
}
