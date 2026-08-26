import { Head } from '@inertiajs/react';
import SliderProduct from '@/components/Client/Slider/SliderProduct';
import SliderCategory from '@/components/Client/Slider/SliderCategory';
import SliderPost from '@/components/Client/Slider/SliderPost';
import Banner from '@/components/Client/Home/Banner';

import { ReadDataProduct } from '@/types/module/home';
import { CategoriesData } from '@/data/categories';
import Policy from '@/components/Client/Home/Policy';

export default function Read({ new_products, discount_products, posts }: ReadDataProduct) {
    return (
        <>
            <Head title="Trang chủ" />

            {/* banner */}
            <Banner />

            {/* policy */}
            <Policy />

            {/* category slider */}
            <SliderCategory data={CategoriesData} />

            {/* new product */}
            <SliderProduct
                title="Xem ngay có gì mới"
                desc="Cập nhật những thiết bị công nghệ mới nhất, dẫn đầu xu hướng với công nghệ hiện đại."
                data={new_products}
                isShowBadgeNew
                isShowBadgeDiscount
            />

            {/* discount product */}
            <SliderProduct
                title="Đang giảm giá"
                desc="Săn ngay các sản phẩm chính hãng với mức giá hấp dẫn cùng chính sách ưu đãi giới hạn."
                data={discount_products}
                isShowBadgeDiscount
            />

            {/* posts */}
            <SliderPost
                title="Bài viết & Tin tức"
                desc="Khám phá các bài viết đánh giá chi tiết, thủ thuật máy tính hữu ích và xu hướng công nghệ nổi bật mỗi ngày."
                data={posts}
            />
        </>
    );
}
