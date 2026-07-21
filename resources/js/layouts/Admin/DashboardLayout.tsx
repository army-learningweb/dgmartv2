import SidebarApp from "@/components/Admin/Sidebar/SidebarApp"

interface DashboardLayoutProps {
    children: React.ReactNode
}

export default function DashboardLayout({children} : DashboardLayoutProps) {
    return (
        <div className="min-h-screen flex gap-4 bg-gray-100 p-4">
            <aside className="w-[17%]">
                <SidebarApp />
            </aside>
            <div className="flex-1 bg-white rounded-2xl border border-gray-200 shadow p-4">
                {children}
            </div>
        </div>
    )
}