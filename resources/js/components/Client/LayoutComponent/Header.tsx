import { Link } from "@inertiajs/react";
import Logo from "@/components/ui/Logo";
import { Search, ShoppingBag } from 'lucide-react';

export default function Header(){
    return (
        <header className="flex justify-between py-4">
            <div className="flex gap-15">
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
            </div>

            <div className="flex items-center justify-end gap-4">
                <Search size={20} />
                <ShoppingBag size={20} />
            </div>
        </header>
    );
}