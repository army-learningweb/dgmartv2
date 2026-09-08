import { Head } from '@inertiajs/react';
import SliderProduct from '@/components/Client/Slider/SliderProduct';
import SliderCategory from '@/components/Client/Slider/SliderCategory';
import SliderPost from '@/components/Client/Slider/SliderPost';
import Banner from '@/components/Client/Home/Banner';
import Policy from '@/components/Client/Home/Policy';

import { ReadData } from '@/types/module/home';
import { CategoriesData } from '@/data/Categories';

export default function Read({ onshop_products, accessories_products, posts }: ReadData) {
    return (
        <>
            <Head title="Trang chủ" />

            {/* banner */}
            <Banner />

            {/* policy */}
            <Policy />

            {/* category slider */}
            <SliderCategory data={CategoriesData} />

            {/* on shop  */}
            <SliderProduct
                title="Có tại cửa hàng"
                desc="Khám phá các sản phẩm công nghệ đang có mặt trực tiếp tại cửa hàng."
                data={onshop_products.data}
            />

            {/* on shop  */}
            <SliderProduct
                title="Phụ kiện Laptop"
                desc="Tiện ích hơn mỗi ngày với phụ kiện."
                data={accessories_products.data}
            />

            {/* posts */}
            <SliderPost
                title="Bài viết & Tin tức"
                desc="Khám phá các bài viết đánh giá chi tiết, thủ thuật máy tính hữu ích và xu hướng công nghệ nổi bật mỗi ngày."
                data={posts.data}
            />
        </>
    );
}
