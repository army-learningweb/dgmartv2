import { usePage } from '@inertiajs/react';
import ProgressItem from './ProgressItem';

export default function Progress() {
    const { props } = usePage();
    const step = Number(props.step);
    const progressWidth: { [key: number]: string } = {
        1: 'w-35',
        2: 'w-90',
        3: 'w-135',
    };

    return (
        <>
            {/* contruction */}
            <div className="flex w-150 justify-between">
                <ProgressItem num={1}>Nhập thông tin giao hàng</ProgressItem>
                <ProgressItem num={2}>Chọn phương thức thanh toán</ProgressItem>
                <ProgressItem num={3}>Xác nhận thông tin đặt hàng</ProgressItem>
            </div>

            {/* progress bar */}

            <div className="mx-auto h-1.5 w-135 rounded-full bg-gray-300">
                <div
                    className={`h-1.5 rounded-full bg-blue-600 ${progressWidth[step]}`}
                ></div>
            </div>
        </>
    );
}
