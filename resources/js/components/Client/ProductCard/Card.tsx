import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardTitle from "./CardTitle";
import { BadgeNew, BadgeDiscount } from "./CardBadge";
import { Link } from "@inertiajs/react";

interface CardProps {
    dataItem: any;
    showBadgeNew? : boolean;
    showBadgeDiscount?: boolean;
}

export default function Card({ dataItem, showBadgeDiscount = false , showBadgeNew = false }: CardProps) {
    return (
        <div className="flex h-90 w-60 shrink-0 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-250 ease-out select-none">
            {/* image */}
            <CardImage dataImage={dataItem.main_image} />

            <div className="space-y-2">
                {/* badge */}
                <div className="flex gap-1">
                    {/* badge new */}
                    {showBadgeNew && <BadgeNew />}

                    {/* badge discount */}
                    {showBadgeDiscount && dataItem.base_price && (
                        <BadgeDiscount
                            discountNum={dataItem.base_price?.discount}
                        />
                    )}
                </div>

                {/* name */}
                <CardTitle title={dataItem.name} />

                <div className="line-clamp-2 text-gray-500">{dataItem.desc}</div>
            </div>

            {/* price */}
            <CardPrice dataPrice={dataItem.base_price} />

            {/* link */}
            <Link href={dataItem.slug} className="text-blue-600 hover:underline">
                Mua ngay
            </Link>
        </div>
    );
}
