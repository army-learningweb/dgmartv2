import { Toaster } from 'react-hot-toast';
import { SquareMenu } from 'lucide-react';
import Sidebar from '@/components/Admin/Sidebar/Sidebar';
import Logo from '@/components/ui/Logo';
import { useState } from 'react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [openSideBar, setOpenSidebar] = useState<boolean>(false);

    return (
        <>
            {/* toast */}
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

            {/* wrapper */}
            <div className="min-h-screen bg-gray-100 md:flex md:gap-2 md:p-4">
                {/* header mobile */}
                <div className="fixed top-0 z-50 w-full flex items-center justify-between bg-white p-4 md:hidden">
                    <Logo route="/" />
                    <SquareMenu
                        onClick={() => setOpenSidebar(true)}
                        size={30}
                        strokeWidth={1.7}
                        className="transtion-all text-gray-500 duration-200 active:scale-95 active:text-black"
                    />
                </div>
                <div className='h-17 md:hidden'></div>

                {/* dark overlay */}
                <div
                    className={`fixed z-50 top-0 left-0 h-full w-full bg-black/30 md:hidden transition-colors duration-200 ease-in-out
                        ${openSideBar 
                            ? 'pointer-events-auto opacity-100'
                            : 'pointer-events-none opacity-0'
                        }`}
                ></div>

                {/* sidebar */}
                <div className="w-60">
                    <Sidebar
                        onToggleSidebar={setOpenSidebar}
                        statusSidebar={openSideBar}
                    />
                </div>

                {/* content */}
                <div className="flex-1 border border-gray-200 bg-white p-4 text-gray-800 shadow md:flex-1 md:rounded-2xl">
                    {children}
                </div>
            </div>
        </>
    );
}
