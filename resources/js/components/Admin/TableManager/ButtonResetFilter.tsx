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
            className={`md:inline-flex ms-2 hidden items-center gap-1 text-blue-600 hover:text-blue-700 active:text-blue-900 ${className}`}
        >
            <RotateCcw size={15} />
            Đặt lại
        </Link>
    );
}
