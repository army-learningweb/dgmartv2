import { Head } from "@inertiajs/react"
import { Ellipsis } from 'lucide-react';
import { UsersType } from "@/types/data";

import Button from "@/components/ui/Button"
import UserAvatar from "@/components/ui/UserAvatar";
import Pagination from "@/components/Admin/Pagination/Pagination";

import { X } from 'lucide-react';

export default function Read({ users }: { users: UsersType }) {
    return (
        <>
            <div className="absolute bg-black/30 top-0 left-0 w-full h-full z-40 flex items-center justify-center">
                <div className="w-[25%] h-[50%] bg-gray-100 rounded-2xl p-1.5">
                    <div className="w-full h-full bg-white rounded-[10px] py-2 px-2 flex flex-col">
                        <header className="flex justify-between items-center">
                            <div className="font-medium text-[17px] tracking-tight">Thêm mới thành viên</div>
                            <div className="p-1"><X size={20} className="text-gray-400" /></div>
                        </header>
                        <main className="flex-1">
                            ABC
                        </main>
                        <footer className="flex items-center justify-end gap-2">
                            <Button size="small" variant="outline">Đóng</Button>
                            <Button size="small">Thêm mới</Button>
                        </footer>
                    </div>

                </div>
            </div>

            <section>
                <Head title="Thành viên" />

                {/* title */}
                <div className="flex justify-between items-center">
                    <div className="font-medium text-lg">Danh sách thành viên</div>
                    <Button animatePress={true} size="small">Thêm mới</Button>
                </div>

                {/* data */}
                <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="font-medium border-b border-gray-200 bg-gray-200">
                            <tr>
                                <td className="py-2 px-4">Thành viên</td>
                                <td className="py-2 px-4">Email</td>
                                <td className="py-2 px-4">Ngày tạo</td>
                                <td className="py-2 px-4"></td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map(user => (
                                <tr key={user.id} className="border-b border-gray-200 last-of-type:border-0 hover:bg-gray-100 transition-alls duration-150">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <UserAvatar name={user.name} />
                                            <div>{user.name}</div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div>
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        {user.created_at}
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="p-2 border border-gray-200 bg-white rounded-lg w-fit">
                                            <Ellipsis size={18} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* pagination */}
                <Pagination
                    firstUrl={users.first_page_url}
                    lastUrl={users.last_page_url}
                    prevUrl={users.prev_page_url}
                    nextUrl={users.next_page_url}
                />
            </section>

        </>
    )
}