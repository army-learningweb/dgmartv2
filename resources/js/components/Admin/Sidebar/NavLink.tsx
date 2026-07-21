import { Link, usePage } from "@inertiajs/react"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react";
import clsx from "clsx"

interface NavLinkProps extends React.ComponentPropsWithoutRef<"div"> {
    children?: React.ReactNode;
    icon: React.ReactNode;
    name: string;
    route?: string;
    isActive?: boolean;
    urlActiveOpen?: boolean;
}

export default function NavLink({ route, isActive, name, icon, urlActiveOpen, children, ...props }: NavLinkProps) {

    const [isOpen, setIsOpen] = useState(urlActiveOpen);
    const handleSetIsOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    const { url } = usePage();
    useEffect(() => {
        urlActiveOpen ? setIsOpen(true) : setIsOpen(false);
    },[url])

    return (
        <>
            {/* Single Link */}
            {!children && (
                <Link href={route} className={clsx("flex items-center gap-2 py-1.5 px-2 rounded-lg transition-colors duration-150", {
                    "bg-white shadow": isActive,
                    "hover:bg-white hover:shadow": !isActive
                })}>
                    {icon}
                    <div className="mt-px">{name}</div>
                </Link>
            )}

            {/* Group Link */}
            {children && (
                <>
                    <div onClick={handleSetIsOpen} className={clsx("flex items-center justify-between gap-2 py-1.5 px-2 rounded-lg hover:bg-white hover:shadow transition-colors duration-150 select-none", {
                        "bg-white shadow": isActive,
                        "hover:bg-white hover:shadow": !isActive
                    })} {...props} >

                        <div className="flex items-center gap-2">
                            {icon}
                            <div className="mt-px">{name}</div>
                        </div>

                        <ChevronDown strokeWidth={1.75} size={17} className={clsx("transition-transform duration-150", {
                            "rotate-90": isOpen,
                            "rotate-0": !isOpen
                        })} />
                    </div>

                    <div className={clsx("ms-4 border-l border-gray-300 w-full py-1 pl-2 pr-4 flex flex-col gap-1 transition-transform duration-150", {
                        "block": isOpen,
                        "hidden": !isOpen
                    })}>
                        {children}
                    </div>
                </>
            )}
        </>
    )
}