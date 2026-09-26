import Logo from '@/components/ui/Logo';
import { Link } from '@inertiajs/react';
import { NavigationData } from '@/data/Navigation';

export default function Footer() {
    return (
        <div className="border-t border-gray-200 bg-white">
            <footer className="mx-auto max-w-312 px-5 py-4 md:px-0">
                <div className="grid md:py-4 md:grid-cols-3 space-y-6 md:space-y-0">
                    <div className="md:col-span-1">
                        <Logo route="/" />
                        <p className="mt-2">Chuyên Laptop - Phụ kiện</p>
                    </div>

                    <div className="md:col-span-2">
                        <div className="space-y-4 md:flex justify-between">
                            {/* Navigation */}
                            <div>
                                {NavigationData?.length > 0 && (
                                    <div className="flex justify-between">
                                        <div>
                                            <h1 className="text-[15px] font-medium">
                                                Menu
                                            </h1>
                                            <nav className="mt-1">
                                                <div className="flex flex-col">
                                                    {NavigationData.map(
                                                        (item, index) => (
                                                            <Link
                                                                href={
                                                                    item.route
                                                                }
                                                                key={index}
                                                            >
                                                                <div className="inline-block py-1 hover:text-blue-600">
                                                                    {item.name}
                                                                </div>
                                                            </Link>
                                                        ),
                                                    )}
                                                </div>
                                            </nav>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Policy */}
                            <div>
                                <h1 className="text-[15px] font-medium">
                                    Thông tin & Chính sách
                                </h1>
                                <div className="mt-1">
                                    <div className="flex flex-col">
                                        <div className="inline-block py-1">
                                            Chính sách bảo hành
                                        </div>

                                        <div className="inline-block py-1">
                                            Chính sách đổi trả
                                        </div>

                                        <div className="inline-block py-1">
                                            Chính sách vận chuyển
                                        </div>

                                        <div className="inline-block py-1">
                                            Chính sách sử dụng
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <h1 className="text-[15px] font-medium">
                                    Mạng xã hội
                                </h1>
                                <div className="mt-1">
                                    <div className="flex flex-col">
                                        <div className="inline-block py-1">
                                            Facebook
                                        </div>

                                        <div className="inline-block py-1">
                                            Instagram
                                        </div>

                                        <div className="inline-block py-1">
                                            Zalo
                                        </div>

                                        <div className="inline-block py-1">
                                            Youtube
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className='md:hidden my-3 border-gray-200'/>

                <div className="md:mt-8 my-4 text-gray-500">
                    <p>
                        Website mang tính chất giả định - Không
                        có mục đích kinh doanh
                    </p>
                    <p>
                        Hình ảnh và các nội dung bài viết và sản phẩm (nguồn :
                        CellphoneS)
                    </p>
                </div>
            </footer>
        </div>
    );
}
