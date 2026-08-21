import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function CategoryCard({dataItem, dataIndex} : any){
    return (
        <Link
            className={clsx(
                'relative w-101 shrink-0 overflow-hidden rounded-2xl shadow hover:scale-101 hover:shadow-lg transition-all duration-250 ease-out',
                {
                    'bg-white': dataIndex % 2 === 0,
                    'bg-black text-gray-200': dataIndex % 2 !== 0,
                },
            )}
        >
            <div className="absolute top-10 left-10 w-80 space-y-2">
                <h2 className="text-2xl font-medium tracking-tight">
                    {dataItem.title}
                </h2>
                <p>{dataItem.desc}</p>
            </div>
            <img
                src={dataItem.src}
                alt={dataItem.alt}
                className="mt-18 h-full w-full object-cover"
            />
        </Link>
    );
}