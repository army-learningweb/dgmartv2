import Logo from "@/components/ui/Logo"

export default function Banner() {
    return (
        <div className="mx-auto md:mt-15 mt-10 flex max-w-312 flex-col items-center justify-between rounded-2xl px-5 md:h-80 md:flex-row md:space-y-5 md:px-0">
            <div className="md:hidden mb-8">
                <Logo route="/" className="text-5xl!" />
            </div>

            <div className="space-y-8 text-center md:w-[45%] md:text-left">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Làm Việc & Giải Trí Không Giới Hạn
                </h1>
                <h2 className="text-lg font-bold tracking-tight md:text-2xl">
                    Cam kết hàng chính hãng 100%.
                </h2>
                <p className="text-[15px] tracking-tight md:text-[16px]">
                    Khám phá ngay các dòng Laptop và Phụ kiện công nghệ chính
                    hãng. Tối ưu trải nghiệm làm việc, giải trí của bạn mỗi
                    ngày.
                </p>
            </div>

            <div className="flex gap-2 py-6 md:py-12">
                <div className="z-10 h-40 w-30 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg md:h-70 md:w-55">
                    <img
                        src="images/banner3.png"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="z-20 h-40 w-30 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg md:h-70 md:w-55">
                    <img src="images/banner2.png" alt="" className="" />
                </div>
                <div className="z-30 h-40 w-30 shrink-0 rotate-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl md:h-70 md:w-55">
                    <img src="images/banner1.png" alt="" />
                </div>
            </div>

            {/* <Link
                href=""
                className="rounded-xl bg-blue-600 px-4 py-2 text-[16px] tracking-tight text-white"
            >
                Khám phá ngay
            </Link> */}
        </div>
    );
}
