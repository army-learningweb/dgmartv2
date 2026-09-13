import { Link } from "@inertiajs/react";
import clsx from "clsx";

export default function CategoryCard({dataItem, dataIndex} : any){
    return (
        <Link
            href={dataItem.route}
            className={clsx(
                'relative inline-block w-75 shrink-0 overflow-hidden rounded-2xl shadow transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-lg',
                {
                    'bg-white': dataIndex % 2 === 0,
                    'bg-black text-gray-200': dataIndex % 2 !== 0,
                },
            )}
        >
            <div className="absolute top-0 left-0 space-y-2 p-4">
                <h2 className="text-xl font-medium tracking-tight">
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