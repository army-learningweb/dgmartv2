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
        <div className="fixed -bottom-5 z-50 w-full">
            <div className="mx-auto w-220 rounded-2xl border border-gray-200 bg-gray-100 p-1 shadow-lg">
                <div className="flex items-center justify-between rounded-xl bg-white px-4 shadow">
                    <div className="flex items-center gap-4">
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
                    <div>
                        <Select
                            name="version"
                            className="w-50!"
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
                    </div>

                    {/* Giá sản phẩm */}
                    <div className="text-lg font-medium">
                        {vndFormat(version?.price)}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={onAddToCart}
                            size="small"
                            animatePress={true}
                            className="cursor-pointer"
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
