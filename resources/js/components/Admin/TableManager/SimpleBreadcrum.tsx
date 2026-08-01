import { Link } from "@inertiajs/react"

interface SimpleBreadcrumProps {
    currentPage: string,
    prevRoute: string,
    prevPage: string,
}

export default function SimpleBreadcrum({ prevRoute, currentPage, prevPage }: SimpleBreadcrumProps) {
    return (
        <div className="mt-px text-lg font-medium tracking-tight flex gap-2">
            <Link href={prevRoute} className="text-gray-400 font-normal hover:underline">{prevPage}</Link>
            <span>/</span>
            <div>{currentPage}</div>
        </div>
    )
}