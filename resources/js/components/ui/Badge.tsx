interface BadgeProps {
    status: "active" | "inactive"
}

export default function Badge({ status }: BadgeProps) {

    const statusOptions = {
        active: "bg-green-50 text-green-700",
        inactive: "bg-red-50 text-red-700"
    }

    const statusMessage = {
        active: "Hoạt động",
        inactive: "Vô hiệu hóa"
    }

    return (
        <div className={`text-[11px] tracking-tight font-medium px-2 py-0.5 w-fit rounded-xl ${statusOptions[status]}`}>
            {statusMessage[status]}
        </div>
    )
}