import StatisOrderItem from "@/components/Admin/Statis/StatisOrderItem"
import Title from '@/components/Admin/TableManager/Title';
import BadgePayment from "@/components/ui/BadgePayment";
import BadgeShipping from "@/components/ui/BadgeShipping";
import { PaginatedData } from "@/types/module/global";
import { vndFormat } from '@/lib/currency_format';
import { Order } from '@/types/module/orders';
import { Link } from '@inertiajs/react';

interface DashboardProps {
    revenue: number;
    order: number;
    post: number;
    product: number;
    orders: PaginatedData<Order>;
}

export default function Dashboad({
    revenue,
    order,
    post,
    product,
    orders,
}: DashboardProps) {

    return (
        <>
            {/* card */}
            <div className="grid gap-4 font-medium md:grid-cols-4">
                <StatisOrderItem
                    title="Đơn hàng chờ xử lí"
                    value={order}
                    className="h-30!"
                />
                <StatisOrderItem
                    title="Doanh thu"
                    value={vndFormat(revenue)}
                    className="h-30!"
                />
                <StatisOrderItem
                    title="Tổng số sản phẩm"
                    value={product}
                    className="h-30!"
                />
                <StatisOrderItem
                    title="Tổng số bài viết"
                    value={post}
                    className="h-30!"
                />
            </div>

            {/* table */}
            <Title heading="Đơn hàng gần đây" className="mt-3!" />

            {orders.data?.length <= 0 && (
                <div className="mt-4 min-h-122 rounded-xl bg-gray-100 flex flex-col gap-2 justify-center items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-medium">!</div>

                    <div className="text-gray-500">
                        Hiện chưa có đơn hàng nào
                    </div>
                </div>
            )}

            {orders.data?.length > 0 && (
                <div className="mt-3 h-fit overflow-hidden rounded-xl border border-gray-200">
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
                                            href={`/admin/orders/${item.id}`}
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
                                                status={item.status_shipping}
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
                                            href={`/admin/orders/${item.id}`}
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
                </div>
            )}
        </>
    );
}