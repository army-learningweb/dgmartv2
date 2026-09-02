import { Head } from '@inertiajs/react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Funnel } from 'lucide-react';
import { useState } from 'react';
import Card from '@/components/Client/ProductCard/Card';
import Pagination from '@/components/Admin/Pagination/Pagination';
import Filter from '@/components/Client/Filter/Filter';
import FilterTab from '@/components/Client/Filter/FilterTab';
import Button from '@/components/ui/Button';

import { useFilter } from '@/hooks/use-filter';
import { ReadDataProduct } from '@/types/module/client_product';

export default function Read({
    products,
    categories,
    category,
    price,
}: ReadDataProduct) {

    // Hooks bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/camera-dong-ho',
        initialsFilter: {
            page:
                products.meta.current_page === 1
                    ? ''
                    : products.meta.current_page,
        },
        onlyLoad: [
            'products',
            'category',
            'price',
        ],
    });

    return (
        <>
            <div className="mx-auto max-w-312 space-y-4">
                <Head title="Camera & Đồng hồ" />

                <h1 className="mt-4 inline-block text-5xl font-bold tracking-tight select-none">
                    Camera & Đồng hồ
                </h1>

                <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* filter category */}
                        {categories.childs?.length > 0 && (
                            <div className="mt-2 flex w-fit gap-1 rounded-xl bg-gray-100 p-1 text-[13px]">
                                <FilterTab
                                    active={!category}
                                    onFilter={() =>
                                        handleQueryFilter({ category: '' })
                                    }
                                >
                                    Tất cả
                                </FilterTab>
                                {categories.childs.map((item) => (
                                    <FilterTab
                                        key={item.id}
                                        active={item.id == category}
                                        onFilter={() =>
                                            handleQueryFilter({
                                                category: item.id,
                                            })
                                        }
                                    >
                                        {item.name}
                                    </FilterTab>
                                ))}
                            </div>
                        )}

                        {/* statis */}
                        <div className="mt-2 flex items-center justify-between">
                            <p className="font-medium text-gray-700">
                                ({products.meta.total}) sản phẩm
                            </p>
                        </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                        {/* order price */}
                        <p className="text-[13px] font-medium">
                            Sắp xếp theo giá
                        </p>
                        <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1 text-[13px] font-medium">
                            <FilterTab
                                active={!price}
                                onFilter={() =>
                                    handleQueryFilter({ price: '' })
                                }
                            >
                                <span>Mặc định</span>
                            </FilterTab>

                            <FilterTab
                                active={price == 'asc'}
                                onFilter={() =>
                                    handleQueryFilter({ price: 'asc' })
                                }
                            >
                                <ArrowUpNarrowWide size={17} />
                                <span>Thấp đến cao</span>
                            </FilterTab>

                            <FilterTab
                                active={price == 'desc'}
                                onFilter={() =>
                                    handleQueryFilter({ price: 'desc' })
                                }
                            >
                                <ArrowDownWideNarrow size={17} />
                                <span>Cao đến thấp</span>
                            </FilterTab>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    {/* product */}
                    <div
                        className={`mt-4 grid grid-cols-5 gap-3`}
                    >
                        {products.data.map((item) => (
                            <Card key={item.id} dataItem={item} />
                        ))}
                    </div>

                    {/* pagination */}

                    <div className="mt-5 flex justify-center">
                        <Pagination
                            firstUrl={products.links?.first}
                            lastUrl={products.links?.last}
                            prevUrl={products.links?.prev}
                            nextUrl={products.links?.next}
                            currentPage={products.meta?.current_page}
                            lastPage={products.meta?.last_page}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
