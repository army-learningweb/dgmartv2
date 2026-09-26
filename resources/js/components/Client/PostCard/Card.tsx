import { usePage } from "@inertiajs/react";
import CardDesc from "./CardDesc";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";
import CardDate from "./CardDate";

interface CardProps {
    dataItem: any;
    className?:string;
}

export default function Card({ dataItem, className }: CardProps) {

    const { url } = usePage();
    let path = url.split("?")[0];
    if( path == '/' ) path = 'bai-viet-tin-tuc';
    
    
    return (
        <div
            className={`relative h-fit w-60 shrink-0 overflow-hidden rounded-3xl bg-white p-2.5 shadow transition-all duration-250 ease-out select-none last-of-type:mr-4 hover:-translate-y-1 hover:shadow-lg md:last-of-type:mr-0 ${className}`}
        >
            {/* date */}
            <CardDate date={dataItem.created_at} />

            {/* image */}
            <CardImage
                src={dataItem.image}
                alt={dataItem.image_name}
                route={`${path}/${dataItem.slug}`}
            />

            {/* info */}
            <div className="space-y-2 p-2">
                <CardTitle
                    title={dataItem.title}
                    route={`${path}/${dataItem.slug}`}
                />
                <CardDesc
                    desc={dataItem.desc}
                    route={`${path}/${dataItem.slug}`}
                />
            </div>
        </div>
    );
}
