import { ChevronsUpDown, LogOut } from 'lucide-react';
import { usePage, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import UserAvatar from "@/components/Admin/TableManager/UserAvatar";
import { Auth } from "@/types";

export default function UserSetting() {

    const { user } = usePage<{ auth: Auth }>().props.auth;
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleCLickOutSide = (e: MouseEvent) => {
            if (!isOpen) return;
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleCLickOutSide);
        return () => document.removeEventListener("mousedown", handleCLickOutSide);
    }, [isOpen])

    return (
        <div
            ref={menuRef}
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer relative select-none' flex items-center justify-between gap-2 rounded-xl transition-colors duration-150"
        >
            {/* avatar */}
            <div className="flex items-center gap-1.5">
                <UserAvatar name={user.name} />
                <ChevronsUpDown strokeWidth={1.75} size={17} />
            </div>

            {/* user popup */}
            <div
                className={clsx(
                    'absolute z-50 -top-1 -right-52 w-50 rounded-xl border border-gray-200 bg-white shadow transition-all duration-150 ease-out',
                    {
                        'pointer-events-none scale-95 opacity-0': !isOpen,
                        'pointer-events-auto scale-100 opacity-100': isOpen,
                    },
                )}
            >
                <div className="flex items-center gap-2 p-2 text-xs">
                    {/* avatar */}
                    <UserAvatar name={user.name} />
                    {/* name */}
                    <div className="flex flex-col">
                        <div>{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                    </div>
                </div>

                <hr className="border-gray-300" />

                {/* logout */}
                <div className="p-1">
                    <Link
                        href="/admin/logout"
                        method="post"
                        className="inline-flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 transition-colors duration-150 hover:bg-gray-100"
                    >
                        <LogOut size={15} className="text-gray-500" />
                        <div>Đăng xuất</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}