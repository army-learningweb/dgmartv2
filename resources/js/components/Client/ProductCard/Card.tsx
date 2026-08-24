import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardTitle from "./CardTitle";
import { BadgeNew, BadgeDiscount } from "./CardBadge";

interface CardProps {
    dataItem: any;
    showBadgeNew? : boolean;
    showBadgeDiscount?: boolean;
}

export default function Card({ dataItem, showBadgeDiscount = false , showBadgeNew = false }: CardProps) {
    return (
        <div className="flex h-110 w-75 shrink-0 flex-col justify-between space-y-5 rounded-2xl bg-white p-6 shadow transition-all duration-250 ease-out select-none hover:shadow-lg border border-gray-200">
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

                <div className="line-clamp-2">{dataItem.desc}</div>
            </div>

            {/* price */}
            <CardPrice dataPrice={dataItem.base_price} route={dataItem.slug} />
        </div>
    );
}
