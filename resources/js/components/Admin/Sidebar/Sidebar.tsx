import { usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    UsersRound,
    UserRound,
    Package,
    FileText,
    PackageCheck,
    X,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import NavLink from './NavLink';
import NavSubLink from './NavSubLink';
import UserSetting from './UserSetting';

interface SidebarPropType {
    onToggleMenu?: () => void;
}

export default function Sidebar({ onToggleMenu }: SidebarPropType) {
    const { url } = usePage();
    const pathName = url.split('?')[0];

    return (
        <div className="fixed z-50 h-full w-[70%] border-r border-r-gray-200 bg-white p-4 md:sticky md:h-auto md:w-full md:border-0 md:bg-transparent md:p-0">
            <div className="relative">
                {/* close sidebar on mobile */}
                <div
                    onClick={onToggleMenu}
                    className="absolute top-4 right-3 block rounded-md p-0.5 md:hidden"
                >
                    <X
                        strokeWidth={1.5}
                        className="text-gray-500 active:text-gray-700"
                    />
                </div>

                <div className="flex items-end justify-between pr-2.75">
                    <div>
                        {/* Logo */}
                        <Logo
                            route="/admin/dashboard"
                            className="text-[32px]"
                        />
                        {/* <p className='text-xs'>Trang quản lí Website</p> */}
                    </div>

                    {/* user setting */}
                    <UserSetting />
                </div>

                {/* nav */}
                <div className="scrollbar-thumb-rounded-full mt-2 h-[calc(100vh-100px)] scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent overflow-x-hidden overflow-y-auto pr-2 pb-4">
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
                            icon={<UserRound strokeWidth={2} size={17} />}
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

                        {/* Customers */}
                        <div className="space-y-1">
                            <p className="my-2 text-xs font-medium text-gray-500">
                                Bán hàng
                            </p>
                            <NavLink
                                route="/admin/orders"
                                name="Đơn hàng"
                                isActive={url === '/admin/orders'}
                                icon={
                                    <PackageCheck strokeWidth={2} size={17} />
                                }
                            />
                            <NavLink
                                route="/admin/customers"
                                name="Khách mua hàng"
                                isActive={url === '/admin/customers'}
                                icon={<UsersRound strokeWidth={2} size={17} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
