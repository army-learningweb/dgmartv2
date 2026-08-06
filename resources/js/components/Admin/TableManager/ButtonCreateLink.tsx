import { Link } from "@inertiajs/react"
import { Plus } from "lucide-react"

interface ButtonCreateLinkProps {
    route: string;
}

export default function ButtonCreateLink({route} : ButtonCreateLinkProps) {
    return (
        <Link href={route} className="flex gap-1 items-center bg-blue-600 border border-blue-600 text-white hover:brightness-110 px-2.5 py-1.5 rounded-lg text-xs font-medium active:translate-y-0.5 transition-all duration-200 ">
            <Plus size={15} />
            <span>Thêm mới</span>
        </Link>
    )
}