import Footer from '@/components/Client/LayoutComponent/Footer';
import Header from '@/components/Client/LayoutComponent/Header';

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto flex min-h-screen max-w-312 flex-col">
                {/* header */}
                <Header />
                
                {/* main */}
                <main className="mt-12 flex-1 space-y-10">{children}</main>

                {/* footer */}
                <Footer />
            </div>
        </div>
    );
}
