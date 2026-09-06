import { Link } from '@inertiajs/react';
import Logo from '@/components/ui/Logo';
import { Search, ShoppingBag } from 'lucide-react';

export default function Header() {
    return (
        <header className="mx-auto flex max-w-312 items-center justify-between border-b border-gray-100 py-4">
            <div className="flex gap-10">
                <Link href="/">
                    <Logo />
                </Link>

                <nav className="mt-1 mr-10">
                    <ul className="flex gap-5 font-medium">
                        <li>
                            <Link href="/" className="inline-block py-2">
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link href="/laptop" className="inline-block py-2">
                                Laptop
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/phu-kien"
                                className="inline-block py-2"
                            >
                                Phụ kiện
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/camera-dong-ho"
                                className="inline-block py-2"
                            >
                                Camera & Đồng hồ
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/bai-viet-tin-tuc"
                                className="inline-block py-2"
                            >
                                Bài viết & Tin tức
                            </Link>
                        </li>
                        <li>
                            <Link href="/" className="inline-block py-2">
                                Liên hệ
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="flex items-center justify-end gap-4">
                <Search size={20} />

                <Link href="/gio-hang">
                    <ShoppingBag size={20} />
                </Link>
            </div>
        </header>
    );
}
