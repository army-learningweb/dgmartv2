import { Head } from '@inertiajs/react';
import Title from '@/components/Admin/TableManager/Title';
import SearchBar from '@/components/Admin/TableManager/SearchBar';
import UserAvatar from '@/components/Admin/TableManager/UserAvatar';
import Pagination from '@/components/Admin/Pagination/Pagination';
import EmptyData from '@/components/Admin/Empty/EmptyData';

import { useSearch } from '@/hooks/use-search';
import { useFilter } from '@/hooks/use-filter';
import { CustomersReadType } from '@/types/module/customers';

export default function Read({
    customers,
    suggest_customers,
    search,
    total,
}: CustomersReadType) {


    // Bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/admin/customers',
        initialsFilter: {
            search,
            page: customers.current_page,
        },
        onlyLoad: ['customers'],
    });

    // Tìm kiếm
    const {
        querySearch,
        loadingSearch,
        dataSuggest,
        openSuggest,
        placeholderSearch,
        handleQuerySearch,
        handleClearQuerySearch,
        handleSetPlaceHolder,
        handleFocusSearch,
        handleBlurSearch,
        handleChoose,
        handleLeave,
    } = useSearch({
        handleQueryFilter,
        search,
        initialData: suggest_customers,
        placeholder: 'Tìm kiếm theo tên, số điện thoại...',
        routeGetData: '/admin/customers/getCustomers',
    });

    return (
        <>
            <Head title="Khách hàng" />
            <section>
                {/* title */}

                <Title heading={`Khách mua hàng (${total})`} />

                {/* filter & search */}
                <div className="mt-4 flex flex-col items-center justify-between md:flex-row">
                    {/* filter & search */}

                    <SearchBar
                        onChange={handleQuerySearch}
                        onClearQuery={handleClearQuerySearch}
                        onFocus={handleFocusSearch}
                        onBlur={handleBlurSearch}
                        onMouseDown={handleChoose}
                        onMouseEnter={handleSetPlaceHolder}
                        onMouseLeave={handleLeave}
                        dataSuggest={dataSuggest}
                        querySearch={querySearch}
                        placeHolderSearch={placeholderSearch}
                        loadingSearch={loadingSearch}
                        openSuggest={openSuggest}
                    />
                </div>

                {/* data */}
                {customers.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-2">Khách hàng</td>
                                    <td className="px-4 py-2">Email</td>
                                    <td className="px-4 py-2">Số điện thoại</td>
                                    <td className="px-4 py-2">Ngày tạo</td>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition-alls border-b border-gray-200 duration-150 last-of-type:border-0"
                                    >
                                        {/* user */}
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <UserAvatar name={item.name} />
                                                <div className="flex flex-col gap-0.75">
                                                    <div className="w-35 truncate">
                                                        {item.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* email & tel */}
                                        <td className="px-4 py-3">
                                            <div className="w-50 truncate">
                                                {item.email}
                                            </div>
                                        </td>

                                        {/*  tel */}
                                        <td className="px-4 py-3">
                                            <div className="w-50 truncate">
                                                {item.tel}
                                            </div>
                                        </td>

                                        {/* create at */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate">
                                                {item.created_at}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="inline-flex w-full flex-col gap-1 md:hidden">
                            {customers.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-b border-gray-200 p-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="relative flex items-center gap-3">
                                            <UserAvatar name={item.name} />
                                            <div className="flex flex-col">
                                                <div className="w-30 truncate">
                                                    {item.name}
                                                </div>
                                                <div className="w-30 truncate text-gray-500">
                                                    {item.email}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {customers.data?.length === 0 && (
                    <EmptyData showFallBack={true} />
                )}

                {/* pagination */}
                {customers.data?.length > 0 && (
                    <Pagination
                        firstUrl={customers.first_page_url}
                        lastUrl={customers.last_page_url}
                        prevUrl={customers.prev_page_url}
                        nextUrl={customers.next_page_url}
                        currentPage={customers.current_page}
                        lastPage={customers.last_page}
                    />
                )}
            </section>
        </>
    );
}
