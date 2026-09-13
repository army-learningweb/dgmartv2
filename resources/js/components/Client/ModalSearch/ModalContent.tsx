import { Link } from "@inertiajs/react";
import { vndFormat } from "@/lib/currency_format";

interface ModalContentProps{
    data: any[];
    querySearch : string;
    loadingStatus : boolean;
}

export default function ModalContent({data, querySearch, loadingStatus} : ModalContentProps){
    return (
        <>
            {/* list search */}
            <main>
                {querySearch && data?.length > 0 && (
                    <h2 className="text-lg font-medium tracking-tight">
                        Theo từ khóa tìm kiếm "{querySearch}"
                    </h2>
                )}

                {!querySearch && data?.length > 0 && (
                    <h2 className="text-lg font-medium tracking-tight">
                        Gợi ý cho bạn
                    </h2>
                )}

                {data?.length > 0 && (
                    <div className="mt-2 max-h-68 scrollbar-thin space-y-1 overflow-hidden overflow-y-auto rounded-xl">
                        {data.map((item) => (
                            <Link
                                href={`/${item.slug}`}
                                key={item.id}
                                className="flex cursor-pointer items-center gap-2 rounded-lg bg-gray-100 p-2 hover:bg-gray-200"
                            >
                                <div className="h-12 w-15 rounded-lg bg-white">
                                    <img
                                        src={item.image}
                                        alt={item.image_alt}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div>
                                    <p>{item.name}</p>
                                    <div className="flex items-center gap-2">
                                        <p
                                            className={`${
                                                item.price_discount > 0
                                                    ? 'text-gray-500 line-through'
                                                    : 'font-medium'
                                            }`}
                                        >
                                            {vndFormat(item.price)}
                                        </p>

                                        {item.price_discount && (
                                            <p className="font-medium">
                                                {vndFormat(item.price_discount)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {data?.length == 0 && querySearch && !loadingStatus && (
                    <p className="text-gray-500 italic">
                        Không tìm thấy sản phẩm !
                    </p>
                )}
            </main>
        </>
    );
}