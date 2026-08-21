import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardTitle from "./CardTitle";
import { BadgeNew, BadgeDiscount } from "./CardBadge";
import { Link } from "@inertiajs/react";

interface CardProps {
    dataItem: any;
    showBadgeNew? : boolean;
    showBadgeDiscount?: boolean;
    url?: string;
}

export default function Card({ dataItem, url, showBadgeDiscount = false , showBadgeNew = false }: CardProps) {
    return (
        <Link href={url} className="cursor-pointer ease-out flex h-100 w-75 shrink-0 flex-col justify-between rounded-2xl bg-white p-6 shadow transition-all duration-250 select-none hover:scale-101 hover:shadow-lg">
            {/* image */}
            <CardImage dataImage={dataItem.main_image} />

            <div className="space-y-1">
                {/* badge */}
                <div className="flex gap-3">
                    {/* badge new */}
                    {showBadgeNew && <BadgeNew />}

                    {/* badge discount */}
                    {showBadgeDiscount && (
                        <BadgeDiscount
                            discountNum={dataItem.base_price?.discount}
                        />
                    )}
                </div>

                {/* name */}
                <CardTitle title={dataItem.name} />
            </div>

            {/* price */}
            <CardPrice dataPrice={dataItem.base_price} />
        </Link>
    );
}
