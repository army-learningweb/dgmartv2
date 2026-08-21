import { Head } from '@inertiajs/react';
import SliderProduct from '@/components/Client/SliderProduct/SliderProduct';
import SliderCategory from '@/components/Client/SliderCategory/SliderCategory';
import { ReadDataProduct } from '@/types/module/home';
import { CategoriesData } from '@/data/categories';

export default function Read({ new_products }: ReadDataProduct) {

    return (
        <>
            <Head title="Trang chủ" />

            {/* category slider */}
            <SliderCategory data={CategoriesData} />

            {/* product slider */}
            <div className="mx-auto max-w-7xl space-y-12">
                {/* new product */}
                <SliderProduct
                    title="Mới tại cửa hàng"
                    data={new_products}
                    isShowBadgeNew
                    isShowBadgeDiscount
                />

                {/* discount product */}
                <SliderProduct
                    title="Đang giảm giá"
                    data={new_products}
                    isShowBadgeDiscount
                />
            </div>
        </>
    );
}
