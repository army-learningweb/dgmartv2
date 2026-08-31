import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';


const variants = {
    outline: 'border border-gray-200 bg-white text-black hover:bg-gray-100',
    primary: 'border-blue-600 bg-blue-600 text-white hover:brightness-110 ',
};

interface ButtonCreateLinkProps {
    route: string;
    data?: any;
    label?: string;
    variant?: 'primary' | 'outline';
}

export default function ButtonCreateLink({
    route,
    data,
    label,
    variant = 'primary',
    ...props
}: ButtonCreateLinkProps) {
    return (
        <Link
            href={route}
            method="get"
            data={data}
            className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all duration-150 active:translate-y-0.5 ${variants[variant]}`}
            {...props}
        >
            <Plus size={15} />
            {!label && <span>Thêm mới</span>}
            {label && label}
        </Link>
    );
}
