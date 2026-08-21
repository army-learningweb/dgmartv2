import Logo from "@/components/ui/Logo"
import { Link } from "@inertiajs/react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-4 md:px-0 md:py-0">
            <div className="w-105 rounded-2xl border border-gray-200 bg-white p-4 shadow">
                <Link href="/">
                    <Logo />
                </Link>

                {children}
            </div>
        </div>
    );
}