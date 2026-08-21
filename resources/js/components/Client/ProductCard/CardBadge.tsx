export function BadgeNew() {
    return (
        <div className="w-fit rounded-full font-medium text-blue-600 text-xs">
            Mới
        </div>
    );
}


export function BadgeDiscount({ discountNum }: { discountNum : string | number}) {
    return (
        <div className="w-fit rounded-full font-medium text-red-600 text-xs">
            Giảm {discountNum}%
        </div>
    );
}