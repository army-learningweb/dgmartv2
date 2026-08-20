import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Logo from '@/components/ui/Logo';
import { Search, ShoppingBag } from 'lucide-react';
import SliderProduct from '@/components/Client/ProductSlider/ProductSlider';

import { ReadDataProduct } from '@/types/module/home';

export default function Read({new_products} : ReadDataProduct) {
    
    return (
        <>
            <Head title="Trang chủ" />
            <div className="bg-gray-50 text-gray-800">
                <div className="mx-auto flex min-h-screen max-w-7xl flex-col">
                    {/* header */}
                    <header className="flex justify-between py-4">
                        <Link href="/">
                            <Logo />
                        </Link>

                        <nav className="mt-1">
                            <ul className="flex gap-5">
                                <li>
                                    <Link href="" className="inline-block py-2">
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" className="inline-block py-2">
                                        Giới thiệu
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" className="inline-block py-2">
                                        Laptop
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" className="inline-block py-2">
                                        Phụ kiện
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" className="inline-block py-2">
                                        Tin tức & Bài viết
                                    </Link>
                                </li>
                                <li>
                                    <Link href="" className="inline-block py-2">
                                        Liên hệ
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="flex items-center justify-end gap-4">
                            <Search size={20} />
                            <ShoppingBag size={20} />
                        </div>
                    </header>

                    {/* main */}
                    <main className="mt-1 flex-1 space-y-10">
                        {/* banner */}
                        <div className="flex h-150 gap-4">
                            <div className="w-[71%] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"></div>
                            <div className="flex-1 rounded-2xl border border-gray-100 bg-white shadow-sm"></div>
                        </div>

                        {/* content */}
                        <div className="mx-auto max-w-7xl space-y-10">
                            {/* new product */}
                            <SliderProduct
                                title="Mới tại cửa hàng"
                                data={new_products}
                            />

                            {/* discount product */}
                            <SliderProduct
                                title="Đang giảm giá"
                                data={new_products}
                            />
                        </div>
                    </main>

                    {/* footer */}
                    <footer className="pb-4">
                        <div className="grid grid-cols-3 py-4">
                            <div className="col-span-1">
                                <Logo />
                            </div>

                            <div className="col-span-2">
                                <div className="mt-2.5 flex justify-between">
                                    <div>
                                        <h1 className="text-[15px] font-medium">
                                            Menu
                                        </h1>
                                        <nav className="mt-1">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Trang chủ
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Giới thiệu
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Laptop
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Phụ kiện
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Tin tức & Bài viết
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Liên hệ
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    <div>
                                        <h1 className="text-[15px] font-medium">
                                            Hỗ trợ
                                        </h1>
                                        <nav className="mt-1">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Trang chủ
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Giới thiệu
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Laptop
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Phụ kiện
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Tin tức & Bài viết
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Liên hệ
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    <div>
                                        <h1 className="text-[15px] font-medium">
                                            Thông tin & Chính sách
                                        </h1>
                                        <nav className="mt-1">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Trang chủ
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Giới thiệu
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Laptop
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Phụ kiện
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Tin tức & Bài viết
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Liên hệ
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                    <div>
                                        <h1 className="text-[15px] font-medium">
                                            Mạng xã hội
                                        </h1>
                                        <nav className="mt-1">
                                            <ul className="flex flex-col">
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Trang chủ
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Giới thiệu
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Laptop
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Phụ kiện
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Tin tức & Bài viết
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href=""
                                                        className="inline-block py-1"
                                                    >
                                                        Liên hệ
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between text-gray-500">
                            <p>
                                Copyright © 2026 bella Kitchenware. All Rights
                                Reserved. | A Made By Lưu Đức Vỹ. | Site by
                            </p>
                            <p>Privacy Policy | Warranty</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
