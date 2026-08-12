import { Head, router } from "@inertiajs/react"
import { useState } from "react"
import toast from "react-hot-toast"

import Badge from "@/components/ui/Badge"
import SearchBar from "@/components/Admin/TableManager/SearchBar"
import FilterTab from "@/components/Admin/TableManager/FilterTab"
import Pagination from "@/components/Admin/Pagination/Pagination"
import EmptyData from "@/components/Admin/Empty/EmptyData"
import ButtonEditLink from "@/components/Admin/TableManager/ButtonEditLink"
import ButtonDelete from "@/components/Admin/TableManager/ButtonDelete"

import { useSearch } from "@/hooks/use-search"
import { useFilter } from "@/hooks/use-filter"

import Title from "@/components/Admin/TableManager/Title"
import ButtonCreateLink from "@/components/Admin/TableManager/ButtonCreateLink"

import { ReadProductType } from "@/types/module/products"

export default function Read({ products, total, active, inactive, filter, search }: ReadProductType) {

    const [queryFilter, setQueryFilter] = useState<null | string>(filter ?? null);
    const [querySearch, setQuerySearch] = useState<string>(search ?? '');
    const { handleQueryFilter } = useFilter({ querySearch, setQueryFilter, route: "/admin/products" });
    const { isLoadingSearch, handleQuerySearch, handleClearSearch } = useSearch({ queryFilter, setQuerySearch, route: "/admin/products" });

    // Xóa
    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này ?')) {
            let toastID: string;
            router.delete(`/admin/products/${id}/delete`, {
                data: {
                    total: total,
                    current_page: products?.current_page,
                    post_on_page: products?.data?.length
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
            <Head title="Danh sách sản phẩm" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading="Danh sách sản phẩm" />
                    <ButtonCreateLink route="/admin/products/create" />
                </div>

                {/* filter & search */}
                <div className="mt-4 flex items-center justify-between">
                    {/* search */}
                    <SearchBar
                        onSearch={handleQuerySearch}
                        onClear={handleClearSearch}
                        querySearch={querySearch}
                        loadingSearch={isLoadingSearch}
                        resultCount={products.data.length}
                        placeHolder="Tìm kiếm theo tên..."
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

                {products.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-2">Sản phẩm</td>
                                    <td className="px-4 py-2">Slug (Friendly URL)</td>
                                    <td className="px-4 py-2">Người tạo</td>
                                    <td className="px-4 py-2">Ngày đăng</td>
                                    <td className="px-4 py-2">Trạng thái</td>
                                    <td className="px-4 py-2 text-center">Tùy chỉnh sản phẩm</td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0">
                                        <td className="px-4 py-1.75">
                                            <div className="flex items-center gap-5">
                                                <a target="blank" href={item.main_image?.file_url} className="w-20 h-20">
                                                    <img src={item.main_image?.file_url} alt={item.main_image?.file_name} className="h-full w-full rounded-lg object-cover" />
                                                </a>
                                                <div className="flex flex-col gap-1.5">
                                                    <p className="w-50 truncate font-medium">{item.name}</p>
                                                    <p className="w-fit truncate bg-blue-50 text-blue-600 py-1 px-3 rounded-md text-xs font-medium">
                                                        {item.category?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="flex flex-col gap-1">  
                                                <div className="w-60 truncate text-gray-500">{item.slug}</div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="w-30 truncate">
                                                {item.created_at}
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="w-30 truncate">
                                                {item.user?.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="w-25">
                                                <Badge status={item.status} />
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="flex h-6.75 gap-2">
                                                <ButtonEditLink route={`/admin/products/${item.id}/edit`} />
                                                <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="md:hidden inline-flex flex-col gap-2 w-full">
                            {/* {posts.data.map(item => (
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
                                        <Link href={`/admin/posts/${item.id}/edit`} className="flex gap-2 items-center  border border-gray-200 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg text-xs font-medium active:translate-y-0.5 transition-all duration-200 ">
                                                    <Pen size={13} className="text-gray-400" />
                                                    <span>Cập nhật</span>
                                                </Link>
                                        <Button onClick={() => handleDelete(item.id)} variant="outline" size="small" animatePress={true}>
                                            <Trash size={13} className="text-gray-400" />
                                            <span>Xóa</span>
                                        </Button>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    </div>
                )}

                {/* empty */}
                {products?.data.length === 0 && (
                    <EmptyData>
                        <ButtonCreateLink route="/admin/products/create" />
                    </EmptyData>
                )}

                {/* pagination */}
                {products.data?.length > 0 && (
                    <Pagination
                        firstUrl={products.first_page_url}
                        lastUrl={products.last_page_url}
                        prevUrl={products.prev_page_url}
                        nextUrl={products.next_page_url}
                        currentPage={products.current_page}
                        lastPage={products.last_page}
                    />
                )}
            </section>
        </>
    )
}