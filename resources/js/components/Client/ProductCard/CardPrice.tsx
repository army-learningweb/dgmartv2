import { vndFormat } from '@/lib/currency_format';

interface CardPriceProps {
    price: string;
    price_discount?: string;
}

export default function CardPrice({ price, price_discount }: CardPriceProps) {
    return (
        <div className="mt-2 flex flex-col gap-2 py-2">
            {price && (
                <div className="flex items-center justify-between">
                    <div className="hidden gap-2 md:flex">
                        <span className="text-gray-500">Từ</span>
                        {price && (
                            <div
                                className={` ${price_discount && 'text-gray-500 line-through'} ${!price_discount && 'font-medium'} `}
                            >
                                {vndFormat(Number(price))}
                            </div>
                        )}

                        {price && price_discount && (
                            <div className="font-medium">
                                {vndFormat(Number(price_discount))}
                            </div>
                        )}
                    </div>

                    <div className='flex gap-2 md:hidden'>
                        <span className="text-gray-500">Từ</span>
                        <div className="font-medium">
                            {vndFormat(Number(price_discount ?? price))}
                        </div>
                    </div>
                </div>
            )}

            {!price && <div className="text-gray-500">Chưa cập nhật giá</div>}
        </div>
    );
}
