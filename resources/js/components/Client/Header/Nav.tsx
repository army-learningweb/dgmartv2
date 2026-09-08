import { usePage } from '@inertiajs/react';
import NavLink from './NavLink';

export default function Nav() {
    const { url } = usePage();

    return (
        <nav className="mt-1 mr-10">
            <div className="flex gap-5 font-medium">
                <NavLink name="Trang chủ" route="/" active={url === '/'} />
                <NavLink
                    name="Laptop"
                    route="/laptop"
                    active={url.startsWith('/laptop')}
                />
                <NavLink
                    name="Phụ kiện"
                    route="/phu-kien"
                    active={url.startsWith('/phu-kien')}
                />
                <NavLink
                    name="Camera & Đồng hồ"
                    route="/camera-dong-ho"
                    active={url.startsWith('/camera-dong-ho')}
                />
                <NavLink
                    name="Bài viết & Tin tức"
                    route="/bai-viet-tin-tuc"
                    active={url.startsWith('/bai-viet-tin-tuc')}
                />
                <NavLink
                    name="Liên hệ"
                    route="/lien-he"
                    active={url.startsWith('/lien-he')}
                />
            </div>
        </nav>
    );
}
