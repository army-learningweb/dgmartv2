import { Link } from '@inertiajs/react';
import { PackageCheck } from 'lucide-react';

export default function Complete() {
    return (
        <>
            <div className="mx-auto mt-10 flex max-w-312 flex-col items-center justify-center gap-4">
                <div className="flex w-[40%] flex-col items-center gap-4">
                    <div className="rounded-full bg-green-50 p-5">
                        <PackageCheck
                            size={50}
                            className="text-green-600"
                            strokeWidth={1.5}
                        />
                    </div>
                    <h1 className="text-3xl font-medium tracking-tighter text-green-600">
                        Đặt hàng thành công
                    </h1>

                    <p className="font-medium">
                        Cảm ơn bạn đã tin tưởng, lựa chọn Digimart!
                    </p>

                    <p className="text-center">
                        Đơn hàng của bạn đã được ghi nhận thành công. Chúng tôi
                        đã gửi một email xác nhận kèm thông tin chi tiết về đơn
                        hàng đến địa chỉ email của bạn.Bạn vui lòng kiểm tra Hộp
                        thư đến (hoặc thư mục Spam/Rác) để xem lại danh sách sản
                        phẩm, địa chỉ nhận hàng và mã theo dõi đơn hàng nhé.
                    </p>

                    <Link
                        href="https://mail.google.com/"
                        target="blank"
                        className="flex items-center justify-center rounded-lg bg-white pr-4 pl-2 text-xs font-medium shadow transition-all duration-150 active:translate-y-0.5"
                    >
                        <img
                            src="/images/gmail.jpg"
                            alt=""
                            className="h-8 w-8 object-contain"
                        />
                        <span>Kiểm tra Mail</span>
                    </Link>

                    <Link
                        href="/laptop"
                        className="text-blue-600 hover:underline"
                    >
                        Tiếp tục mua sắm
                    </Link>
                </div>
            </div>
        </>
    );
}
