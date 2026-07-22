import { Link } from "@inertiajs/react"
import clsx from "clsx"

interface LinkPaggingProps {
    icon: React.ReactNode;
    disabledUrl: string;
    url: string;
}

export default function LinkPagging({ icon, disabledUrl, url }: LinkPaggingProps) {
    return (
        <Link href={url ?? "#"} className={clsx("border border-gray-200 rounded-lg p-1.5 hover:bg-gray-100 transtion-all duration-150 active:translate-y-0.5", {
            "opacity-50 pointer-events-none": !disabledUrl,
            "opacity-100 pointer-events-auto": disabledUrl
        })}>
            {icon}
        </Link>
    )
}