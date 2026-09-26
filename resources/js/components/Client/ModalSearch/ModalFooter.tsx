import { Link } from "@inertiajs/react";
import { CategoriesData } from '@/data/Categories';
import clsx from "clsx";

export default function ModalFooter(){
    return (
        <>
            <footer>
                <h2 className="text-lg font-medium tracking-tight select-none">
                    Danh mục sản phẩm
                </h2>
                <div className="mt-2 grid md:grid-cols-3 gap-2">
                    {CategoriesData.map((item, index) => (
                        <Link
                            href={item.route}
                            key={index}
                            className={clsx(
                                'inline-block h-fit shrink-0 overflow-hidden rounded-2xl border border-gray-200 shadow transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-lg',
                                {
                                    'bg-white': index % 2 === 0,
                                    'bg-black text-gray-200': index % 2 !== 0,
                                },
                            )}
                        >
                            <div className="space-y-2 p-4">
                                <h2 className="font-medium tracking-tight">
                                    {item.title}
                                </h2>
                                <p className="text-xs">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </footer>
        </>
    );
}