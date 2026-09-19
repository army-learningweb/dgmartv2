import { OrderDetailPageProps } from '@/types/module/order_details';
import { Head, useForm } from '@inertiajs/react';
import { vndFormat } from '@/lib/currency_format';
import { Fragment } from 'react/jsx-runtime';
import Title from '@/components/Admin/TableManager/Title';
import OrderInfoItem from './OrderInfoItem';
import BadgePayment from '@/components/ui/BadgePayment';
import BadgeShipping from '@/components/ui/BadgeShipping';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

export default function Details({
    order_info,
    order_details,
}: OrderDetailPageProps) {

    interface UpdateOrder {
        status_payment: any;
        status_shipping: any;
    }

    const { data, setData, patch, processing } = useForm<UpdateOrder>({
        status_payment: order_info.status_payment,
        status_shipping: order_info.status_shipping,
    });

    const handleUpdate = (e: React.SubmitEvent) => {
        e.preventDefault();
        patch(`/admin/orders/update/${order_info.id}`, {
            preserveScroll: true,
        })
    };

    return (
        <>
            <Head title="Chi tiết đơn hàng"></Head>
            <section className="space-y-3">

                {/* info */}
                <Title heading={`Đơn hàng (${order_info.code})`} />
                <div className="grid grid-cols-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="space-y-3">
                        <OrderInfoItem title="Khách hàng">
                            {order_info.customer.name}
                        </OrderInfoItem>
                        <OrderInfoItem title="Email">
                            {order_info.customer.email}
                        </OrderInfoItem>
                        <OrderInfoItem title="Số điện thoại">
                            {order_info.customer.tel}
                        </OrderInfoItem>
                    </div>

                    <div className="space-y-3">
                        <OrderInfoItem title="Địa chỉ giao hàng">
                            {order_info.shipping_address}
                        </OrderInfoItem>
                        <OrderInfoItem title="Ghi chú giao hàng">
                            {order_info.shipping_note ?? `Không có ghi chú`}
                        </OrderInfoItem>
                        <OrderInfoItem title="Phương thức thanh toán">
                            {order_info.payment_method == 'cod'
                                ? '(COD) Thanh toán khi nhận hàng'
                                : '(Online Payment) Thanh toán Online'}
                        </OrderInfoItem>
                    </div>
                            
                    <div className="space-y-3">
                        <OrderInfoItem title="Trạng thái thanh toán">
                            <BadgePayment
                                className="mt-2"
                                status={order_info.status_payment}
                            />
                        </OrderInfoItem>
                        <OrderInfoItem title="Trạng thái đơn hàng">
                            <BadgeShipping
                                className="mt-2"
                                status={order_info.status_shipping}
                            />
                        </OrderInfoItem>
                    </div>
                </div>
                
                {/* product data */}
                <div className="mt-3 h-full overflow-hidden rounded-xl border border-gray-200">
                    <table className="hidden w-full md:table">
                        <thead className="border-b border-gray-200 bg-gray-50 font-medium text-gray-800 last-of-type:border-b-0">
                            <tr>
                                <td className="px-4 py-2">Sản phẩm</td>
                                <td className="px-4 py-2 text-center">
                                    Số lượng ({order_info.qty})
                                </td>
                                <td className="px-4 py-2">Tổng tiền</td>
                                <td className="px-4 py-2">Cấu hình sản phẩm</td>
                            </tr>
                        </thead>

                        <tbody>
                            {order_details.data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-200 last-of-type:border-b-0"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-6">
                                            <div className="h-15 w-20 rounded-lg bg-white">
                                                <img
                                                    src={item.product_image}
                                                    alt={item.product_image_alt}
                                                    className="h-full w-full object-contain "
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {item.product_name}
                                                </p>
                                                <p className="text-gray-500">
                                                    Mã: {item.variant_code}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-medium">
                                        <div className="ms-5 flex w-25 justify-center">
                                            x{item.qty}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="w-35 truncate font-medium">
                                            {vndFormat(item.price)}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4">
                                        {item.configs?.length > 0 &&
                                            item.configs.map((item, index) => (
                                                <Fragment key={index}>
                                                    <p>{item.name}</p>
                                                </Fragment>
                                            ))}

                                        {item.configs?.length <= 0 && (
                                            <p>Không tìm thấy !</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* update */}
                <div className="flex gap-4">
                    <div className="flex-1 rounded-xl border border-gray-200 bg-gray-50 p-4 text-xl font-medium tracking-tight">
                        Tổng tiền: {vndFormat(order_info.total)}
                    </div>

                    <form
                        id="update-order"
                        onSubmit={handleUpdate}
                        className="w-[50%] space-y-2.5 rounded-xl border border-gray-200 bg-gray-50 p-4"
                    >
                        <Select
                            onChange={(e) =>
                                setData('status_payment', e.target.value)
                            }
                            value={data.status_payment}
                            name="update-status-payment"
                            label="Trạng thái thanh toán"
                            form="update-order"
                        >
                            <option value="paid">Đã thanh toán</option>
                            <option value="unpaid">Chưa thanh toán</option>
                        </Select>

                        <Select
                            onChange={(e) =>
                                setData('status_shipping', e.target.value)
                            }
                            value={data.status_shipping}
                            name="update-status-shipping"
                            label="Trang thái đơn hàng"
                            form="update-order"
                        >
                            <option value="awaiting">Chờ xác nhận</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="shipped">Đã gửi hàng</option>
                            <option value="delivery">Đang giao</option>
                            <option value="deliveryfailed">
                                Giao thất bại
                            </option>
                            <option value="delivered">Đã giao</option>
                            <option value="canceled">Đã hủy</option>
                            <option value="refund">Hoàn trả</option>
                        </Select>
                    </form>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" className="text-xs!">
                        Quay về
                    </Button>
                    <Button processing={processing} processingLabel='Đang xử lí...' form="update-order" className="text-xs!">
                        Cập nhật đơn hàng
                    </Button>
                </div>
            </section>
        </>
    );
}
