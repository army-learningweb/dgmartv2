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

            {/* empty */}
            {orders.data?.length <= 0 && (
                <div className="mt-4 flex min-h-122 flex-col items-center justify-center gap-2 rounded-xl bg-gray-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-medium">
                        !
                    </div>

                    <div className="text-gray-500">
                        Hiện chưa có đơn hàng nào
                    </div>
                </div>
            )}

            {/* data */}
            {orders.data?.length > 0 && (
                <div className="mt-3 h-fit overflow-hidden rounded-xl md:border md:border-gray-200">
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

                    {/* mobile */}
                    <div className="space-y-4 md:hidden pb-4">
                        {orders.data.map((item) => (
                            <div className="flex justify-between rounded-xl border border-gray-300 p-4">
                                <div className="space-y-1">
                                    <Link href={`/admin/orders/${item.id}`} className="inline-block font-medium text-blue-600 hover:underline w-50 truncate">
                                        Đơn hàng: {item.code}
                                    </Link>
                                    <p className="w-40 truncate">Khách hàng: Lưu Đức Vỹ</p>
                                    <p>Ngày: {item.created_at}</p>
                                    <p className="font-medium">
                                        {vndFormat(item.total)}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div>
                                        <p>Trạng thái thanh toán</p>
                                        <BadgePayment
                                            status={item.status_payment}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <p>Trạng thái đơn hàng</p>
                                        <BadgeShipping
                                            status={item.status_shipping}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}