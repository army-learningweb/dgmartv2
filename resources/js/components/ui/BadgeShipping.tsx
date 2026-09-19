interface BadgeShippingProps {
  status:
    | "awaiting"
    | "processing"
    | "shipped"
    | "delivery"
    | "deliveryfailed"
    | "delivered"
    | "canceled"
    | "refund";
  className?: string;
}

export default function BadgeShipping({ status, className }: BadgeShippingProps) {
  const statusOptions = {
    awaiting: "bg-amber-50 text-amber-700",
    processing: "bg-blue-50 text-blue-700",
    shipped: "bg-blue-50 text-blue-700",
    delivery: "bg-blue-50 text-blue-700",
    deliveryfailed: "bg-red-50 text-red-700",
    delivered: "bg-green-50 text-green-700",
    canceled: "bg-gray-100 text-gray-600",
    refund: "bg-gray-100 text-gray-600",
  }

  const statusMessage = {
    awaiting: "Chờ xác nhận",
    processing: "Đang xử lý",
    shipped: "Đã gửi hàng",
    delivery: "Đang giao hàng",
    deliveryfailed: "Giao thất bại",
    delivered: "Đã giao hàng",
    canceled: "Đã hủy",
    refund: "Hoàn tiền",
  }

  return (
    <div className={`text-[11px] tracking-tight font-medium px-2 py-0.5 w-fit rounded-xl ${className} ${statusOptions[status]}`}>
      {statusMessage[status]}
    </div>
  )
}