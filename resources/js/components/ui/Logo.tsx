import { Link } from "@inertiajs/react"

interface LogoProps {
    route? : string
}
export default function Logo({route = ''} : LogoProps) {
    return (
        <Link href={route} className="font-bold text-3xl pb-px tracking-tight text-blue-600 select-none">
            Digimart
        </Link>
    )
}