import { Link, usePage } from "@inertiajs/react"
import { LayoutDashboard, UsersRound, Package, FileText, PackageCheck, X } from 'lucide-react';
import Logo from "@/components/ui/Logo"
import NavLink from "./NavLink";
import NavSubLink from "./NavSubLink";
import UserSetting from "./UserSetting";

interface SidebarPropType {
    onToggleMenu? : () => void;
}

export default function Sidebar({onToggleMenu} : SidebarPropType) {

    const { url } = usePage();
    const pathName = url.split("?")[0];

    return (
        <div className="fixed z-50 w-[70%] border-r border-r-gray-200 bg-white p-4 h-full md:h-auto md:sticky md:top-5 md:w-full md:border-0 md:bg-transparent md:p-0">
            <div className="relative py-1">
                {/* close sidebar on mobile */}
                <div onClick={onToggleMenu} 
                    className="absolute top-4 right-3 block rounded-md p-0.5 md:hidden">
                    <X
                        strokeWidth={1.5}
                        className="text-gray-500 active:text-gray-700"
                    />
                </div>

                {/* Logo */}
                <Link href="/admin/dashboard">
                    <Logo />
                    <p className="text-gray-500">Trang quản lí Website</p>
                </Link>

                {/* nav */}
                <div className="scrollbar-thumb-rounded-full mt-4 h-[calc(100vh-170px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent overflow-x-hidden overflow-y-auto pr-2 pb-4">
                    {/* Dashboard */}
                    <div>
                        <p className="my-2 text-xs font-medium text-gray-500">
                            Tổng quan
                        </p>
                        <NavLink
                            route="/admin/dashboard"
                            name="Dashboard"
                            isActive={url === '/admin/dashboard'}
                            icon={
                                <LayoutDashboard strokeWidth={1.75} size={17} />
                            }
                        />
                    </div>

                    {/* Systems */}
                    <div className="space-y-1">
                        <p className="my-2 text-xs font-medium text-gray-500">
                            Quản lí hệ thống
                        </p>
                        {/* product */}
                        <NavLink
                            urlActiveOpen={pathName.startsWith(
                                '/admin/products',
                            )}
                            name="Sản phẩm"
                            icon={<Package strokeWidth={1.75} size={17} />}
                        >
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/products/configs/group'
                                }
                                route="/admin/products/configs/group"
                                name="Nhóm cấu hình"
                            />
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/products/configs'
                                }
                                route="/admin/products/configs"
                                name="Danh sách cấu hình"
                            />
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/products/configs/type'
                                }
                                route="/admin/products/configs/type"
                                name="Loại cấu hình"
                            />
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/products/variants'
                                }
                                route="/admin/products/variants"
                                name="Cấu hình và biến thể"
                            />
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/products/categories'
                                }
                                route="/admin/products/categories"
                                name="Danh mục sản phẩm"
                            />
                            <NavSubLink
                                isActive={pathName === '/admin/products'}
                                route="/admin/products"
                                name="Danh sách sản phẩm"
                            />
                        </NavLink>

                        {/* post */}
                        <NavLink
                            urlActiveOpen={pathName.startsWith('/admin/posts')}
                            name="Bài viết"
                            icon={<FileText strokeWidth={1.75} size={17} />}
                        >
                            <NavSubLink
                                isActive={pathName === '/admin/posts'}
                                route="/admin/posts"
                                name="Danh sách bài viết"
                            />
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/posts/categories'
                                }
                                route="/admin/posts/categories"
                                name="Danh mục bài viết"
                            />
                        </NavLink>

                        {/* User */}
                        <NavLink
                            urlActiveOpen={pathName.startsWith('/admin/users')}
                            name="Thành viên"
                            icon={<UsersRound strokeWidth={1.75} size={17} />}
                        >
                            <NavSubLink
                                isActive={pathName === '/admin/users'}
                                route="/admin/users"
                                name="Danh sách thành viên"
                            />
                            <NavSubLink
                                isActive={pathName === '/admin/users/roles'}
                                route="/admin/users/roles"
                                name="Quản lí vai trò"
                            />
                            <NavSubLink
                                isActive={
                                    pathName === '/admin/users/permissions'
                                }
                                route="/admin/users/permissions"
                                name="Quản lí quyền"
                            />
                        </NavLink>

                        <NavLink
                            route="/admin/dashboard"
                            name="Đơn hàng"
                            isActive={url === '/admin/sales'}
                            icon={<PackageCheck strokeWidth={1.75} size={17} />}
                        />
                    </div>
                </div>

                {/* user setting */}
                <UserSetting />
            </div>
        </div>
    );
}