import { Link } from "@inertiajs/react"

interface LogoProps {
    route? : string
    className?: string;
}
export default function Logo({route = '', className} : LogoProps) {
    return (
        <Link href={route} className={`font-bold text-3xl pb-px tracking-tight text-blue-600 select-none ${className}`}>
            Digimart
        </Link>
    )
}