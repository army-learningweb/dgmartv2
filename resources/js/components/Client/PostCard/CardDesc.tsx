import { Link } from '@inertiajs/react';

interface CardDescProps {
    desc: string;
    route: string;
}
export default function CardDesc({ desc, route }: CardDescProps) {
    return (
        <div className="flex flex-col items-start">
            <p className="line-clamp-2 text-gray-600">{desc}</p>
                <Link
                    href={route}
                    className="mt-2 text-sm text-blue-600 hover:underline"
                >
                    Xem thêm...
                </Link>
            
        </div>
    );
}