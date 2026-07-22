import Sidebar from "@/components/Admin/Sidebar/Sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({children} : DashboardLayoutProps) {
    return (
        <div className="min-h-screen md:flex md:gap-4 bg-gray-100 md:p-4">
            <aside className="w-[80%] md:w-[17%]">
                <Sidebar />
            </aside>
            <div className="md:flex-1 bg-white md:rounded-2xl border border-gray-200 shadow p-4">
                {children}
            </div>
        </div>
    )
}