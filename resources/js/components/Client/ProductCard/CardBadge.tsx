export function BadgeNew() {
    return (
        <div className="w-fit rounded-full bg-blue-50 px-3 py-0.75 text-xs font-medium text-blue-600">
            Mới
        </div>
    );
}


export function BadgeDiscount({ discountNum }: { discountNum : string | number}) {
    return (
        <div className="w-fit rounded-full bg-red-50 px-3 py-0.75 text-xs font-medium text-red-600">
            Giảm {discountNum}%
        </div>
    );
}