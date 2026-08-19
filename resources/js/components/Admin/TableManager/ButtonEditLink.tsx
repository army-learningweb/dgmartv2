import { Link } from "@inertiajs/react"
import { Pen } from "lucide-react"

interface ButtonEditLinkProps {
    route : string;
}

export default function ButtonEditLink({route}: ButtonEditLinkProps) {
    return (
        <Link href={route} className="flex gap-2 items-center  border border-gray-200 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg text-xs font-medium active:translate-y-0.5 transition-all duration-150 cursor-default ">
            <Pen size={13} className="text-gray-400" />
            <span>Chỉnh sửa</span>
        </Link>
    )
}