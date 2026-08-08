import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboard, UsersRound, Package, FileText, PackageCheck, X } from 'lucide-react';
import Logo from "@/components/ui/Logo"
import NavLink from "./NavLink";
import NavSubLink from "./NavSubLink";
import UserSetting from "./UserSetting";

export default function Sidebar() {

    const { url } = usePage();

    return (
        <div className="sticky top-5">
            <div className="relative py-1">
                {/* close sidebar on mobile */}
                {/* <div className="absolute block md:hidden right-4 top-4 p-0.5 rounded-md">
                    <X strokeWidth={1.5} className="text-gray-400" />
                </div> */}

                {/* Logo */}
                <Link href="/admin/dashboard">
                    <Logo />
                </Link>

                {/* nav */}
                <div className="mt-4">
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
                            <NavSubLink isActive={url === "/admin/products/categories"} route="/admin/products/categories" name="Danh mục sản phẩm" />
                            <NavSubLink isActive={url === "/admin/products/variants"} route="/admin/products/variants" name="Cấu hình và biến thể" />
                            <NavSubLink isActive={url === "/admin/products/configs"} route="/admin/products/configs" name="Thông tin cấu hình" />
                            <NavSubLink isActive={url === "/admin/products/configsTypes"} route="/admin/products/configsTypes" name="Loại cấu hình" />
                        </NavLink>

                        {/* post */}
                        <NavLink urlActiveOpen={url.startsWith("/admin/posts")} name="Bài viết" icon={<FileText strokeWidth={1.75} size={17} />}>
                            <NavSubLink isActive={url === "/admin/posts"} route="/admin/posts" name="Danh sách bài viết" />
                            <NavSubLink isActive={url.startsWith("/admin/posts/categories")} route="/admin/posts/categories" name="Danh mục bài viết" />
                        </NavLink>

                        {/* User */}
                        <NavLink urlActiveOpen={url.startsWith("/admin/users")} name="Thành viên" icon={<UsersRound strokeWidth={1.75} size={17} />}>
                            <NavSubLink isActive={url.startsWith("/admin/users")} route="/admin/users" name="Danh sách thành viên" />
                            <NavSubLink isActive={url === "/admin/users/roles"} route="/admin/users/roles" name="Quản lí vai trò" />
                            <NavSubLink isActive={url === "/admin/users/permissions"} route="/admin/users/permissions" name="Quản lí quyền" />
                        </NavLink>

                        <NavLink route="/admin/dashboard" name="Đơn hàng" isActive={url === "/admin/sales"} icon={<PackageCheck strokeWidth={1.75} size={17} />} />
                    </div>
                </div>
            </div>

            {/* user setting */}
            {/* <div className="fixed bottom-5 w-[13.75%]">
                <UserSetting />
            </div> */}
        </div>
    )
}