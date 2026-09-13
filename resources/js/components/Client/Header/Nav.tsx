import { usePage } from '@inertiajs/react';
import NavLink from './NavLink';
import { NavigationData } from '@/data/Navigation';

interface NavProps {
    className?:string
}

export default function Nav({className} : NavProps) {
    const { url } = usePage();

    return (
        <nav className={`mt-1 ${className}`}>
            <div className="flex justify-center gap-5 font-medium">
                {NavigationData.map((item, index) => (
                    <NavLink
                        key={index}
                        name={item.name}
                        route={item.route}
                        active={item.route == "/" ? url == "/" : url.startsWith(item.route)}
                    />
                ))}
            </div>
        </nav>
    );
}
