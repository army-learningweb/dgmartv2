import { Head } from '@inertiajs/react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Funnel } from 'lucide-react';
import { useState } from 'react';
import Card from '@/components/Client/ProductCard/Card';
import Pagination from '@/components/Admin/Pagination/Pagination';
import Filter from '@/components/Client/Filter/Filter';
import FilterTab from '@/components/Client/Filter/FilterTab';

import { useFilter } from '@/hooks/use-filter';
import { ReadDataProduct } from '@/types/module/client_product';

export default function Read({
    products,
    categories,
    category,
    price,
    cpu,
    gpu,
    ram,
    design,
}: ReadDataProduct) {
    console.log(products);

    // Bộ lọc hiện tại đang hoạt động
    const currentFilter = [cpu, gpu, ram, design];

    // Hooks bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/laptop',
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
            'ram',
            'cpu',
            'gpu',
            'design',
        ],
    });

    interface FilterDataReview {
        title: string;
        value: string;
        query_key: string;
    }

    const [FilterDataReview, setFilterDataReview] = useState<
        FilterDataReview[]
    >([]);

    // Lọc
    const handleFilterData = (queryFilter: any, queryFilterReview: any) => {
        handleQueryFilter(queryFilter);
        setFilterDataReview((prev) => {
            const exists = prev.some(
                (item) => item.title === queryFilterReview.title,
            );
            if (exists) {
                return prev.map((item) =>
                    item.title === queryFilterReview.title
                        ? queryFilterReview
                        : item,
                );
            }
            return [...prev, queryFilterReview];
        });
    };

    // Xóa lọc (1)
    const handleRemoveFilter = (value: string, queryFilter: any) => {
        handleQueryFilter(queryFilter);
        setFilterDataReview((prev) =>
            prev.filter((item) => item.value !== value),
        );
    };

    // Xóa tất cả lọc
    const handleClearAllFilter = () => {
        setFilterDataReview([]);
        const ResetFilterDataReview = FilterDataReview.map((item) => ({
            ...item,
            value: '',
        }));
        const emptyQuery = Object.fromEntries(
            ResetFilterDataReview.map((item) => [item.query_key, item.value]),
        );
        handleQueryFilter(emptyQuery);
    };

    interface FiltersProps {
        title: string;
        query_key: string;
        options: { value: string }[];
    }

    const Filters: FiltersProps[] = [
        {
            title: 'Ram',
            query_key: 'ram',
            options: [{ value: '8GB' }, { value: '16GB' }, { value: '32GB' }],
        },
        {
            title: 'CPU (Ổ cứng)',
            query_key: 'cpu',
            options: [{ value: '256GB' }, { value: '512GB' }],
        },
        {
            title: 'GPU (Card đồ họa)',
            query_key: 'gpu',
            options: [
                { value: 'NVIDIA' },
                { value: 'AMD' },
                { value: 'INTEL' },
            ],
        },
        {
            title: 'Design (Thiết kế & trọng lượng)',
            query_key: 'design',
            options: [
                { value: 'Vỏ nhựa' },
                { value: 'Vỏ nhôm' },
                { value: 'Vỏ kim loại' },
            ],
        },
    ];

    return (
        <>
            <div className='fixed top-[33%] left-10 w-13 h-13 bg-white shadow-md border border-gray-200 flex items-center justify-center rounded-full'>
                <Funnel/>
            </div>

            <div className='fixed w-full h-full top-0 left-0 bg-gray-500/40 z-40 hidden'>
                <div className="fixed top-13 left-5 z-50 w-[17%] hidden">
                    <Filter
                        data={Filters}
                        currentFilter={currentFilter}
                        onFilter={handleFilterData}
                        onRemove={handleRemoveFilter}
                        onClear={handleClearAllFilter}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-312 space-y-4">
                <Head title="Sản phẩm" />

                <h1 className="mt-4 inline-block text-5xl font-bold tracking-tight select-none">
                    Laptop
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
                        className={`mt-4 grid grid-cols-5 gap-3 ${FilterDataReview?.length > 0 ? '' : ''}`}
                    >
                        {products.data.map((item) => (
                            <Card key={item.id} dataItem={item} />
                        ))}
                    </div>

                    {/* pagination */}
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
        </>
    );
}
