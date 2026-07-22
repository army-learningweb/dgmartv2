import { userAvatar } from "@/lib/users"
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { usePage, Link } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import UserAvatar from "@/components/ui/UserAvatar";
import { Auth } from "@/types";
export default function UserSetting() {

    const { user } = usePage<{ auth: Auth }>().props.auth;
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleCLickOutSide = (e:MouseEvent) => {
            if(!isOpen) return;
            if(menuRef.current && !menuRef.current.contains(e.target as Node)){
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown",handleCLickOutSide);
        return () => document.removeEventListener("mousedown",handleCLickOutSide);
    },[isOpen])

    return (
        <div ref={menuRef} onClick={() => setIsOpen(!isOpen)} className={clsx("select-none flex justify-between items-center gap-2 md:mb-8.5 p-2 rounded-xl transition-colors duration-150 relative", {
            "bg-white shadow-md md:shadow": isOpen,
            "hover:bg-white md:hover:shadow": !isOpen
        })}>
            {/* avatar */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center">
                    {userAvatar(user.name)}
                </div>
                <div>{user.name}</div>
            </div>
            <ChevronsUpDown strokeWidth={1.75} size={17} />

            {/* user popup */}
            <div className={clsx("absolute -top-27 right-0 bg-white border border-gray-200 shadow w-full rounded-xl transition-all duration-150", {
                'opacity-0 scale-95 translate-y-2 pointer-events-none': !isOpen,
                'opacity-100 scale-100 translate-y-0 pointer-events-auto': isOpen
            })}>
                <div className="flex items-center gap-2 p-2 text-xs">
                    {/* avatar */}
                    <UserAvatar name={user.name}/>
                    {/* name */}
                    <div className="flex flex-col">
                        <div>{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                    </div>
                </div>

                <hr className="border-gray-300" />

                {/* logout */}
                <div className="p-1">
                    <Link href="/admin/logout" method="post" className="py-1.5 px-2.5 inline-flex gap-2 items-center w-full hover:bg-gray-100 rounded-lg transition-colors duration-150">
                        <LogOut size={15} className="text-gray-500" />
                        <div>Đăng xuất</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}