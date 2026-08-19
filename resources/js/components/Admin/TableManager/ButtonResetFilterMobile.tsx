import { Link } from '@inertiajs/react';
import { RotateCcw } from 'lucide-react';

interface ButtonResetFilterProps {
    route: string;
    className?: string;
}
export default function ButtonResetFilterMobile({
    route,
    className,
}: ButtonResetFilterProps) {
    return (
        <Link preserveScroll={true} href={route} className={`mt-2 bg-gray-600 md:hidden w-full py-1.75 flex gap-1 text-center items-center justify-center text-white rounded-lg active:bg-gray-700 transition-colors duration-150 ${className}`}>
            <RotateCcw size={15} />
            Đặt lại
        </Link>
    );
}
