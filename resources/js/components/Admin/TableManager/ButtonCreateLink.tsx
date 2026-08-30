import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface ButtonCreateLinkProps {
    route: string;
    data?: any;
    label?: string;
}

export default function ButtonCreateLink({
    route,
    data,
    label,
    ...props
}: ButtonCreateLinkProps) {
    return (
        <Link
            href={route}
            method="get"
            data={data}
            className="flex items-center gap-1 rounded-lg border border-blue-600 bg-blue-600 px-2.5 py-1.5 text-xs font-medium text-white transition-all duration-150 hover:brightness-110 active:translate-y-0.5"
            {...props}
        >
            <Plus size={15} />
            {!label && <span>Thêm mới</span>}
            {label && label}
        </Link>
    );
}
