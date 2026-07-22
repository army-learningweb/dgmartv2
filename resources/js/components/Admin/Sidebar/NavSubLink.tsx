import { Link } from "@inertiajs/react"
import clsx from "clsx"

interface NavSubLinkProps{
    route?:string
    name:string
    isActive?:boolean
}

export default function NavSubLink({route,name, isActive}:NavSubLinkProps) {
    return (
        <Link href={route} className={clsx("py-1.5 px-2 rounded-lg transition-colors duration-150",{
            "bg-white shadow-md md:shadow" : isActive,
            "hover:bg-white hover:shadow" : !isActive
        })}>
            {name}
        </Link>
    )
}