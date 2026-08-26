import { vndFormat } from "@/lib/currency_format";

interface CardPriceProps{
    dataPrice : {
        price: string | number;
        price_discount: string | number;
    }
}

export default function CardPrice({dataPrice} : CardPriceProps) {
    return (
        <div className="mt-2 flex flex-col gap-2 py-2">
            {dataPrice && (
                <>
                    <div className="flex items-center justify-between">
                        <div className="flex w-full gap-2">
                            <span className="text-gray-500">Từ</span>
                            {dataPrice && (
                                <div
                                    className={`
                                        ${dataPrice?.price_discount && 'text-gray-500 line-through'}
                                        ${!dataPrice?.price_discount && 'font-medium'}
                                    `}
                                >
                                    {vndFormat(Number(dataPrice?.price))}
                                </div>
                            )}

                            {dataPrice && dataPrice.price_discount && (
                                <div className="font-medium">
                                    {vndFormat(
                                        Number(dataPrice?.price_discount),
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {!dataPrice && (
                <div className="text-gray-500">Chưa cập nhật giá</div>
            )}
        </div>
    );
}
