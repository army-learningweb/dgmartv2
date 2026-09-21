interface StatisOrderItem {
    title: string;
    value: any;
    className?: React.ReactNode
}

export default function StatisOrderItem({ title, value, className }: StatisOrderItem) {
    return (
        <div
            className={`h-25 space-y-2 rounded-xl border border-gray-200 bg-gray-100 p-4 ${className}`}
        >
            <p className="text-lg tracking-tight">{title}</p>
            <p className="text-3xl tracking-tight">{value}</p>
        </div>
    );
}
