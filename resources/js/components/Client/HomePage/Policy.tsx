import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';

export default function Policy() {

    const PolicyData = [
        {
            icon: <Truck size={30} />,
            title: 'Giao hàng miễn phí',
            desc: 'Áp dụng đơn hàng từ 500k toàn quốc',
        },
        {
            icon: <ShieldCheck size={30} />,
            title: 'Bảo hành chính hãng',
            desc: 'Cam kết 100% sản phẩm chính hãng',
        },
        {
            icon: <RefreshCw size={30} />,
            title: '1 Đổi 1 trong 30 ngày',
            desc: 'Nếu phát sinh lỗi từ nhà sản xuất',
        },
        {
            icon: <CreditCard size={30} />,
            title: 'Hỗ trợ trả góp 0%',
            desc: 'Thủ tục nhanh chóng qua thẻ tín dụng',
        },
    ];
    
    return (
        <>
            {PolicyData?.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 py-10 max-w-312 mx-auto">
                    {PolicyData.map((item) => (
                        <div key={item.title} className="flex flex-col items-center justify-center gap-4 p-5 text-center border-r border-gray-100 last-of-type:border-0">
                            <div className='text-blue-600'>{item.icon}</div>
                            <div>
                                <h4 className="text-[16px] font-semibold text-gray-900">
                                    {item.title}
                                </h4>
                                <p className="mt-1 text-gray-500">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
