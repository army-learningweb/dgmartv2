export default function Banner() {
    return (
        <div className="mx-auto mt-15 flex h-80 max-w-312 items-center justify-between space-y-5 rounded-2xl">
            <div className="w-[40%] space-y-8">
                <h1 className="text-5xl font-bold tracking-tight">
                    Làm Việc & Giải Trí Không Giới Hạn
                </h1>
                <h2 className="text-3xl font-bold tracking-tight">
                    Cam kết hàng chính hãng 100%.
                </h2>
                <p className="text-[16px] tracking-tight">
                    Khám phá ngay các dòng Laptop và Phụ kiện công nghệ chính
                    hãng. Tối ưu trải nghiệm làm việc, giải trí của bạn mỗi
                    ngày.
                </p>
            </div>

            <div className="flex gap-2 py-12">
                <div className="z-10 h-70 w-55 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                    <img
                        src="images/banner3.png"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="z-20 h-70 w-55 shrink-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                    <img src="images/banner2.png" alt="" className="" />
                </div>
                <div className="z-30 h-70 w-55 shrink-0 rotate-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
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
