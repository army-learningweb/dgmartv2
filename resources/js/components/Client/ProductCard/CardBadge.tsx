export function BadgeNew() {
    return (
        <div className="w-fit rounded-full font-medium text-blue-600 bg-blue-50 px-3 py-0.75 text-xs">
            Mới
        </div>
    );
}


export function BadgeDiscount({ discountNum }: { discountNum : string | number}) {
    return (
        <div className="w-fit rounded-full font-medium text-red-600 text-xs bg-red-50 px-2 py-0.75">
            Giảm {discountNum}%
        </div>
    );
}