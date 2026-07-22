import Logo from "@/components/ui/Logo"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-4 md:py-0 md:px-0">
            <div className="shadow p-4 border border-gray-200 rounded-2xl w-105">
                <Logo />

                {children}
            </div>
        </div>
    )
}