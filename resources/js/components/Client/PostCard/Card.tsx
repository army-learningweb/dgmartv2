import CardDesc from "./CardDesc";
import CardImage from "./CardImage";
import CardTitle from "./CardTitle";
import { Link } from "@inertiajs/react";

interface CardProps {
    dataItem: any;
    url?: string;
}

export default function Card({ dataItem, url }: CardProps) {
    return (
        <div
            className="w-60 h-70 shrink-0 overflow-hidden rounded-2xl bg-white transition-all duration-250 ease-out select-none hover:shadow-lg hover:-translate-y-1 p-2 shadow"
        >
            {/* image */}
            <CardImage dataImage={dataItem.media} route={dataItem.slug}/>

            <div className="space-y-2 p-2">
                <CardTitle title={dataItem.title} />
                <CardDesc desc={dataItem.desc} route={dataItem.slug}/>
            </div>
        </div>
    );
}
