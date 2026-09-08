import { Head, router, usePage, Link } from '@inertiajs/react';
import { Plus, Minus, Trash, X, MonitorCog, ShoppingBag } from 'lucide-react';
import { CartPropTypes } from '@/types/module/client_cart';
import { vndFormat } from '@/lib/currency_format';
import Button from '@/components/ui/Button';
import SliderProduct from '@/components/Client/Slider/SliderProduct';

export default function Read({ cart, products_suggest }: CartPropTypes) {

    // Tổng số sản phẩm
    const total : any = usePage().props.total;

    // Hàm route dùng chung
    const action = (route: string) => {
        router.post(route,{},{ only: ['cart', 'total'], preserveScroll: true });
    }

    // Xóa 1
    const handleRemove = (key: number) => {
        action(`/gio-hang/${key}/delete`);
    };

    // Xóa tất cả
    const handleRemoveAll = () => {
        if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm trong giỏ hàng')) {
            router.post(
                `/gio-hang/destroy`,
                {},
                { only: ['cart', 'total'], preserveScroll: true },
            );
        }
    };

    // Tăng số lượng
    const handleIncrease = (key: number) => {
        action(`/gio-hang/${key}/increase`);
    };

    // Giảm số lượng
    const handleDecrease = (key: number, qty: number) => {
        if (qty === 1) {
            if (confirm('Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng')) {
                router.post(
                    `/gio-hang/${key}/decrease`,
                    {},
                    { only: ['cart', 'total'], preserveScroll: true },
                );
            }
            return;
        } else {
            router.post(
                `/gio-hang/${key}/decrease`,
                {},
                { only: ['cart', 'total'], preserveScroll: true },
            );
        }
    };

    return (
        <>
            <Head title="Giỏ hàng" />

            <div className="mx-auto max-w-312 space-y-8">
                {Object.values(cart)?.length > 0 && (
                    <h1 className="my-10 inline-block text-5xl font-bold tracking-tight select-none">
                        Giỏ hàng
                    </h1>
                )}

                {Object.values(cart)?.length > 0 && (
                    <>
                        <div className="flex items-start gap-4">
                            <div className="w-[70%] space-y-2 rounded-3xl bg-white p-4 shadow">
                                <div className="flex items-center justify-between">
                                    <h2 className="my-2 text-lg font-medium tracking-tight">
                                        Sản phẩm trong giỏ ({total.count})
                                    </h2>

                                    {Object.values(cart)?.length > 0 && (
                                        <div
                                            onClick={handleRemoveAll}
                                            className="flex cursor-pointer items-center justify-center rounded-md bg-red-50 p-1 text-xs font-medium text-red-600 transition-all duration-150 hover:bg-red-100 active:scale-90"
                                        >
                                            <X size={20} />
                                        </div>
                                    )}
                                </div>

                                {Object.values(cart).map((item) => (
                                    <div key={item.product_id + item.key}>
                                        <div className="flex items-center justify-between pr-1 pb-2">
                                            <div className="flex items-center gap-4">
                                                {/* Ảnh */}
                                                <div className="relative flex h-20 w-30 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2">
                                                    <img
                                                        src={item.image}
                                                        alt={item.image_alt}
                                                        className="h-full w-full object-contain"
                                                    />

                                                    {item.discount > 0 && (
                                                        <div className="absolute top-0 left-0 z-50 rounded-br-xl bg-red-600 px-2 py-0.75 text-[10px] font-medium text-white">
                                                            Giảm {item.discount}
                                                            %
                                                        </div>
                                                    )}
                                                </div>

                                                {/* tên */}
                                                <div className="cursor-pointer space-y-2">
                                                    <p className="w-50 truncate">
                                                        {item.name}
                                                    </p>
                                                    <div className="flex w-fit items-center gap-2 rounded-md border border-gray-200 bg-gray-100 px-3 py-1.25 text-xs font-medium">
                                                        <MonitorCog size={17} />
                                                        <span>
                                                            Xem cấu hình...
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* giá */}
                                            <div className="w-25">
                                                <p
                                                    className={`${item.price_discount ? 'text-gray-500 line-through' : 'font-semibold'}`}
                                                >
                                                    {vndFormat(item.price)}
                                                </p>

                                                {item.price_discount > 0 && (
                                                    <p className="font-medium">
                                                        {vndFormat(
                                                            item.price_discount,
                                                        )}
                                                    </p>
                                                )}
                                            </div>

                                            {/* tăng giảm số lượng */}
                                            <div className="flex items-center gap-1">
                                                <div
                                                    onClick={() =>
                                                        handleDecrease(
                                                            item.key,
                                                            item.qty,
                                                        )
                                                    }
                                                    className="cursor-pointer rounded-md bg-gray-200 p-1 transition-transform duration-200 ease-out active:scale-75"
                                                >
                                                    <Minus size={18} />
                                                </div>
                                                <div className="rounded-md border border-gray-200 px-4 py-0.75">
                                                    <input
                                                        type="number"
                                                        name="number"
                                                        id="number"
                                                        value={item.qty}
                                                        readOnly
                                                        className="w-5 text-center select-none focus:ring-0 focus:outline-none"
                                                    />
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleIncrease(item.key)
                                                    }
                                                    className="cursor-pointer rounded-md bg-gray-200 p-1 transition-transform duration-200 ease-out active:scale-75"
                                                >
                                                    <Plus size={18} />
                                                </div>
                                            </div>

                                            {/* Tổng tiền của sản phẩm  */}
                                            <div className="w-30 font-medium select-none">
                                                {vndFormat(item.total)}
                                            </div>

                                            {/* Xóa */}
                                            <Trash
                                                size={18}
                                                onClick={() =>
                                                    handleRemove(item.key)
                                                }
                                                className="text-gray-500 hover:text-red-600"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex-1 space-y-3 rounded-3xl bg-white p-4 shadow select-none">
                                <h2 className="my-2 text-lg font-medium tracking-tight">
                                    Tạm tính
                                </h2>

                                <hr className="mt-3 border-gray-200" />

                                <div className="flex items-center justify-between">
                                    <span>Phí vận chuyển:</span>
                                    <span className="text-gray-500">
                                        Miễn phí
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span>Tổng:</span>
                                    <span className="text-lg font-medium">
                                        {vndFormat(total.total_price)}
                                    </span>
                                </div>

                                <Button className="w-full">
                                    Tiến hành thanh toán
                                </Button>
                            </div>
                        </div>
                    </>
                )}

                {Object.values(cart)?.length === 0 && (
                    <div className="mt-6 flex h-120 flex-col items-center justify-center gap-4 rounded-2xl bg-white shadow">
                        <ShoppingBag size={35} />
                        <h1 className="text-lg tracking-tighter">
                            Giỏ hàng hiện đang trống !
                        </h1>
                        <Link
                            href="/laptop"
                            className="text-blue-600 hover:underline"
                        >
                            Ghé cửa hàng
                        </Link>
                    </div>
                )}
            </div>

            {/* new product */}
            {Object.values(cart)?.length > 0 && (
                <SliderProduct
                    title="Có thể bạn sẽ thích"
                    desc="Xem thêm một số phẩm tương tự."
                    data={products_suggest.data}
                />
            )}
        </>
    );
}
