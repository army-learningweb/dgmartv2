import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboard, UsersRound, Package, FileText, PackageCheck, X } from 'lucide-react';
import Logo from "@/components/ui/Logo"
import NavLink from "./NavLink";
import NavSubLink from "./NavSubLink";
import UserSetting from "./UserSetting";

export default function Sidebar() {

    const { url } = usePage();

    return (
        <div className="w-[80%] md:w-[17%] bg-white md:bg-transparent min-h-screen fixed md:top-4 p-4 md:p-0 inline-flex flex-col justify-between">
            <div className="relative">
                {/* close sidebar on mobile */}
                <div className="absolute block md:hidden right-4 top-4 p-0.5 rounded-md">
                    <X strokeWidth={1.5} className="text-gray-400"/>
                </div>

                {/* Logo */}
                <Link href="/admin/dashboard">
                    <Logo />
                    <div className="text-gray-500">Trang quản lí Website</div>
                </Link>

                {/* nav */}
                <div className="mt-3 md:mt-2 pr-3 md:pr-0 border-t pb-2 md:pb-0 md:border-0 border-gray-200 overflow-y-scroll overflow-x-hidden h-full md:overflow-y-hidden">
                    {/* Dashboard */}
                    <div>
                        <p className="my-2 text-xs font-medium text-gray-500">Tổng quan</p>
                        <NavLink route="/admin/dashboard" name="Dashboard" isActive={url === "/admin/dashboard"} icon={<LayoutDashboard strokeWidth={1.75} size={17} />} />
                    </div>

                    {/* Systems */}
                    <div className="space-y-1">
                        <p className="my-2 text-xs font-medium text-gray-500">Quản lí hệ thống</p>
                        {/* product */}
                        <NavLink urlActiveOpen={url.startsWith("/admin/products")} name="Sản phẩm" icon={<Package strokeWidth={1.75} size={17} />}>
                            <NavSubLink isActive={url === "/admin/products"} route="/admin/products" name="Danh sách sản phẩm" />
                            <NavSubLink isActive={url === "/admin/products/categories"} route="/" name="Danh mục sản phẩm" />
                        </NavLink>

                        {/* post */}
                        <NavLink urlActiveOpen={url.startsWith("/admin/posts")} name="Bài viết" icon={<FileText strokeWidth={1.75} size={17} />}>
                            <NavSubLink isActive={url === "/admin/posts"} route="/admin/posts" name="Danh sách bài viết" />
                            <NavSubLink isActive={url === "/admin/posts/categories"} route="/" name="Danh mục bài viết" />
                        </NavLink>
                    </div>

                    {/* Sales */}
                    <div>
                        <p className="my-2 text-xs font-medium text-gray-500">Quản lí bán hàng</p>
                        <NavLink route="/admin/dashboard" name="Đơn hàng" isActive={url === "/admin/sales"} icon={<PackageCheck strokeWidth={1.75} size={17} />} />
                    </div>

                    {/* User */}
                    <div className="space-y-1">
                        <p className="my-2 text-xs font-medium text-gray-500">Quản lí thành viên</p>
                        <NavLink urlActiveOpen={url.startsWith("/admin/users")} name="Thành viên" icon={<UsersRound strokeWidth={1.75} size={17} />}>
                            <NavSubLink isActive={url === "/admin/users"} route="/admin/users" name="Danh sách thành viên" />
                            <NavSubLink isActive={url === "/admin/users/permissions"} route="/" name="Quản lí quyền hạn" />
                            <NavSubLink isActive={url === "/admin/users/roles"} route="/" name="Quản lí trò" />
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* user setting */}
            <UserSetting/>
        </div>
    )
}