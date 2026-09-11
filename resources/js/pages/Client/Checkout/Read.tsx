import { useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useForm, usePage, router } from '@inertiajs/react';

import Progress from '@/components/Client/CheckoutPage/Progress';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

import { vndFormat } from '@/lib/currency_format';
import { CheckoutProps } from '@/types/module/client_checkout';

export default function Read({
    step,
    info_save,
    payment_save,
    cart,
}: CheckoutProps) {
    const { props } = usePage();
    const errorAction = props.errors[0];

    // Tổng giỏ hàng
    const total: any = usePage().props.total;

    // Form info data
    const { data, setData, post, errors, clearErrors } = useForm({
        name: info_save?.name ?? '',
        email: info_save?.email ?? '',
        address: info_save?.address ?? '',
        tel: info_save?.tel ?? '',
        note: info_save?.note ?? '',
    });

    // Form payment data
    const {
        data: dataPayment,
        setData: setDataPayment,
        post: postPayment,
        errors: paymentErrors,
    } = useForm({
        payment_method: payment_save ?? '',
    });

    // Kiểm tra form nào đang được Submit
    let formAction = '';
    if (step == 1) {
        formAction = 'confirm_info';
    }
    if (step == 2) {
        formAction = 'confirm_payment';
    }

    // Submit Form
    const handleSubmitInfo = (e: React.SubmitEvent) => {
        e.preventDefault();
        post('/thanh-toan/xac-nhan-thong-tin', {
            preserveScroll: true,
        });
    };

    // Submit Form Payment
    const handleSubmitPayment = (e: React.SubmitEvent) => {
        e.preventDefault();
        postPayment('/thanh-toan/phuong-thuc-thanh-toan', {
            preserveScroll: true,
        });
    };

    // Tự động Focus
    const ipRef = useRef<any>(null);
    useEffect(() => {
        if (ipRef.current) {
            ipRef.current.focus();
        }

        return () => {
            ipRef.current = null;
        };
    }, []);

    // Rời đi
    const handleLeave = () => {
        if (Object.values(info_save)?.length > 0) {
            if (step == 1) {
                if (
                    confirm(
                        'Bạn có chắc muốn rời đi và hủy quá trình thanh toán ? ',
                    )
                ) {
                    router.visit(`/gio-hang`);
                }
            } else {
                router.visit(`/thanh-toan?step=${step - 1}`);
            }
        }
    };

    // Đặt hàng
    const handleOrder = () => {
        router.post('/dat-hang-thanh-cong', {is_confirm_order : true});
    };

    return (
        <div className="mx-auto mt-10 flex max-w-312 flex-col items-center justify-center gap-4 pb-10">
            <Progress />

            {/* Xác nhận thông tin */}
            {step == 1 && (
                <div className="h-fit w-140 rounded-3xl bg-white p-4 shadow">
                    {errorAction && (
                        <p className="text-red-600">{errorAction}</p>
                    )}

                    <form
                        onSubmit={handleSubmitInfo}
                        method="post"
                        id="confirm_info"
                    >
                        <div className="mt-2">
                            <Input
                                type="text"
                                name="name"
                                label="Họ và tên"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                error={errors.name}
                                ref={ipRef}
                                autoComplete="name"
                                onBlur={() => clearErrors('name')}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                type="tel"
                                name="tel"
                                label="Số điện thoại"
                                value={data.tel}
                                onChange={(e) => setData('tel', e.target.value)}
                                error={errors.tel}
                                autoComplete="tel"
                                onBlur={() => clearErrors('tel')}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                type="text"
                                name="email"
                                label="Email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                autoComplete="username"
                                onBlur={() => clearErrors('email')}
                            />
                        </div>

                        <div className="mt-2">
                            <Textarea
                                onBlur={() => clearErrors('address')}
                                onChange={(e) =>
                                    setData('address', e.target.value)
                                }
                                error={errors.address}
                                value={data.address}
                                label="Địa chỉ nhận hàng"
                                name="address"
                                className="h-20!"
                            />
                        </div>

                        <div className="mt-2">
                            <Textarea
                                onBlur={() => clearErrors('note')}
                                onChange={(e) =>
                                    setData('note', e.target.value)
                                }
                                error={errors.note}
                                value={data.note}
                                label="Ghi chú giao hàng"
                                name="note"
                                className="h-20!"
                            />
                        </div>
                    </form>
                </div>
            )}

            {/* Phương thức thanh toán */}
            {step == 2 && (
                <div className="h-fit w-140 rounded-3xl bg-white p-4 shadow">
                    {errorAction && (
                        <p className="text-red-600">{errorAction}</p>
                    )}

                    {paymentErrors.payment_method && (
                        <p className="mb-4 text-red-600">
                            {paymentErrors.payment_method}
                        </p>
                    )}

                    <form
                        onSubmit={handleSubmitPayment}
                        method="post"
                        className="flex flex-col gap-2"
                        id="confirm_payment"
                    >
                        <label
                            htmlFor="payment_method"
                            className="flex items-center gap-2 rounded-xl border border-gray-200 p-4"
                        >
                            <input
                                checked={dataPayment.payment_method == 'cod'}
                                type="radio"
                                name="payment_method"
                                id="payment_method"
                                value="cod"
                                onChange={(e) =>
                                    setDataPayment(
                                        'payment_method',
                                        e.target.value,
                                    )
                                }
                            />
                            <div>COD (Thanh toán khi nhận hàng)</div>
                        </label>

                        <label
                            htmlFor="bank"
                            className="flex items-center gap-2 rounded-xl border border-gray-200 p-4"
                        >
                            <input
                                checked={dataPayment.payment_method == 'bank'}
                                type="radio"
                                name="payment_method"
                                id="bank"
                                value="bank"
                                onChange={(e) =>
                                    setDataPayment(
                                        'payment_method',
                                        e.target.value,
                                    )
                                }
                            />
                            <div>Vietcombank (Thanh toán trực tuyến)</div>
                        </label>

                        <label
                            htmlFor="momo"
                            className="flex items-center gap-2 rounded-xl border border-gray-200 p-4"
                        >
                            <input
                                checked={dataPayment.payment_method == 'momo'}
                                type="radio"
                                name="payment_method"
                                id="momo"
                                value="momo"
                                onChange={(e) =>
                                    setDataPayment(
                                        'payment_method',
                                        e.target.value,
                                    )
                                }
                            />
                            <div>Momo (Ví Momo , Ví trả sau,...)</div>
                        </label>
                    </form>
                </div>
            )}

            {/* confirm order */}
            {step == 3 && (
                <div className="h-fit w-140 space-y-2 rounded-3xl bg-white p-4 shadow">
                    {/* info */}
                    <div className="space-y-2">
                        <h1 className="text-lg font-medium tracking-tight">
                            Thông tin giao hàng
                        </h1>

                        <div className="space-y-1 rounded-xl border border-gray-200 p-4">
                            <p>Họ và tên: {info_save.name}</p>
                            <p>Số điện thoại: {info_save.tel}</p>
                            <p>Email: {info_save.email}</p>
                            <p>Địa chỉ nhận hàng: {info_save.address}</p>
                            <p>Ghi chú: {info_save.note ?? 'Không ghi chú'}</p>
                        </div>
                    </div>

                    {/* cart */}
                    <div>
                        <h1 className="text-lg font-medium tracking-tight">
                            Sản phẩm ({total.count})
                        </h1>

                        {Object.values(cart).map((item) => (
                            <div key={item.product_id + item.key}>
                                <div className="mt-2 flex items-center justify-between pr-1 pb-2">
                                    <div className="flex items-center gap-4">
                                        {/* Ảnh */}
                                        <div className="relative flex h-25 w-35 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-2">
                                            <img
                                                src={item.image}
                                                alt={item.image_alt}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>

                                        {/* thông tin */}
                                        <div className="space-y-1">
                                            <p className="truncate">
                                                {item.name}
                                            </p>
                                            <p>
                                                Mã sản phẩm: (
                                                {item.variant_code})
                                            </p>
                                            <p>
                                                Số lượng:{' '}
                                                <span className="font-medium">
                                                    x{item.qty}
                                                </span>
                                            </p>
                                            <p>
                                                Giá:{' '}
                                                <span className="font-medium">
                                                    {vndFormat(
                                                        item.price_discount > 0
                                                            ? item.price_discount
                                                            : item.price,
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* total */}
                    <hr className="border border-gray-100" />

                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <p>Phí vận chuyển</p>
                            <p className="text-gray-500">Miễn phí</p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p>Tổng hóa đơn</p>
                            <p className="text-lg font-medium">
                                {vndFormat(total.total_price)}
                            </p>
                        </div>
                    </div>

                    <Button
                        onClick={handleOrder}
                        className="w-full cursor-pointer active:bg-blue-700"
                    >
                        Đặt hàng
                    </Button>
                </div>
            )}

            {/* redirect */}
            <div className="flex w-135 justify-between">
                <div
                    onClick={handleLeave}
                    className="group flex cursor-pointer items-center gap-1 text-gray-600"
                >
                    <ChevronLeft
                        size={18}
                        className="relative mt-0.5 transition-all duration-150 ease-out group-hover:-translate-x-1"
                    />
                    <span>Quay về</span>
                </div>

                {step != 3 && (
                    <button
                        form={formAction}
                        type="submit"
                        className="group flex cursor-pointer items-center gap-1 text-blue-600"
                    >
                        <span>Tiếp theo</span>
                        <ChevronRight
                            size={18}
                            className="relative mt-0.5 transition-all duration-150 ease-out group-hover:translate-x-1"
                        />
                    </button>
                )}
            </div>
        </div>
    );
}
