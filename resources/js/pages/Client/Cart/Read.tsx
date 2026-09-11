import { router, usePage, Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import SliderProduct from '@/components/Client/Slider/SliderProduct';
import SectionPage from '@/components/Client/SectionPage/SectionPage';
import DestroyButton from '@/components/Client/CartPage/DestroyButton';
import CartItem from '@/components/Client/CartPage/CartItem';

import { CartPropTypes } from '@/types/module/client_cart';
import toast from 'react-hot-toast';
import OrderSumary from '@/components/Client/CartPage/OrderSumary';
import { vndFormat } from '@/lib/currency_format';

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
            <SectionPage head="Giỏ hàng" title="Giỏ hàng">
                {/* cart */}
                {Object.values(cart)?.length > 0 && (
                    <div className="flex items-start gap-4">
                        <div className="w-[70%] space-y-2 rounded-3xl bg-white p-4 shadow">
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
                        <OrderSumary total_price={total.total_price}/>
                    </div>
                )}

                {/* empty cart */}
                {Object.values(cart)?.length === 0 && (
                    <div className="mt-6 flex h-120 flex-col items-center justify-center gap-4 rounded-2xl bg-white shadow">
                        <ShoppingBag size={30} />
                        <h1 className="font-semibold">
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
