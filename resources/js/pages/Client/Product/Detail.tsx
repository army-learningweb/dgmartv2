import { Head, router } from '@inertiajs/react';
import { ProductDetailProps } from '@/types/module/client_product';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { vndFormat } from '@/lib/currency_format';
import parse from 'html-react-parser';

import OtherProducts from '@/components/Client/ProductDetailPage/OtherProducts';
import AddToCartBar from '@/components/Client/AddToCartBar/AddToCartBar';

export default function Detail({
    product,
    products_suggest,
}: ProductDetailProps) {
    const imageRef = useRef<HTMLUListElement>(null);
    const [imageWidth, setImageWidth] = useState(0);
    const [index, setIndex] = useState<number>(0);
    const sliderTurn = product.data.childs_image.length - 1;

    // Thay đổi giá & Phiên bản
    const [version, setVersion] = useState({
        variant_id: product.data.variants?.[0]?.id,
        price:
            product.data.variants?.[0]?.price_discount ??
            product.data.variants?.[0]?.price,
    });

    // Thông tin sản phẩm và phiên bản đã chọn
    const [choosed, setChoosed] = useState({
        product_id: product.data.id,
        version_id: product.data.variants?.[0].id,
    });

    // Thay đổi phiên bản
    const handleChangeVersion = (id: number) => {
        const price =
            product.data.variants?.filter((item) => item.id === id)[0]
                .price_discount ??
            product.data.variants?.filter((item) => item.id === id)[0]
                .price_discount;

        setVersion((prev) => ({ ...prev, variant_id: id, price: price }));
        setChoosed((prev) => ({ ...prev, version_id: id }));
    };

    // Thêm vào giỏ hàng
    const handleAddCart = () => {
        router.post('/gio-hang/create', choosed, {
            preserveState: true,
        });
    };

    // Lấy chiều dài của ảnh
    useEffect(() => {
        const slider = imageRef.current;
        if (!slider) return;

        const updateImageWidth = () => {
            setImageWidth(slider.getBoundingClientRect().width);
        };

        updateImageWidth();
        const resizeObserver = new ResizeObserver(updateImageWidth);
        resizeObserver.observe(slider);

        return () => resizeObserver.disconnect();
    }, [product.data.id, product.data.childs_image.length]);


    // Hành động Slider
    const handleSlide = (action: string) => {
        if (action === 'plus') {
            if (index === sliderTurn) return;
            setIndex((prev) => prev + 1);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    // Hành động click vào chấm tròn
    const handleClickDot = (index: number) => {
        setIndex(index);
    };

    return (
        <>
            {/* add to cart */}
            <AddToCartBar
                data={product.data}
                onAddToCart={handleAddCart}
                onChangeVersion={handleChangeVersion}
                version={version}
            />

            <Head title="Chi tiết sản phẩm" />
            <div className="mx-auto mt-4 min-h-400 max-w-312 px-5 md:px-0">
                {/* name & desc */}
                <div className="my-10 space-y-4 pt-4 md:w-150 md:pt-0">
                    <h1 className="text-4xl font-bold">{product.data.name}</h1>
                    <h2 className="text-[15px] text-gray-500">
                        {product.data.desc}
                    </h2>
                </div>

                <div className="flex flex-col items-start gap-5 md:flex-row">
                    {/* image */}
                    <div className="flex w-full flex-col items-center rounded-3xl bg-white shadow md:sticky md:top-19 md:w-[60%]">
                        <div className="relative w-full overflow-hidden rounded-3xl py-5">
                            {product.data.childs_image?.length > 0 ? (
                                <ul
                                    ref={imageRef}
                                    style={{
                                        transform: `translateX(-${index * imageWidth}px)`,
                                    }}
                                    className="flex w-full flex-nowrap transition-all duration-200"
                                >
                                    {product.data.childs_image.map((image) => (
                                        <li
                                            key={image.id}

                                            className="w-full shrink-0"
                                        >
                                            <img
                                                src={image.file_url}
                                                alt={image.file_name}
                                                className="h-90 w-full object-contain"
                                            ></img>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <img
                                    src={product.data.image.file_url}
                                    alt={product.data.image.file_name}
                                    className="h-90 w-full object-contain"
                                ></img>
                            )}

                            {/* buttonslider */}
                            <div className="pointer-events-none absolute top-1/2 flex w-full justify-between px-6">
                                <div
                                    onClick={() => handleSlide('minus')}
                                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-all duration-150 active:translate-y-0.5 ${
                                        index >= 1
                                            ? 'pointer-events-auto scale-100 opacity-100'
                                            : 'pointer-events-none scale-95 opacity-0'
                                    }`}
                                >
                                    <ChevronLeft />
                                </div>

                                <div
                                    onClick={() => handleSlide('plus')}
                                    className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-200 transition-all duration-150 active:translate-y-0.5 ${
                                        index < sliderTurn
                                            ? 'pointer-events-auto scale-100 opacity-100'
                                            : 'pointer-events-none scale-95 opacity-0'
                                    }`}
                                >
                                    <ChevronRight />
                                </div>
                            </div>
                        </div>

                        <div className="my-4 flex w-fit gap-2 rounded-2xl px-3 py-2">
                            {product.data.childs_image.map((item, indexDot) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleClickDot(indexDot)}
                                    className={`h-2 w-2 cursor-pointer rounded-full ${index == indexDot ? 'bg-blue-600' : 'bg-gray-300'}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* info */}
                    <div className="w-full space-y-4 select-none md:w-[40%]">
                        {/* versions */}
                        <div className="grid flex-1 grid-cols-1 gap-5">
                            {product.data.variants.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl bg-white p-4 shadow"
                                >
                                    <h3 className="flex items-center justify-between text-lg font-medium tracking-tight">
                                        <p>
                                            Phiên bản {index + 1}{' '}
                                            <span className="font-normal text-gray-500">
                                                ({item.code})
                                            </span>
                                        </p>
                                        {item.discount && (
                                            <p className="rounded-xl bg-red-50 px-3 py-1 text-xs text-red-600">
                                                Giảm {item.discount}%
                                            </p>
                                        )}
                                    </h3>

                                    <hr className="my-3 border-gray-200" />

                                    <div className="flex gap-4">
                                        <p
                                            className={`text-xl ${item.discount ? 'text-gray-500 line-through' : 'font-medium'}`}
                                        >
                                            {vndFormat(item.price)}
                                        </p>

                                        {item.discount && (
                                            <p className="text-xl font-medium">
                                                {vndFormat(item.price_discount)}
                                            </p>
                                        )}
                                    </div>

                                    <hr className="my-3 border-gray-200" />

                                    {item.configs.map((config) => (
                                        <div
                                            key={config.label}
                                            className="mt-4 space-y-1"
                                        >
                                            <p className="font-medium">
                                                {config.label}
                                            </p>
                                            <p>{config.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* content detail & other product */}
                <div className="mt-5 flex flex-col items-start gap-5 md:flex-row">
                    {/* content detail */}
                    <div className="md:w-[60%]">
                        <div className="tinymce-content rounded-3xl bg-white px-6 py-2 shadow">
                            {parse(product.data.content)}
                        </div>
                    </div>

                    {/* product suggest */}
                    <div className="flex-1 rounded-3xl bg-white p-4 shadow md:sticky md:top-5">
                        <OtherProducts data={products_suggest.data} />
                    </div>
                </div>
            </div>
        </>
    );
}
