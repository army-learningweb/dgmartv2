interface BadgeVariantProps {
    role: 'default' | 'variant';
}

export default function BadgeVariant({ role }: BadgeVariantProps) {

    const RoleOptions = {
        default: "bg-gray-200/50 text-gray-700",
        variant: "bg-purple-50 text-purple-700"
    }

    const RoleMessage = {
        default: "Mặc định",
        variant: "Biến thể"
    }

    return (
        <div className={`text-[11px] tracking-tight font-medium px-2 py-0.5 w-fit rounded-xl ${RoleOptions[role]}`}>
            {RoleMessage[role]}
        </div>
    )
}