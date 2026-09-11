import { Link } from "@inertiajs/react";
import { vndFormat } from "@/lib/currency_format";

interface OtherProductItemProps {
    dataItem : any
}

export default function OtherProductItem({dataItem} : OtherProductItemProps){
    return (
        <Link
            href={`/${dataItem.slug}`}
            key={dataItem.id}
            className="group flex items-center gap-4"
        >
            <div className="relative h-20 w-30 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <img
                    src={dataItem.image.file_url}
                    alt=""
                    className="h-full w-full object-contain"
                />

                {dataItem.variants?.[0]?.discount && (
                    <div className="absolute top-0 left-0 rounded-br-xl bg-red-600 px-2 py-0.5 text-xs text-white">
                        Giảm {dataItem.variants?.[0]?.discount}%
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <p className="line-clamp-1 group-hover:underline">
                    {dataItem.name}
                </p>
                <p className="line-clamp-1 text-gray-500">{dataItem.desc}</p>
                <div className="flex gap-4">
                    <p
                        className={`${dataItem.variants?.[0]?.discount ? 'line-through' : 'font-medium'}`}
                    >
                        {vndFormat(dataItem.variants?.[0]?.price)}
                    </p>
                    {dataItem.variants?.[0]?.discount && (
                        <p className="font-medium">
                            {vndFormat(dataItem.variants?.[0].price_discount)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}