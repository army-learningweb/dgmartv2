import Footer from '@/components/Client/Footer/Footer';
import Header from '@/components/Client/Header/Header';
import { Toaster } from 'react-hot-toast';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
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
                    position: 'top-center',
                }}
            />

            <div className="bg-slate-50">
                <div className="min-h-screen">
                    {/* header */}
                    <Header />

                    {/* main */}
                    <main className="flex-1 space-y-10">{children}</main>

                    
                    {/* <Footer /> */}
                </div>
            </div>
        </>
    );
}
