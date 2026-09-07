import { Head, Link, router } from '@inertiajs/react';
import { ProductDetailProps } from '@/types/module/client_product';
import { ChevronRight, ChevronLeft, ShoppingBag } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { vndFormat } from '@/lib/currency_format';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

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
        variant_id: product.data.variants?.[0].id,
        price:
            product.data.variants?.[0].price_discount ??
            product.data.variants?.[0].price,
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
        if (imageRef.current) {
            setImageWidth(imageRef.current.getBoundingClientRect().width);
        }
    }, [product.data.id]);

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
            <div className="fixed -bottom-5 z-50 w-full">
                <div className="mx-auto max-w-250 rounded-2xl border border-gray-200 bg-gray-100 p-1 shadow-lg">
                    <div className="flex items-center justify-between rounded-xl bg-white px-4 shadow">
                        {/* Ảnh sản phẩm */}
                        <img
                            src={product.data.image.file_url}
                            alt={product.data.image.file_name}
                            className="h-auto w-20"
                        />

                        {/* Tên sản phẩm */}
                        <p className="w-50 truncate text-[15px] font-medium">
                            {product.data.name}
                        </p>

                        {/* Chọn phiên bản */}
                        <div>
                            <Select
                                name="version"
                                className="w-50!"
                                onChange={(e) =>
                                    handleChangeVersion(Number(e.target.value))
                                }
                            >
                                {product.data.variants?.length > 0 &&
                                    product.data.variants.map(
                                        (variant, index) => (
                                            <option
                                                key={variant.id}
                                                value={variant.id}
                                            >
                                                Phiên bản {index + 1} (
                                                {variant.code})
                                            </option>
                                        ),
                                    )}
                            </Select>
                        </div>

                        {/* Giá sản phẩm */}
                        <div className="flex items-center gap-2">
                            <span>Giá:</span>
                            <span className="text-lg font-medium">
                                {vndFormat(version.price)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleAddCart}
                                variant="outline"
                                size="small"
                                animatePress={true}
                                className="cursor-pointer"
                            >
                                <ShoppingBag size={17} />
                                Thêm vào giỏ hàng
                            </Button>

                            <Button size="small">Mua ngay</Button>
                        </div>
                    </div>
                </div>
            </div>

            <Head title="Chi tiết sản phẩm" />
            <div className="mx-auto mt-4 min-h-400 max-w-312">

                {/* name & desc */}
                <div className='w-150 my-10 space-y-4'>
                    <h1 className="text-4xl font-bold">
                        {product.data.name}
                    </h1>
                    <h2 className="text-[15px] text-gray-500">
                        {product.data.desc}
                    </h2>
                </div>

                <div className="flex items-start gap-5">
                    {/* image */}
                    <div className="sticky top-20 flex w-[60%] flex-col items-center rounded-3xl bg-white shadow">
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
                    <div className="flex-1 space-y-4 select-none md:w-150">
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

                {/* detail */}
                <div className="mt-5 flex items-start gap-5">
                    <div className="w-[60%]">
                        <div className="tinymce-content rounded-3xl bg-white px-6 py-2 shadow">
                            {parse(product.data.content)}
                        </div>
                    </div>

                    <div className="sticky top-10 flex-1 rounded-3xl bg-white p-4 shadow">
                        {/* product suggest */}
                        <h2 className="text-xl font-medium">
                            Sản phẩm tương tự
                        </h2>
                        <div className="mt-4 flex flex-col gap-4">
                            {products_suggest.data.map((item) => (
                                <Link
                                    href={`/${item.slug}`}
                                    key={item.id}
                                    className="group flex items-center gap-4"
                                >
                                    <div className="relative h-20 w-30 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
                                        <img
                                            src={item.image.file_url}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />

                                        {item.variants?.[0]?.discount && (
                                            <div className="absolute top-0 left-0 rounded-br-xl bg-red-600 px-2 py-0.5 text-xs text-white">
                                                Giảm{' '}
                                                {item.variants?.[0]?.discount}%
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="line-clamp-1 group-hover:underline">
                                            {item.name}
                                        </p>
                                        <p className="line-clamp-1 text-gray-500">
                                            {item.desc}
                                        </p>
                                        <div className="flex gap-4">
                                            <p
                                                className={`${item.variants?.[0]?.discount ? 'line-through' : 'font-medium'}`}
                                            >
                                                {vndFormat(
                                                    item.variants?.[0]?.price,
                                                )}
                                            </p>
                                            {item.variants?.[0]?.discount && (
                                                <p className="font-medium">
                                                    {vndFormat(
                                                        item.variants?.[0]
                                                            .price_discount,
                                                    )}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
