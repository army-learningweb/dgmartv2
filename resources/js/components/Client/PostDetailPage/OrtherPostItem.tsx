import { Link } from "@inertiajs/react";
import { usePage } from '@inertiajs/react';

interface OrtherPostItemProps {
    dataItem : any;
}

export default function OrtherPostItem({ dataItem }: OrtherPostItemProps) {

    const { url } = usePage();
    const path = url.split('/')[1];

    return (
        <Link
            href={`/${path}/${dataItem.slug}`}
            className="group flex items-center gap-4"
        >
            <div className="relative h-23 w-[40%] shrink-0 overflow-hidden rounded-xl bg-gray-200">
                <div className="absolute top-0 left-0 z-50 rounded-br-xl bg-black/80 px-3 py-1 text-white">
                    {dataItem.created_at}
                </div>

                <img
                    src={dataItem.image}
                    alt={dataItem.image_alt}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="space-y-1">
                <div className="line-clamp-2 font-medium group-hover:underline">
                    {dataItem.title}
                </div>
                <p className="line-clamp-2 text-gray-500">{dataItem.desc}</p>
            </div>
        </Link>
    );
}
