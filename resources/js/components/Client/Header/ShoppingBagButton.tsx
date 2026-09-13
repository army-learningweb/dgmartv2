import { Link, usePage } from "@inertiajs/react";
import { ShoppingBag } from "lucide-react";

export default function ShoppingBagButton(){

    const total: any = usePage().props.total;
    const { url } = usePage();

    return (
        <Link
            href="/gio-hang"
            className="relative"
        >
            <ShoppingBag
                size={20}
                className={`${url == '/gio-hang' && 'text-blue-600'}`}
            />

            {total?.count > 0 && (
                <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[11px] font-medium text-white select-none">
                    {total.count}
                </div>
            )}
        </Link>
    );
}