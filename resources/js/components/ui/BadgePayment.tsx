interface BadgePaymentProps {
    status: "paid" | "unpaid"
    className?: string;
}

export default function BadgePayment({ status, className }: BadgePaymentProps) {

    const statusOptions = {
        paid: "bg-green-50 text-green-700",
        unpaid: "bg-red-50 text-red-700"
    }

    const statusMessage = {
        paid: "Đã thanh toán",
        unpaid: "Chưa thanh toán"
    }

    return (
        <div className={`text-[11px] tracking-tight font-medium px-2 py-0.5 w-fit rounded-xl ${className} ${statusOptions[status]}`}>
            {statusMessage[status]}
        </div>
    )
}