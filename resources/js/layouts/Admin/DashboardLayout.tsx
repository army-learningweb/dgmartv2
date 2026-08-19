import Sidebar from '@/components/Admin/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link, usePage } from '@inertiajs/react';
import Logo from '@/components/ui/Logo';
import { Menu } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const {url} = usePage();
    const [openOnMobbile, setOpenOnMobile] = useState(false);
    const handleToggleMenu = () => {
        setOpenOnMobile(!openOnMobbile);
        
    };

    useEffect(() => {
        if(!openOnMobbile) return;
        handleToggleMenu();
    },[url])

    return (
        <>
            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        padding: '14px 16px',
                        fontWeight: 500,
                        fontSize: 13,
                    },
                    position: 'top-right',
                }}
            />

            <div className="min-h-screen bg-gray-100 md:flex md:gap-2 md:p-4">
                <aside
                    className={clsx(
                        'relative shrink-0 transition-all duration-250 ease-in-out md:left-0 md:w-55',
                        {
                            '-left-80': !openOnMobbile,
                            'left-0': openOnMobbile,
                        },
                    )}
                >
                    <Sidebar onToggleMenu={handleToggleMenu} />
                </aside>

                {/* backdrop black when menu open */}
                <div
                    className={clsx(
                        'absolute top-0 left-0 z-40 h-full w-full bg-black/50 transition-all duration-150',
                        {
                            'pointer-events-none opacity-0': !openOnMobbile,
                            'pointer-events-auto opacity-100': openOnMobbile,
                        },
                    )}
                ></div>

                <div className="border border-gray-200 bg-white p-4 text-gray-800 shadow md:flex-1 md:rounded-2xl">
                    <div className="mb-4 flex items-center justify-between md:hidden">
                        {/* Logo */}
                        <Link href="/admin/dashboard">
                            <Logo />
                        </Link>
                        <Menu
                            className="text-gray-500 active:text-gray-700"
                            onClick={handleToggleMenu}
                        />
                    </div>

                    <hr className='mb-4 border-gray-100 md:hidden'/>

                    {children}
                </div>
            </div>
        </>
    );
}
