import { Link } from "@inertiajs/react";

interface NavLinkProps{
    route: string;
    name: string;
    active: boolean;
}

export default function NavLink({route,name, active} : NavLinkProps){
    return (
        <Link href={route} className={`inline-block py-2 hover:text-blue-600 ${active && 'text-blue-600'}`}>
            {name}
        </Link>
    );
}