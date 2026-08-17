import { Head, router } from '@inertiajs/react';
import {
    ChevronsDown,
    ArrowDownUp,
    ArrowUpNarrowWide,
    ArrowDownWideNarrow,
} from 'lucide-react';

import { vndFormat } from '@/lib/currency_format';
import clsx from 'clsx';
import toast from 'react-hot-toast';

import Title from '@/components/Admin/TableManager/Title';
import ButtonCreateLink from '@/components/Admin/TableManager/ButtonCreateLink';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEditLink from '@/components/Admin/TableManager/ButtonEditLink';
import BadgeVariant from '@/components/Admin/TableManager/BadgeVariant';
import Pagination from '@/components/Admin/Pagination/Pagination';
import Button from '@/components/ui/Button';
import SearchBar from '@/components/Admin/TableManager/SearchBar';
import FilterTabGroup from '@/components/Admin/TableManager/FilterTabGroup';
import EmptyData from '@/components/Admin/Empty/EmptyData';

import { useFilter } from '@/hooks/use-filter';
import { useSearch } from '@/hooks/use-search';

import { ReadVariantType } from '@/types/module/product_variant';

export default function ReadVariant({
    variants,
    total,
    variant,
    defaultCount,
    products,
    sort_price,
    filter_role,
    filter_product,
    search,
}: ReadVariantType) {

    // Xóa
    const handleDelete = (id: string | number) => {
        if (confirm('Bạn có chắc muốn xóa biến thể này ?')) {
            let toastID: string;
            router.delete(`/admin/products/variants/${id}/delete`, {
                // data: {
                //     user_on_page: users?.data?.length,
                //     current_page: users.current_page,
                // },
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
                onError: (error) => {
                    toast.error(`${error}`);
                },
            });
        }
    };

    // Bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/admin/products/variants',
        initialsFilter: {
            filter_role,
            filter_product,
            sort_price,
            search,
            page: variants.current_page,
        },
        onlyLoad: ['variants', 'filter_role', 'filter_product', 'sort_price'],
    });

    // Tìm kiếm
    const {
        querySearch,
        loadingSearch,
        dataSuggest,
        openSuggest,
        placeholderSearch,
        handleQuerySearch,
        handleClearQuerySearch,
        handleSetPlaceHolder,
        handleFocusSearch,
        handleBlurSearch,
        handleChoose,
        handleLeave,
    } = useSearch({
        handleQueryFilter,
        search,
        initialData: products,
        placeholder: 'Tìm kiếm theo tên sản phẩm...',
        routeGetData: '/admin/products/variants/getProducts',
    });

    const filterTabData = [
        {
            label: 'Tất cả',
            onFilter: () => handleQueryFilter({ filter_role: null }),
            countData: total,
            isActive: filter_role === null,
        },
        {
            label: 'Mặc định',
            onFilter: () => handleQueryFilter({ filter_role: 'default' }),
            countData: defaultCount,
            isActive: filter_role === 'default',
        },
        {
            label: 'Biến thể',
            onFilter: () => handleQueryFilter({ filter_role: 'variant' }),
            countData: variant,
            isActive: filter_role === 'variant',
        },
    ];

    return (
        <>
            <Head title="Cấu hình, biến thể" />

            <section>
                {/* heading */}
                <div className="flex items-center justify-between">
                    <Title heading="Cấu hình & biến thể" />
                    <ButtonCreateLink route="/admin/products/variants/create" />
                </div>

                {/* filter & search */}
                <div className="mt-4 flex items-center justify-between">
                    <SearchBar
                        onChange={handleQuerySearch}
                        onClearQuery={handleClearQuerySearch}
                        onFocus={handleFocusSearch}
                        onBlur={handleBlurSearch}
                        onMouseDown={handleChoose}
                        onMouseEnter={handleSetPlaceHolder}
                        onMouseLeave={handleLeave}
                        dataSuggest={dataSuggest}
                        querySearch={querySearch}
                        placeHolderSearch={placeholderSearch}
                        loadingSearch={loadingSearch}
                        openSuggest={openSuggest}
                    />

                    {/* stats */}
                    <FilterTabGroup data={filterTabData} />
                </div>

                {/* data */}
                {variants.data?.length > 0 && (
                    <div className="relative mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="py-1 pr-4 pl-6">Sản phẩm</td>
                                    <td className="px-4 py-1">
                                        <div className="flex items-center gap-2">
                                            <span>Giá</span>
                                            {sort_price === null && (
                                                <Button
                                                    onClick={() =>
                                                        handleQueryFilter({
                                                            sort_price: 'asc',
                                                        })
                                                    }
                                                    size="small"
                                                    variant="outline"
                                                    animatePress={true}
                                                >
                                                    <ArrowDownUp
                                                        size={15}
                                                        strokeWidth={2}
                                                    />
                                                </Button>
                                            )}
                                            {sort_price === 'asc' && (
                                                <Button
                                                    onClick={() =>
                                                        handleQueryFilter({
                                                            sort_price: 'desc',
                                                        })
                                                    }
                                                    size="small"
                                                    variant="outline"
                                                    animatePress={true}
                                                >
                                                    <ArrowUpNarrowWide
                                                        size={15}
                                                        strokeWidth={2}
                                                    />
                                                </Button>
                                            )}
                                            {sort_price === 'desc' && (
                                                <Button
                                                    onClick={() =>
                                                        handleQueryFilter({
                                                            sort_price: 'asc',
                                                        })
                                                    }
                                                    size="small"
                                                    variant="outline"
                                                    animatePress={true}
                                                >
                                                    <ArrowDownWideNarrow
                                                        size={15}
                                                        strokeWidth={2}
                                                    />
                                                </Button>
                                            )}
                                            {sort_price !== null && (
                                                <div
                                                    onClick={() =>
                                                        handleQueryFilter({
                                                            sort_price: null,
                                                        })
                                                    }
                                                    className="cursor-pointer text-xs text-blue-600 hover:underline active:text-blue-700"
                                                >
                                                    Đặt lại
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 text-center">
                                        <div className="mr-3">Vai trò</div>
                                    </td>
                                    <td className="px-4 py-1 text-center">
                                        Kho
                                    </td>
                                    <td className="px-4 py-1 text-center">
                                        Đã bán
                                    </td>
                                    <td className="px-4 py-1 text-center">
                                        Tùy chỉnh biến thể
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {variants.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="transition-alls border-b border-gray-200 duration-150 last-of-type:border-0"
                                    >
                                        {/* product */}
                                        <td className="px-4 py-1.75">
                                            <div className="flex items-center gap-5">
                                                <div className="h-20 w-20">
                                                    <img
                                                        src={
                                                            item.main_image
                                                                .file_url
                                                        }
                                                        alt={
                                                            item.main_image
                                                                .file_name
                                                        }
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="w-50 truncate font-medium">
                                                        {item.product.name}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        Mã: {item.code}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* price & price_discount */}
                                        <td className="px-4 py-1.75">
                                            <div className="flex items-center gap-3">
                                                <div className="flex w-25 flex-col gap-0.5 truncate">
                                                    {item.price_discount && (
                                                        <div className="font-medium">
                                                            {vndFormat(
                                                                Number(
                                                                    item.price_discount,
                                                                ),
                                                            )}
                                                        </div>
                                                    )}

                                                    <div
                                                        className={clsx('', {
                                                            'text-gray-500 line-through':
                                                                item.discount !==
                                                                null,
                                                        })}
                                                    >
                                                        {vndFormat(
                                                            Number(item.price),
                                                        )}
                                                    </div>
                                                </div>

                                                {item.discount && (
                                                    <div className="flex">
                                                        <ChevronsDown
                                                            size={20}
                                                            className="text-red-600"
                                                        />
                                                        <span>
                                                            {item.discount}%
                                                        </span>
                                                    </div>
                                                )}

                                                {!item.discount && (
                                                    <div className="text-center">
                                                        --------
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* role */}
                                        <td className="px-4 py-1.75">
                                            <div className="flex w-30 justify-center">
                                                <BadgeVariant
                                                    role={item.is_default}
                                                />
                                            </div>
                                        </td>

                                        {/* qty */}
                                        <td className="px-4 py-1.75">
                                            <div className="w-30 truncate text-center">
                                                {item.qty}
                                            </div>
                                        </td>

                                        {/* qty_sold */}
                                        <td className="px-4 py-1.75">
                                            <div className="w-30 truncate text-center">
                                                {item.qty_sold}
                                            </div>
                                        </td>

                                        {/* setting */}
                                        <td className="px-4 py-1.75">
                                            <div className="flex h-6.75 gap-2">
                                                <ButtonEditLink
                                                    route={`/admin/products/variants/${item.id}/edit`}
                                                />
                                                <ButtonDelete
                                                    onDelete={() =>
                                                        handleDelete(item.id)
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="inline-flex w-full flex-col gap-1 md:hidden">
                            {variants.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-b border-gray-200 p-3"
                                >
                                    <div className="flex justify-between">
                                        <div className='flex items-center gap-5'>
                                            <div className="h-15 w-15">
                                                <img
                                                    src={
                                                        item.main_image.file_url
                                                    }
                                                    alt={
                                                        item.main_image
                                                            .file_name
                                                    }
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <div className="w-40 truncate font-medium">
                                                    {item.product.name}
                                                </div>
                                                <div className="text-gray-500">
                                                    Mã: {item.code}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <ButtonEditLink
                                                route={`/admin/products/variants/${item.id}/edit`}
                                            />
                                            <ButtonDelete
                                                onDelete={() =>
                                                    handleDelete(item.id)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {variants.data?.length === 0 && (
                    <EmptyData showFallBack={true}>
                        <ButtonCreateLink route="/admin/products/variants/create" />
                    </EmptyData>
                )}

                {/* pagination */}
                {variants.data?.length > 0 && (
                    <Pagination
                        firstUrl={variants.first_page_url}
                        lastUrl={variants.last_page_url}
                        prevUrl={variants.prev_page_url}
                        nextUrl={variants.next_page_url}
                        currentPage={variants.current_page}
                        lastPage={variants.last_page}
                    />
                )}
            </section>
        </>
    );
}
