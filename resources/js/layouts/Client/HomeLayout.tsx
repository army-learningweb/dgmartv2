import Footer from '@/components/Client/LayoutComponent/Footer';
import Header from '@/components/Client/LayoutComponent/Header';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="bg-gray-50">
            <div className="min-h-screen">
                {/* header */}
                <Header />

                {/* main */}
                <main className="flex-1 space-y-10">
                    {children}
                </main>

                {/* footer */}
                <Footer />
            </div>
        </div>
    );
}
