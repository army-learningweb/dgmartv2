import { usePage } from '@inertiajs/react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, Funnel } from 'lucide-react';
import Card from '@/components/Client/ProductCard/Card';
import Pagination from '@/components/Admin/Pagination/Pagination';
import FilterTab from '@/components/Client/Filter/FilterTab';
import SectionPage from '@/components/Client/SectionPage/SectionPage';

import { useFilter } from '@/hooks/use-filter';
import { ReadDataProduct } from '@/types/module/client_product';

export default function Read({
    products,
    categories,
    category,
    price,
}: ReadDataProduct) {
    const { url } = usePage();
    const path = url.split('?')[0];

    // Hooks bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: path,
        initialsFilter: {
            page:
                products.meta.current_page === 1
                    ? ''
                    : products.meta.current_page,
        },
        onlyLoad: ['products', 'category', 'price'],
    });

    let title;
    if (path.startsWith('/laptop')) title = 'Laptop';
    if (path.startsWith('/phu-kien')) title = 'Phụ kiện';
    if (path.startsWith('/camera-dong-ho')) title = 'Camera & Đồng hồ';

    return (
        <SectionPage head="Sản phẩm" title={title}>
            <div className="md:flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1 overflow-x-auto scrollbar-thin scrollbar-track-transparent pb-2 md:pb-0 ">
                    {/* filter category */}
                    {categories.childs?.length > 0 && (
                        <div className="ms-4 md:ms-0 mt-2 flex w-max gap-1 whitespace-nowrap text-[13px] py-1">
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
                </div>

                <div className="ms-4 mt-2 flex items-center gap-2">
                    {/* order price */}
                    <div className="flex items-center gap-1 text-[13px] font-medium">
                        <FilterTab
                            active={!price}
                            onFilter={() => handleQueryFilter({ price: '' })}
                        >
                            <span>Giá mặc định</span>
                        </FilterTab>

                        <FilterTab
                            active={price == 'asc'}
                            onFilter={() => handleQueryFilter({ price: 'asc' })}
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

            <div className="mt-6 flex-1">
                {/* product */}
                <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 px-4`}>
                    {products.data.map((item) => (
                        <Card 
                            key={item.id} 
                            dataItem={item}
                            className='w-full! h-80!' 
                        />
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
        </SectionPage>
    );
}
