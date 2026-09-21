import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

import SearchBar from '@/components/Admin/TableManager/SearchBar';
import Pagination from '@/components/Admin/Pagination/Pagination';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import FilterTabGroup from '@/components/Admin/TableManager/FilterTabGroup';
import Select from '@/components/ui/Select';
import BadgePayment from '@/components/ui/BadgePayment';
import BadgeShipping from '@/components/ui/BadgeShipping';
import StatisOrderItem from '@/components/Admin/Statis/StatisOrderItem';

import { usePrevPage } from '@/hooks/use-prevPage';
import { useSearch } from '@/hooks/use-search';
import { useFilter } from '@/hooks/use-filter';
import { OrdersReadType } from '@/types/module/orders';
import { vndFormat } from '@/lib/currency_format';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function Read({
    orders,
    suggest_orders,
    search,
    status_shipping,
    status_payment,
    total,
    paid,
    unpaid,
    filter_date,
    revenue,
    orders_today,
}: OrdersReadType) {
    // Thông báo cập nhật thành công
    const { props } = usePage<any>();
    useEffect(() => {
        if (props.success != '') toast.success(props.success);
    }, []);

    // Lưu lại đường link
    const { queryString } = usePrevPage();

    // Bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/admin/orders',
        initialsFilter: {
            search,
            page: orders.current_page,
        },
        onlyLoad: [
            'orders',
            'status_shipping',
            'status_payment',
            'filter_date',
        ],
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
        initialData: suggest_orders,
        placeholder: 'Tìm kiếm theo mã đơn...',
        routeGetData: '/admin/orders/getOrders',
    });

    const filterStatusPayment = [
        {
            label: 'Tất cả',
            onFilter: () => handleQueryFilter({ status_payment: null }),
            countData: total,
            isActive: status_payment === null,
        },

        {
            label: 'Chưa thanh toán',
            onFilter: () => handleQueryFilter({ status_payment: 'unpaid' }),
            countData: unpaid,
            isActive: status_payment === 'unpaid',
        },
        {
            label: 'Đã thanh toán',
            onFilter: () => handleQueryFilter({ status_payment: 'paid' }),
            countData: paid,
            isActive: status_payment === 'paid',
        },
    ];

    return (
        <>
            <Head title="Đơn hàng" />

            <section>
                {/* title */}
                {/* <Title heading="Danh sách đơn hàng" /> */}

                <div className="grid grid-cols-4 gap-2 font-medium">
                    <StatisOrderItem
                        title="Đơn hàng hôm nay"
                        value={orders_today}
                    />
                    <StatisOrderItem
                        title="Doanh thu"
                        value={vndFormat(revenue)}
                    />
                    <StatisOrderItem
                        title="Đơn hàng đã thanh toán"
                        value={paid}
                    />
                    <StatisOrderItem
                        title="Đơn hàng chưa thanh toán"
                        value={unpaid}
                    />
                </div>

                <div className="mt-4 flex justify-between">
                    <div className="flex gap-2">
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

                        {/* filter */}
                        <Select
                            className="w-70!"
                            name="filter-category"
                            onChange={(e) =>
                                handleQueryFilter({
                                    status_shipping: e.target.value,
                                })
                            }

                            value={status_shipping ?? ''}
                        >
                            <option value="">Theo trạng thái đơn hàng</option>
                            <option value="awaiting">Chờ xác nhận</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="shipped">Đã gửi hàng</option>
                            <option value="delivery">Đang giao</option>
                            <option value="deliveryfailed">
                                Giao thất bại
                            </option>
                            <option value="delivered">Đã giao</option>
                            <option value="canceled">Đã hủy</option>
                            <option value="refund">Hoàn tiền</option>
                        </Select>

                        {/* filter date */}
                        <input
                            type="date"
                            name="filter-date"
                            id="filter-date"
                            className="w-full rounded-lg border border-gray-200 px-2 py-1.75 transition-colors duration-150 focus:outline-0 md:w-fit"
                            min="2026-08-18"
                            max="2030-12-31"

                            onChange={(e) =>
                                handleQueryFilter({
                                    filter_date: e.target.value,
                                })
                            }
                            value={filter_date ?? ''}
                        />
                    </div>

                    {/* stats payment */}
                    <FilterTabGroup data={filterStatusPayment} />
                </div>

                {/* data */}
                {orders.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-2">Mã đơn</td>
                                    <td className="px-4 py-2">Khách hàng</td>
                                    <td className="px-4 py-2">Ngày</td>

                                    <td className="px-4 py-2">
                                        <div className="ms-1.5">Đơn hàng</div>
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="ms-1.5">Thanh toán</div>
                                    </td>
                                    <td className="px-4 py-2">Chi tiết</td>
                                    <td className="px-4 py-2 text-right">
                                        Tổng tiền
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition-alls border-b border-gray-200 duration-150 last-of-type:border-0"
                                    >
                                        {/* code */}
                                        <td className="px-4 py-3">
                                            <Link
                                                className="w-35 truncate rounded-lg text-xs font-medium text-blue-600 hover:underline"
                                                href={`/admin/orders/${item.id}${queryString ? `?${queryString}` : ''}`}
                                            >
                                                {item.code}
                                            </Link>
                                        </td>

                                        {/* customer */}
                                        <td className="px-4 py-3">
                                            <div className="w-35 truncate">
                                                {item.customer.name}
                                            </div>
                                        </td>

                                        {/* create at */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate">
                                                {item.created_at}
                                            </div>
                                        </td>

                                        {/* status */}
                                        <td className="px-4 py-3">
                                            <div className="w-25">
                                                <BadgeShipping
                                                    status={
                                                        item.status_shipping
                                                    }
                                                />
                                            </div>
                                        </td>

                                        {/* status payment */}
                                        <td className="px-4 py-3">
                                            <div className="w-25">
                                                <BadgePayment
                                                    status={item.status_payment}
                                                />
                                            </div>
                                        </td>

                                        {/* setting */}
                                        <td className="px-4 py-3">
                                            <Link
                                                className="rounded-lg text-xs font-medium text-blue-600 hover:underline"
                                                href={`/admin/orders/${item.id}${queryString ? `?${queryString}` : ''}`}
                                            >
                                                Xem chi tiết
                                            </Link>
                                        </td>

                                        {/* total */}
                                        <td className="px-4 py-3 text-right font-medium">
                                            {vndFormat(item.total)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="inline-flex w-full flex-col gap-1 md:hidden">
                            {orders.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-b border-gray-200 p-3"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="relative flex items-center gap-3">
                                            {/* {item.status === 'active' && (
                                                <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-green-600"></div>
                                            )}
                                            {item.status === 'inactive' && (
                                                <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-red-600"></div>
                                            )}
                                            <UserAvatar name={item.name} />
                                            <div className="flex flex-col">
                                                <div className="w-30 truncate">
                                                    {item.name}
                                                </div>
                                                <div className="w-30 truncate text-gray-500">
                                                    {item.email}
                                                </div>
                                            </div> */}
                                        </div>
                                        {/* <div className="flex flex-col gap-2 md:flex-row">
                                            <ButtonEdit
                                                onEdit={() => handleEdit(item)}
                                            />
                                            <ButtonDelete
                                                onDelete={() =>
                                                    handleDelete(item.id)
                                                }
                                            />
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {orders.data?.length === 0 && <EmptyData showFallBack={true} />}

                {/* pagination */}
                {orders.data?.length > 0 && (
                    <Pagination
                        firstUrl={orders.first_page_url}
                        lastUrl={orders.last_page_url}
                        prevUrl={orders.prev_page_url}
                        nextUrl={orders.next_page_url}
                        currentPage={orders.current_page}
                        lastPage={orders.last_page}
                    />
                )}
            </section>
        </>
    );
}
