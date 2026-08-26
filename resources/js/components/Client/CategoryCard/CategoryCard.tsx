import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function CategoryCard({dataItem, dataIndex} : any){
    return (
        <Link
            className={clsx(
                'relative w-75 shrink-0 overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all duration-250 ease-out border border-gray-200 inline-block hover:-translate-y-1',
                {
                    'bg-white': dataIndex % 2 === 0,
                    'bg-black text-gray-200': dataIndex % 2 !== 0,
                },
            )}
        >
            <div className="absolute top-0 left-0 p-4 space-y-2">
                <h2 className="text-xl font-medium tracking-tight">
                    {dataItem.title}
                </h2>
                <p>{dataItem.desc}</p>
            </div>
            <img
                src={dataItem.src}
                alt={dataItem.alt}
                className="mt-18 w-full h-full object-cover"
            />
        </Link>
    );
}