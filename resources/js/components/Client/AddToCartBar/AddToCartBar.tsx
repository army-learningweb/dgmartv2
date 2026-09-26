import Select from "@/components/ui/Select";
import { vndFormat } from "@/lib/currency_format";
import Button from "@/components/ui/Button";
import { ShoppingBag } from "lucide-react";

import { ProductDetailsProps } from "@/types/module/client_product";

interface AddtoCartBarProps {
    data: ProductDetailsProps;
    onChangeVersion: (value: number) => void;
    onAddToCart: () => void;
    version: any;
}

export default function AddToCartBar({ data, version, onChangeVersion, onAddToCart } : AddtoCartBarProps) {
    return (
        <div className="fixed inset-x-0 -bottom-5 z-50 w-full">
            <div className="mx-auto w-[calc(95%-1rem)] rounded-2xl border border-gray-200 bg-gray-100 p-1 shadow-lg md:w-220">
                <div className="flex flex-col items-center justify-between gap-3 rounded-xl bg-white p-3 shadow md:flex-row">
                    <div className="hidden items-center gap-4 md:flex">
                        {/* Ảnh sản phẩm */}
                        <img
                            src={data.image.file_url}
                            alt={data.image.file_name}
                            className="h-auto w-15"
                        />

                        {/* Tên sản phẩm */}
                        <p className="w-50 truncate text-[15px] font-medium">
                            {data.name}
                        </p>
                    </div>

                    {/* Chọn phiên bản */}
                    <div className="flex gap-4 items-center w-full md:w-fit">
                        <Select
                            name="version"
                            className="md:w-50! w-full!"
                            onChange={(e) =>
                                onChangeVersion(Number(e.target.value))
                            }
                        >
                            {data.variants?.length > 0 &&
                                data.variants.map((variant, index) => (
                                    <option
                                        key={variant.id}
                                        value={variant.id}
                                        className="truncate"
                                    >
                                        Phiên bản {index + 1} ({variant.code})
                                    </option>
                                ))}
                        </Select>

                        {/* Giá sản phẩm */}
                        <div className="text-lg font-medium">
                            {vndFormat(version?.price)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-fit">
                        <Button
                            onClick={onAddToCart}
                            size="small"
                            animatePress={true}
                            className="cursor-pointer w-full! md:w-fit!"
                        >
                            <ShoppingBag size={17} />
                            Thêm vào giỏ hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
