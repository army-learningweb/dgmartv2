import { Link } from "@inertiajs/react";
import { RotateCcw } from "lucide-react";

interface ButtonResetFilterProps {
    route: string;
    className?: string;
}
export default function ButtonResetFilter({route, className} : ButtonResetFilterProps) {
    return (
        <Link
            href={route}
            className={`md:rounded-lg md:text-xs font-medium md:inline-flex ms-1 hidden items-center gap-1 text-red-700 hover:text-red-600 active:text-red-500 ${className}`}
        >
            <RotateCcw size={15} />
            Đặt lại
        </Link>
    );
}
