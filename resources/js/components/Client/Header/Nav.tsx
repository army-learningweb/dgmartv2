import { usePage } from '@inertiajs/react';
import NavLink from './NavLink';
import { NavigationData } from '@/data/Navigation';

interface NavProps {
    className?:string
}

export default function Nav({className} : NavProps) {
    const { url } = usePage();

    return (
        <nav className={`md:mt-1 ${className}`}>
            <div className="flex flex-col md:flex-row justify-center md:gap-5 font-medium px-5 md:px-0 py-2 md:py-0 bg-white">
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
