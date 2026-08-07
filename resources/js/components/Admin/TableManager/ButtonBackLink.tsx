import { Link } from "@inertiajs/react"

interface ButtonBackLinkProps {
    route?: string;
}

export default function ButtonBackLink({ route }: ButtonBackLinkProps) {
    return (
        <Link href={route} className="active:translate-y-0.5 px-2.5 py-1.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs bg-gray-600 text-white">
            <div className="mt-px">Quay về</div>
        </Link>
    )
}