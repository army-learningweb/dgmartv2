import { Head } from '@inertiajs/react';
import Card from '@/components/Client/PostCard/Card';
import Pagination from '@/components/Admin/Pagination/Pagination';
import FilterTab from '@/components/Client/Filter/FilterTab';

import { useFilter } from '@/hooks/use-filter';
import { PostDataProps } from '@/types/module/client_posts';

export default function Read({
    posts,
    categories,
    category,
}: PostDataProps) {

    // Hooks bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/bai-viet-tin-tuc',
        initialsFilter: {
            page:
                posts.meta.current_page === 1
                    ? ''
                    : posts.meta.current_page,
        },
        onlyLoad: ['posts', 'category'],
    });

    return (
        <>
            <div className="mx-auto max-w-312 space-y-4">
                <Head title="Bài viết & Tin tức" />

                <h1 className="mt-4 inline-block text-5xl font-bold tracking-tight select-none">
                    Bài viết & Tin tức
                </h1>

                <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* filter category */}
                        {categories?.length > 0 && (
                            <div className="mt-2 flex w-fit gap-1 rounded-xl bg-gray-100 p-1 text-[13px]">
                                <FilterTab
                                    active={!category}
                                    onFilter={() =>
                                        handleQueryFilter({ category: '' })
                                    }
                                >
                                    Tất cả
                                </FilterTab>
                                {categories.map((item) => (
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
                </div>

                <div className="flex-1">
                    {/* posts */}
                    <div className={`mt-4 grid grid-cols-5 gap-3`}>
                        {posts.data.map((item) => (
                            <Card
                                key={item.id}
                                dataItem={item}
                                
                            />
                        ))}
                    </div>

                    {/* pagination */}
                    <div className='flex justify-center mt-5'>
                        <Pagination
                            firstUrl={posts.links?.first}
                            lastUrl={posts.links?.last}
                            prevUrl={posts.links?.prev}
                            nextUrl={posts.links?.next}
                            currentPage={posts.meta?.current_page}
                            lastPage={posts.meta?.last_page}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
