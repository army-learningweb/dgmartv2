import clsx from "clsx"
import Badge from "@/components/ui/Badge"

interface SwitchStatus {
    status: "active" | "inactive";
    onUpdate: () => void;
}

export default function SwitchStatus({status, onUpdate} : SwitchStatus) {
    return (
        <div className="flex items-center justify-between gap-1 w-30">
            <div className="w-[70%]">
                <Badge status={status} />
            </div>

            <div onClick={onUpdate} className="w-10 cursor-pointer">
                <div className={clsx("bg-gray-100 p-0.5 rounded-xl", {
                    "bg-gray-200": status === "inactive",
                    "bg-green-600": status === "active"
                })}>
                    <div className={clsx("w-3.75 h-3.75 rounded-full bg-white shadow border border-gray-200 transition-transform duration-150", {
                        "translate-x-0": status === "inactive",
                        "translate-x-4.75": status === "active"
                    })}></div>
                </div>
            </div>
        </div>
    )
}