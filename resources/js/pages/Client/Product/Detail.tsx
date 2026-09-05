import { Head, Link } from '@inertiajs/react';
import { ProductDetailProps } from '@/types/module/client_product';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import parse from 'html-react-parser';

export default function Detail({ product, products_suggest }: ProductDetailProps) {
    const imageRef = useRef<HTMLUListElement>(null);
    const [imageWidth, setImageWidth] = useState(0);
    const [index, setIndex] = useState<number>(0);
    const sliderTurn = product.data.childs_image.length - 1;

    useEffect(() => {
        if (imageRef.current) {
            setImageWidth(imageRef.current.getBoundingClientRect().width);
        }
    }, [product.data.id]);

    const handleSlide = (action: string) => {
        if (action === 'plus') {
            if (index === sliderTurn) return;
            setIndex((prev) => prev + 1);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    const handleClickDot = (index:number) => {
        setIndex(index);
    }

    return (
        <>
            <Head title="Chi tiết sản phẩm" />
            <div className="mx-auto mt-4 min-h-400 max-w-312">
                <div className="flex items-start gap-5">
                    {/* image */}
                    <div className="sticky top-15 flex w-[60%] flex-col items-center rounded-3xl bg-white shadow">
                        <div className="relative w-full overflow-hidden rounded-3xl py-5">
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

                            {/* buttonslider */}
                            <div className="pointer-events-none absolute top-[42%] flex w-full justify-between px-6">
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
                        <h1 className="text-4xl font-medium">
                            {product.data.name}
                        </h1>
                        <h2 className="text-[15px] text-gray-500">
                            {product.data.desc}
                        </h2>

                        {/* versions */}
                        <div className="mt-4 grid flex-1 grid-cols-1 gap-5">
                            {product.data.variants.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl bg-white p-4 shadow"
                                >
                                    <h3 className="text-lg font-medium tracking-tight">
                                        Phiên bản {index + 1}
                                    </h3>

                                    <div className="flex gap-1 text-gray-500">
                                        <p>Mã:</p>
                                        <p>{item.code}</p>
                                    </div>

                                    <hr className="mt-3 border-gray-200" />

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
                <div className="flex items-start gap-5 mt-5">
                    <div className="w-[60%]">
                        <div className="tinymce-content rounded-2xl bg-white px-6 py-2 shadow">
                            {parse(product.data.content)}
                        </div>
                    </div>

                    <div className="sticky top-10 flex-1 rounded-2xl bg-white p-4 shadow">
                        <h2 className="text-xl font-medium">
                            Sản phẩm tương tự
                        </h2>

                        <div className="flex flex-col gap-4 mt-4">
                            {products_suggest.data.map((item) => (
                                <div className="flex items-center gap-4">
                                    <div className="h-25 w-40 shrink-0 rounded-xl bg-white border border-gray-200">
                                        <img src={item.image.file_url} alt="" className='w-full h-full object-contain'/>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-medium">
                                            {item.name}
                                        </p>

                                        <p>599.000đ</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
