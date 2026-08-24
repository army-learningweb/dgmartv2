import { Link } from "@inertiajs/react";
import { vndFormat } from "@/lib/currency_format";

interface CardPriceProps{
    dataPrice : {
        price: string | number;
        price_discount: string | number;
    }
    route: string
}

export default function CardPrice({dataPrice, route} : CardPriceProps) {
    return (
        <div className="flex flex-col gap-2 py-2">
            {dataPrice && (
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 text-[16px]">
                        <span className="text-gray-500">Từ</span>

                        {dataPrice && (
                            <div>{vndFormat(Number(dataPrice?.price))}</div>
                        )}
                    </div>

                    <Link href={route} className="text-blue-600 hover:underline">Mua ngay</Link>
                </div>
            )}

            {!dataPrice && (
                <div className="text-gray-500">Chưa cập nhật giá</div>
            )}
        </div>
    );
}
