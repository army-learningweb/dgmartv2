import clsx from "clsx";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

interface ButtonQuickCreateProps {
    onOpenModal: () => void
}

export default function ButtonQuickCreate({ onOpenModal }: ButtonQuickCreateProps) {

    const [isOpenQuickCreate, setIsOpenQuickCreate] = useState<boolean>(false);
    useEffect(() => {
        const handleOpenQuickCreate = (e: Event) => {
            const scrollY = window.scrollY;
            if (scrollY >= 200) {
                setIsOpenQuickCreate(true)
            } else {
                setIsOpenQuickCreate(false)
            }
        }
        window.addEventListener("scroll", handleOpenQuickCreate);
        return () => window.removeEventListener("scroll", handleOpenQuickCreate);
    }, [])

    return (
        <div onClick={onOpenModal}
            className={clsx("fixed right-5 top-15 md:right-10 md:top-5 bg-blue-600 text-white h-10 w-10 rounded-xl flex items-center justify-center cursor-pointer hover:brightness-110 active:translate-y-0.5 transition-all duration-150 shadow-md", {
                "opacity-0 scale-95": !isOpenQuickCreate,
                "opacity-100 scale-100": isOpenQuickCreate
            })}>

            <Plus size={18} />
        </div>
    )
}