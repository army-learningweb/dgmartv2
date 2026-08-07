import { Head, router } from "@inertiajs/react"
import { useState } from "react"
import toast from "react-hot-toast"

import Badge from "@/components/ui/Badge"
import SearchBar from "@/components/Admin/TableManager/SearchBar"
import FilterTab from "@/components/Admin/TableManager/FilterTab"
import Pagination from "@/components/Admin/Pagination/Pagination"
import EmptyData from "@/components/Admin/Empty/EmptyData"

import { useSearch } from "@/hooks/use-search"
import { useFilter } from "@/hooks/use-filter"

import { ReadPostType } from "@/types/module/post"
import ButtonDelete from "@/components/Admin/TableManager/ButtonDelete"
import ButtonEditLink from "@/components/Admin/TableManager/ButtonEditLink"
import Title from "@/components/Admin/TableManager/Title"
import ButtonCreateLink from "@/components/Admin/TableManager/ButtonCreateLink"

export default function Read({ posts, total, active, inactive, filter, search }: ReadPostType) {

    const [queryFilter, setQueryFilter] = useState<null | string>(filter ?? null);
    const [querySearch, setQuerySearch] = useState<string>(search ?? '');
    const { handleQueryFilter } = useFilter({ querySearch, setQueryFilter, route: "/admin/posts" });
    const { isLoadingSearch, handleQuerySearch, handleClearSearch } = useSearch({ queryFilter, setQuerySearch, route: "/admin/posts" });

    // Xóa
    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa bài viết này ?')) {
            let toastID: string;
            router.delete(`/admin/posts/${id}/delete`, {
                data: {
                    total: total,
                    current_page: posts?.current_page,
                    post_on_page: posts?.data?.length
                },
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
            })
        }
    };

    return (
        <>
            <Head title="Danh sách bài viết" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading="Danh sách bài viết" />
                    <ButtonCreateLink route="/admin/posts/create" />
                </div>

                {/* filter & search */}
                <div className="mt-4 flex items-center justify-between">
                    {/* search */}
                    <SearchBar
                        onSearch={handleQuerySearch}
                        onClear={handleClearSearch}
                        querySearch={querySearch}
                        loadingSearch={isLoadingSearch}
                        resultCount={posts.data.length}
                        placeHolder="Tìm kiếm theo tiêu đề..."
                    />

                    {/* stats */}
                    <div className="hidden gap-1 rounded-xl bg-gray-100 p-1 tracking-tight md:grid md:grid-cols-3">
                        <FilterTab
                            onFilter={() => handleQueryFilter(null)}
                            isActive={queryFilter === null}
                            countData={total}
                            label="Tất cả"
                        />
                        <FilterTab
                            onFilter={() => handleQueryFilter('active')}
                            isActive={queryFilter === 'active'}
                            countData={active}
                            label="Hoạt động"
                        />
                        <FilterTab
                            onFilter={() => handleQueryFilter('inactive')}
                            isActive={queryFilter === 'inactive'}
                            countData={inactive}
                            label="Vô hiệu hóa"
                        />
                    </div>
                </div>

                {posts.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-2">Bài viết</td>
                                    <td className="px-4 py-2">Danh mục & Slug</td>
                                    <td className="px-4 py-2">Người tạo</td>
                                    <td className="px-4 py-2">Ngày đăng</td>
                                    <td className="px-4 py-2">Trạng thái</td>
                                    <td className="px-4 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.data.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200">
                                        <td className="px-4 py-2.75">
                                            <div className="flex items-center gap-5">
                                                <a target="blank" href={item.media?.file_url}>
                                                    <img src={item.media?.file_url} alt={item.media?.file_name} className="h-18 w-30 rounded-lg object-cover" />
                                                </a>
                                                <div className="flex flex-col gap-1">
                                                    <p className="w-35 truncate font-medium">{item.title}</p>
                                                    <p className="w-35 truncate text-gray-500">{item.desc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.75">
                                            <div className="flex flex-col gap-1">
                                                <div className="w-30 truncate">{item.category?.name}</div>
                                                <div className="w-50 truncate text-gray-500">{item.slug}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.75">
                                            <div className="w-30 truncate">
                                                {item.user?.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.75">
                                            <div className="w-25 truncate">
                                                {item.created_at}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.75">
                                            <div className="w-25">
                                                <Badge status={item.status} />
                                            </div>
                                        </td>
                                        <td className="px-4 py-2.75">
                                            <div className="flex h-6.75 gap-2">
                                                <ButtonEditLink route={`/admin/posts/${item.id}/edit`} />
                                                <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="md:hidden inline-flex flex-col gap-2 w-full">
                            {posts.data.map(item => (
                                <div key={item.id} className="border-b border-gray-200 p-3 w-full flex justify-between h-24">
                                    <div className="relative">
                                        <div className="flex items-center gap-5">
                                            <a target="blank" href={item.media?.file_url}>
                                                <img src={item.media?.file_url} alt={item.media?.file_name} className="h-18 w-30 rounded-lg object-cover" />
                                            </a>
                                            <div className="flex flex-col gap-1">
                                                <p className="w-30 truncate font-medium">{item.title}</p>
                                                <p className="w-30 truncate text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                        {item.status === 'active' && (
                                            <div className="absolute left-28 -bottom-1 h-3 w-3 rounded-full bg-green-600"></div>
                                        )}
                                        {item.status === 'inactive' && (
                                            <div className="absolute left-28 -bottom-1 h-3 w-3 rounded-full bg-red-600"></div>
                                        )}
                                    </div>

                                    <div className="flex flex-col h-6.75 gap-2">
                                        <ButtonEditLink route={`/admin/posts/${item.id}/edit`} />
                                        <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {posts?.data.length === 0 && (
                    <EmptyData>
                        <ButtonCreateLink route="/admin/posts/create" />
                    </EmptyData>
                )}

                {/* pagination */}
                {posts.data?.length > 0 && (
                    <Pagination
                        firstUrl={posts.first_page_url}
                        lastUrl={posts.last_page_url}
                        prevUrl={posts.prev_page_url}
                        nextUrl={posts.next_page_url}
                        currentPage={posts.current_page}
                        lastPage={posts.last_page}
                    />
                )}
            </section>
        </>
    )
}