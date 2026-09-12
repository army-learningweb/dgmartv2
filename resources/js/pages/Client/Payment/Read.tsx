import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import LoadingCircle from '@/components/ui/LoadingCircle';

export default function Read() {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
        setIsLoading(true);
        router.post(
            'thanh-toan-online/confirm',
            { is_payment: true },
            {
                onFinish: () => setIsLoading(false),
            },
        );
    };

    return (
        <>
            <Head title="Thanh toán Online" />

            <div className="mx-auto mt-10 flex max-w-312 flex-col items-center justify-center">
                {/* Khung QR code */}
                <div className="mx-auto mb-6 flex h-65 w-70 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                    <span className="text-sm text-gray-400">
                        Mã QR thanh toán
                    </span>
                </div>

                <p className="mb-6 text-sm text-gray-500">
                    Mã QR mang tính chất giả định, bấm vào nút bên dưới để xác
                    nhận đã thanh toán
                </p>

                <Button
                    onClick={handleConfirm}
                    className="cursor-pointer active:bg-blue-700"
                    disabled={isLoading}
                >
                    {isLoading && <LoadingCircle />}
                    <span>Đã thanh toán</span>
                </Button>
            </div>
        </>
    );
}
