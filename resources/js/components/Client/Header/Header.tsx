import { Link, usePage } from '@inertiajs/react';
import Logo from '@/components/ui/Logo';
import { Search, ShoppingBag } from 'lucide-react';
import Nav from './Nav';
export default function Header() {
    const total: any = usePage().props.total;
    const {url} = usePage();

    return (
        <header className="mx-auto flex max-w-312 items-center justify-between py-4">
            <div className="flex gap-10">
                <Logo route="/" />
                <Nav />
            </div>

            <div className="flex items-center justify-end gap-4">
                <Search size={20} />

                <Link href="/gio-hang" className="relative">
                    <ShoppingBag size={20} className={`${url == '/gio-hang' && 'text-blue-600'}`}/>

                    {total?.count > 0 && (
                        <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[11px] font-medium text-white select-none">
                            {total.count}
                        </div>
                    )}
                </Link>
            </div>
        </header>
    );
}
