import { router, usePage, Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import SliderProduct from '@/components/Client/Slider/SliderProduct';
import SectionPage from '@/components/Client/SectionPage/SectionPage';
import DestroyButton from '@/components/Client/CartPage/DestroyButton';
import CartItem from '@/components/Client/CartPage/CartItem';

import { CartPropTypes } from '@/types/module/client_cart';
import toast from 'react-hot-toast';
import OrderSumary from '@/components/Client/CartPage/OrderSumary';

export default function Read({ cart, products_suggest }: CartPropTypes) {
    // Tổng giỏ hàng
    const total: any = usePage().props.total;

    // Hàm route dùng chung
    const action = (route: string) => {
        router.post(
            route,
            {},
            {
                only: ['cart', 'total'],
                preserveScroll: true,
                onError: (error) => {
                    toast.error(error[0]);
                },
            },
        );
    };

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
        <div className="mb-10">
            <SectionPage
                head="Giỏ hàng"
                title={Object.values(cart)?.length > 0 && 'Giỏ hàng'}
            >
                {/* cart */}
                {Object.values(cart)?.length > 0 && (
                    <div className="flex items-start gap-4">
                        <div className="w-[70%] space-y-1 rounded-3xl bg-white px-4 py-2 shadow">
                            <div className="flex items-center justify-between">
                                <h2 className="my-2 text-lg font-medium tracking-tight">
                                    Sản phẩm trong giỏ ({total.count})
                                </h2>

                                <DestroyButton onClick={handleRemoveAll} />
                            </div>

                            {/* data cart */}
                            {Object.values(cart).map((item) => (
                                <CartItem
                                    key={item.product_id + item.variant_id}
                                    dataItem={item}
                                    onDecrease={handleDecrease}
                                    onIncrease={handleIncrease}
                                    onRemove={handleRemove}
                                />
                            ))}
                        </div>

                        {/* order sumary */}
                        <div className="sticky top-5 flex-1">
                            <OrderSumary total_price={total.total_price} />
                        </div>
                    </div>
                )}

                {/* empty cart */}
                {Object.values(cart)?.length === 0 && (
                    <div className="flex flex-col items-center justify-center px-4 py-20">
                        <div className="mb-6 rounded-full bg-blue-50 p-5">
                            <ShoppingBag
                                size={30}
                                className="text-blue-500"
                                strokeWidth={1.5}
                            />
                        </div>

                        <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                            Giỏ hàng của bạn đang trống
                        </h3>
                        <p className="mb-6 max-w-sm text-center text-gray-500">
                            Hãy khám phá các sản phẩm nổi bật và thêm vào giỏ
                            hàng của bạn nhé!
                        </p>

                        <Link
                            href="/laptop"
                            className="rounded-lg bg-blue-600 px-3 py-1.75 font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            Khám phá sản phẩm
                        </Link>
                    </div>
                )}
            </SectionPage>

            {/* new product */}
            {Object.values(cart)?.length > 0 && (
                <SliderProduct
                    title="Có thể bạn sẽ thích"
                    desc="Xem thêm một số phẩm tương tự."
                    data={products_suggest.data}
                    className="mt-8"
                />
            )}
        </div>
    );
}
