import CardImage from './CardImage';
import CardPrice from './CardPrice';
import CardTitle from './CardTitle';
import { BadgeDiscount } from './CardBadge';
import { Link } from '@inertiajs/react';

interface CardProps {
    dataItem: any;
}

export default function Card({
    dataItem,
}: CardProps) {
    
    return (
        <div className="relative flex h-90 w-60 shrink-0 flex-col justify-between rounded-2xl bg-white p-5 shadow transition-all duration-250 ease-out select-none hover:-translate-y-1 hover:shadow-lg">
            {/* image */}
            <CardImage dataImage={dataItem.image.file_url} />

            <div className="space-y-2">
                <div className="flex gap-1">
                    {/* badge discount */}
                    {dataItem.discount && (
                        <BadgeDiscount discountNum={dataItem.discount} />
                    )}
                </div>

                {/* name */}
                <CardTitle title={dataItem.name} />

                <div className="line-clamp-2 text-gray-500">
                    {dataItem.desc}
                </div>
            </div>

            {/* price */}
            <CardPrice
                price={dataItem.variants?.[0].price}
                price_discount={dataItem.variants?.[0].price_discount}
            />

            {/* link */}
            <Link
                href={`/${dataItem.slug}`}
                className="mt-1 text-blue-600 hover:underline"
            >
                Xem chi tiết...
            </Link>
        </div>
    );
}
