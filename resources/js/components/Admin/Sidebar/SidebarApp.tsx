import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboard, UsersRound, Package, FileText, PackageCheck, ChevronsUpDown, LogOut  } from 'lucide-react';
import { Auth } from "@/types";
import { userAvatar } from "@/lib/users";
import Logo from "@/components/ui/Logo"
import NavLink from "./NavLink";
import NavSubLink from "./NavSubLink";

export default function SidebarApp() {

    const { url } = usePage();
    const { user } = usePage<{ auth: Auth }>().props.auth;

    return (
        <div className="w-[17%] min-h-screen fixed top-4 flex flex-col justify-between">
            <div>
                {/* Logo */}
                <Link href="/admin/dashboard">
                    <Logo />
                    <div className="text-gray-500">Trang quản lí Website</div>
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
            <div className="flex justify-between items-center gap-2 mb-7 hover:bg-white hover:shadow p-2 rounded-xl transition-colors duration-150 relative">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center">
                        {userAvatar(user.name)}
                    </div>
                    <div>{user.name}</div>
                </div>
                <ChevronsUpDown strokeWidth={1.75} size={17} />

                <div className="absolute -top-25 right-0 bg-white border border-gray-200 shadow w-full rounded-xl">
                    <div className="flex items-center gap-2 p-2 text-xs">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center">
                            {userAvatar(user.name)}
                        </div>
                        <div className="flex flex-col">
                            <div>{user.name}</div>
                            <div className="text-gray-500">{user.email}</div>
                        </div>
                    </div>

                    <hr className="border-gray-300" />
                    <Link href="/admin/logout" method="post" className="py-2 px-2.5 inline-flex gap-2 items-center w-full">
                        <LogOut size={15} className="text-gray-500"/> 
                        <div>Đăng xuất</div>   
                    </Link>
                </div>
            </div>
        </div>
    )
}