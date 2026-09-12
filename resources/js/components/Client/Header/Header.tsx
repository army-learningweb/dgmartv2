import { Link, usePage } from '@inertiajs/react';
import Logo from '@/components/ui/Logo';
import { Search, ShoppingBag, X } from 'lucide-react';
import Nav from './Nav';
import { CategoriesData } from '@/data/Categories';
import clsx from 'clsx';

export default function Header() {
    const total: any = usePage().props.total;
    const { url } = usePage();

    return (
        <>
            {/* Modal search */}
            <div className="fixed top-0 left-0 z-50 flex h-full w-full justify-center bg-black/20">
                <div className="mt-15 h-fit w-150 space-y-2 rounded-3xl border border-gray-300 bg-gray-100 p-1 shadow">
                    <div className="space-y-2 rounded-[20px] bg-white p-4 shadow">
                        <div>
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-medium tracking-tight">
                                    Tìm kiếm sản phẩm
                                </h1>
                                <div
                                    className="flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 text-xs font-medium transition-colors duration-150 select-none hover:bg-gray-200"
                                    // onClick={onClose}
                                >
                                    <X
                                        size={17}
                                        className="text-gray-800 transition-colors duration-150"
                                    />
                                    ESC
                                </div>
                            </div>

                            <div className="focus-within:border-ring mt-3 flex w-full items-center gap-2 rounded-[9px] border border-gray-300 p-2 transition-all duration-150 focus-within:ring-3 focus-within:ring-gray-200">
                                <Search size={18} className="text-gray-500" />
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="w-full focus:ring-0 focus:outline-0"
                                    placeholder="Nhập tên sản phẩm..."
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-medium tracking-tight">
                                Theo từ khóa tìm kiếm "abcde..."
                            </h2>

                            <div className="mt-2 h-60 space-y-1 overflow-y-auto rounded-xl overflow-hidden scrollbar-thin">
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                                <div className="cursor-pointer rounded-lg bg-gray-100 p-2 hover:bg-gray-200">
                                    Laptop Dell 55515
                                </div>
                            </div>
                        </div>

                        {/* categories */}
                        <h2 className="text-lg font-medium tracking-tight">
                            Danh mục sản phẩm
                        </h2>
                        <div className="grid grid-cols-3 gap-2">
                            {CategoriesData.map((item, index) => (
                                <Link
                                    key={index}
                                    className={clsx(
                                        'relative inline-block h-30 shrink-0 overflow-hidden rounded-2xl border border-gray-200 shadow transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-lg',
                                        {
                                            'bg-white': index % 2 === 0,
                                            'bg-black text-gray-200':
                                                index % 2 !== 0,
                                        },
                                    )}
                                >
                                    <div className="absolute top-0 left-0 space-y-2 p-4">
                                        <h2 className="h-10 font-medium tracking-tight">
                                            {item.title}
                                        </h2>
                                        <p className="text-xs">{item.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="mx-auto flex max-w-312 items-center justify-between py-4">
                <div className="flex gap-10">
                    <Logo route="/" className="w-[15%]" />
                    <Nav className="flex-1" />
                </div>

                <div className="flex w-[30%] items-center justify-end gap-2">
                    <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-white px-2 py-1.5 text-gray-500 shadow duration-150 ease-out select-none active:translate-y-0.5">
                        <Search size={18} />
                        <span>Tìm kiếm sản phẩm</span>
                        <span>⌘K</span>
                    </div>

                    <Link
                        href="/gio-hang"
                        className="relative rounded-md bg-white p-1.5 shadow duration-150 ease-out active:translate-y-0.5"
                    >
                        <ShoppingBag
                            size={20}
                            className={`${url == '/gio-hang' && 'text-blue-600'}`}
                        />

                        {total?.count > 0 && (
                            <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[11px] font-medium text-white select-none">
                                {total.count}
                            </div>
                        )}
                    </Link>
                </div>
            </header>
        </>
    );
}
