import { Head, router } from '@inertiajs/react';
import {
    ChevronsDown,
    ArrowDownUp,
    ArrowUpNarrowWide,
    ArrowDownWideNarrow,
    Search,
    X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { vndFormat } from '@/lib/currency_format';
import clsx from 'clsx';
import { useState } from 'react';

import Title from '@/components/Admin/TableManager/Title';
import ButtonCreateLink from '@/components/Admin/TableManager/ButtonCreateLink';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEditLink from '@/components/Admin/TableManager/ButtonEditLink';
import BadgeVariant from '@/components/Admin/TableManager/BadgeVariant';
import Pagination from '@/components/Admin/Pagination/Pagination';
import Button from '@/components/ui/Button';
import FilterTab from '@/components/Admin/TableManager/FilterTab';
import SearchBar from '@/components/Admin/TableManager/SearchBar';

import { useFilter } from '@/hooks/use-filter';
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
    const { handleQueryFilter, loadingSearch, isCountResult } = useFilter({
        route: '/admin/products/variants',
        initialsFilter: {
            filter_role: filter_role,
            filter_product: filter_product,
            sort_price: sort_price,
            search: search,
        },
        onlyLoad: ['variants', 'filter_role', 'filter_product', 'sort_price'],
        debounce: ['search'],
    });

    // Tìm kiếm
    const [querySearch, setQuerySearch] = useState<string>(search ?? '');

    const handleSetQuerySearch = (query: string) => {
        setQuerySearch(query.toLocaleLowerCase());
    };

    const handleClearQuerySearch = () => {
        setQuerySearch('');
        handleQueryFilter({ search: '' }, true);
    };

    
    return (
        <>
            <Head title="Cấu hình, biến thể" />

            <section>
                <div className="flex items-center justify-between">
                    <Title heading="Cấu hình & biến thể" />
                    <ButtonCreateLink route="/admin/products/variants/create" />
                </div>

                {/* filter & search */}
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <div className="relative">
                            <div className="focus-within:border-ring flex w-90 items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-2 transition-all duration-150 ease-out focus-within:border-gray-400 focus-within:ring-3 focus-within:ring-gray-300/70">
                                <div className="flex w-full items-center gap-1">
                                    <Search
                                        size={18}
                                        strokeWidth={2}
                                        className="shrink-0 text-gray-600"
                                    />
                                    <input
                                        type="text"
                                        name="search"
                                        id="search"
                                        onChange={(e) => {
                                            handleQueryFilter({
                                                search: e.target.value.toLowerCase(),
                                            });
                                            handleSetQuerySearch(
                                                e.target.value,
                                            );
                                        }}
                                        value={querySearch}
                                        className="flex-1 px-2 py-1.5 focus:outline-0"
                                        placeholder="Tìm kiếm theo tên sản phẩm..."
                                    />

                                    {/* count result */}
                                    {!loadingSearch && querySearch && isCountResult &&(
                                        <p className="text-xs font-semibold tracking-tight">
                                            (Tìm thấy {variants.data.length} kết
                                            quả)
                                        </p>
                                    )}

                                    {/* loading circle */}
                                    {loadingSearch && querySearch && (
                                        <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                                    )}

                                    {/* delete query */}
                                    {!loadingSearch && querySearch && (
                                        <div
                                            onClick={handleClearQuerySearch}
                                            className="flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white hover:bg-gray-800 active:bg-black"
                                        >
                                            <X size={10} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* {products?.length > 0 && (
                                <div className="absolute left-0 w-full translate-y-1 rounded-lg border border-gray-200 bg-white p-2 shadow-md">
                                    <p className="px-1 text-xs font-medium text-gray-500">
                                        Sản phẩm mới thêm gần đây
                                    </p>

                                    <hr className="my-2 border-gray-100" />

                                    {products.map((item) => (
                                        <div
                                            key={item.id}
                                            className="cursor-pointer rounded-md p-1 hover:bg-gray-100"
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            )} */}
                        </div>

                        {/* <Select name='product'
                            onChange={(e) => handleQueryFilter({ filter_product: e.target.value })}
                            value={filter_product ?? ''}
                        >
                            <option value="">-Theo sản phẩm-</option>
                            {products?.length > 0 && (
                                products.map(product => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))
                            )}
                        </Select> */}
                    </div>

                    {/* stats */}
                    <div className="hidden gap-1.5 rounded-xl bg-gray-100 p-1 tracking-tight md:flex">
                        <FilterTab
                            onFilter={() =>
                                handleQueryFilter({ filter_role: null })
                            }
                            isActive={filter_role === null}
                            countData={total}
                            label="Tất cả"
                        />
                        <FilterTab
                            onFilter={() =>
                                handleQueryFilter({ filter_role: 'default' })
                            }
                            isActive={filter_role === 'default'}
                            countData={defaultCount}
                            label="Mặc định"
                        />
                        <FilterTab
                            onFilter={() =>
                                handleQueryFilter({ filter_role: 'variant' })
                            }
                            isActive={filter_role === 'variant'}
                            countData={variant}
                            label="Biến thể"
                        />
                    </div>
                </div>

                {/* data */}
                {variants.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
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
                        {/* <div className="inline-flex w-full flex-col gap-1 md:hidden">
                                            {users.data.map((item) => (
                                                <div key={item.id} className="border-b border-gray-200 p-3">
                                                    <div className="flex items-center justify-between">
                                                        <div className="relative flex items-center gap-3">
                                                            {item.status === 'active' && (
                                                                <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-green-600"></div>
                                                            )}
                                                            {item.status === 'inactive' && (
                                                                <div className="absolute -bottom-0.5 left-8 h-3 w-3 rounded-full bg-red-600"></div>
                                                            )}
                                                            <UserAvatar name={item.name} />
                                                            <div className="flex flex-col">
                                                                <div className="w-30 truncate">
                                                                    {item.name}
                                                                </div>
                                                                <div className="w-30 truncate text-gray-500">
                                                                    {item.email}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className={clsx('flex flex-col gap-2 md:flex-row', {
                                                            'pointer-events-none opacity-50': item.id == String(user.id)
                                                        }
                                                        )}
                                                        >
                                                            <ButtonEdit onEdit={() => handleEdit(item)} />
                                                            <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                    </div>
                )}

                {/* empty */}
                {/* {users.data?.length === 0 && <EmptyData showFallBack={true} />} */}

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
