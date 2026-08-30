
export function BadgeDiscount({ discountNum }: { discountNum : number}) {
    return (
        <>
            {discountNum > 0 && (
                <div className="w-fit rounded-full bg-red-50 px-2 py-0.75 text-xs font-medium text-red-600">
                    Giảm {discountNum}%
                </div>
            )}
        </>
    );
}