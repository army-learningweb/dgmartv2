import CardImage from "./CardImage";
import CardPrice from "./CardPrice";
import CardTitle from "./CardTitle";
import { BadgeNew, BadgeDiscount } from "./CardBadge";

interface CardProps {
    dataItem: any
    showBadgeNew? : boolean,
    showBadgeDiscount?: boolean
}

export default function Card({ dataItem, showBadgeDiscount = false , showBadgeNew = false }: CardProps) {
    return (
        <div className="product-item w-60.75 shrink-0 space-y-2 rounded-2xl border border-gray-200 bg-white p-4 shadow select-none">
            <div className="flex gap-1">
                {/* badge new */}
                {showBadgeNew && <BadgeNew />}

                {/* badge discount */}
                {showBadgeDiscount && (
                    <BadgeDiscount
                        discountNum={dataItem.base_price?.discount}
                    />
                )}
            </div>

            {/* image */}
            <CardImage dataImage={dataItem.main_image} />

            {/* name */}
            <CardTitle title={dataItem.name} />

            {/* price */}
            <CardPrice dataPrice={dataItem.base_price} />
        </div>
    );
}
