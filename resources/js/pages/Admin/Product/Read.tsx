import { Head, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { SlidersHorizontal, X, ChevronsDown } from 'lucide-react';
import clsx from 'clsx';
import { vndFormat } from '@/lib/currency_format';

import Badge from '@/components/ui/Badge';
import SearchBar from '@/components/Admin/TableManager/SearchBar';
import FilterTabGroup from '@/components/Admin/TableManager/FilterTabGroup';
import Pagination from '@/components/Admin/Pagination/Pagination';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import ButtonEditLink from '@/components/Admin/TableManager/ButtonEditLink';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import Button from '@/components/ui/Button';
import BadgeVariant from '@/components/Admin/TableManager/BadgeVariant';
import Select from '@/components/ui/Select';
import ButtonResetFilter from '@/components/Admin/TableManager/ButtonResetFilter';
import ButtonResetFilterMobile from '@/components/Admin/TableManager/ButtonResetFilterMobile';

import { useSearch } from '@/hooks/use-search';
import { useFilter } from '@/hooks/use-filter';

import Title from '@/components/Admin/TableManager/Title';
import ButtonCreateLink from '@/components/Admin/TableManager/ButtonCreateLink';

import { ReadProductType } from '@/types/module/products';
import { useState } from 'react';
import axios from 'axios';

export default function Read({
    products,
    products_suggest,
    products_categories,
    total,
    active,
    inactive,
    filter_status,
    filter_category,
    search,
}: ReadProductType) {
    // Xóa
    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này ?')) {
            let toastID: string;
            router.delete(`/admin/products/${id}/delete`, {
                data: {
                    total: total,
                    current_page: products?.current_page,
                    post_on_page: products?.data?.length,
                },
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
            });
        }
    };

    // Bộ lọc tổng hợp
    const { handleQueryFilter } = useFilter({
        route: '/admin/products',
        initialsFilter: {
            filter_status,
            filter_category,
            search,
            page: products.current_page,
        },
        onlyLoad: ['products', 'filter_status', 'filter_category'],
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
        initialData: products_suggest,
        placeholder: 'Tìm kiếm theo tên sản phẩm...',
        routeGetData: '/admin/products/getProducts',
    });

    const filterTabData = [
        {
            label: 'Tất cả',
            onFilter: () => handleQueryFilter({ filter_status: null }),
            countData: total,
            isActive: filter_status === null,
        },
        {
            label: 'Hoạt động',
            onFilter: () => handleQueryFilter({ filter_status: 'active' }),
            countData: active,
            isActive: filter_status === 'active',
        },
        {
            label: 'Vô hiệu hóa',
            onFilter: () => handleQueryFilter({ filter_status: 'inactive' }),
            countData: inactive,
            isActive: filter_status === 'inactive',
        },
    ];

    // Modal view config
    interface VariantDataProps {
        id: string | number;
        code: string;
        price: string | number;
        price_discount: string | number;
        discount: string | number;
        qty: string | number;
        qty_sold: string | number;
        is_default: 'default' | 'variant';
    }

    const [isOpen, setIsOpen] = useState(false);
    const [variantData, setVariantData] = useState<VariantDataProps[]>([]);
    const [productName, setProductName] = useState<null | string>(null);
    const [loadingVariant, setLoadingVariant] = useState(false);
    const handleOpenModal = async (id: string | number) => {
        setIsOpen(true);
        setLoadingVariant(true);
        const timeOut = Date.now();
        try {
            const res = await axios.get(`/admin/products/${id}/getConfigs`);

            const LOADING_TIME = 700;
            const timeLeft = Date.now() - timeOut;

            if (timeLeft > 0) {
                setTimeout(() => {
                    setVariantData(res.data.products_variant);
                    setProductName(res.data.product_name);
                    setLoadingVariant(false);
                }, LOADING_TIME - timeLeft);
            } else {
                setVariantData(res.data.products_variant);
                setProductName(res.data.product_name);
                setLoadingVariant(false);
            }
        } catch (error) {
            toast.error('Lỗi, không thấy xem cấu hình !');
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setTimeout(() => {
            setVariantData([]);
            setProductName(null);
        }, 300);
    };
    return (
        <>
            <Head title="Danh sách sản phẩm" />

            {/* Modal review config */}
            <div
                className={clsx(
                    'fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/20 backdrop-blur-xs transition-all duration-150',
                    {
                        'pointer-events-none opacity-0': !isOpen,
                        'pointer-events-auto opacity-100': isOpen,
                    },
                )}
            >
                <div
                    className={clsx(
                        `h-[60%] w-[90%] overflow-y-auto rounded-3xl border border-gray-200 bg-gray-100 p-1.5 shadow-md transition-all duration-150 md:h-[80%] md:w-[60%]`,
                        {
                            'pointer-events-none scale-95 opacity-0': !isOpen,
                            'pointer-events-auto scale-100 opacity-100': isOpen,
                        },
                    )}
                >
                    <div className="flex h-full w-full flex-col rounded-[18px] bg-white p-3">
                        <header className="flex items-center justify-between">
                            <div className="text-[18px] font-medium tracking-tight">
                                Cấu hình, giá sản phẩm
                            </div>
                            <div
                                className="rounded-md p-1 transition-colors duration-150 hover:bg-gray-100"
                                onClick={handleCloseModal}
                            >
                                <X
                                    size={20}
                                    className="text-gray-800 transition-colors duration-150"
                                />
                            </div>
                        </header>
                        <main className="mt-4 flex-1">
                            {productName && (
                                <div className="font-medium">
                                    ({productName})
                                </div>
                            )}

                            {/* loading */}
                            {loadingVariant && (
                                <div className="flex h-full w-full items-center justify-center gap-2 rounded-xl bg-gray-50">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                                    Đang tải...
                                </div>
                            )}

                            {/* variants desktop*/}
                            {variantData?.length > 0 && (
                                <div className="mt-4 hidden overflow-hidden rounded-xl border border-gray-200 md:block">
                                    <table className="w-full">
                                        <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                            <tr>
                                                <td className="px-4 py-2">
                                                    Mã
                                                </td>
                                                <td className="px-4 py-2">
                                                    Giá
                                                </td>
                                                <td className="px-4 py-2">
                                                    Giảm giá
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="ms-4">
                                                        Vai trò
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2">
                                                    Kho
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    Đã bán
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variantData?.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-200 last-of-type:border-0"
                                                >
                                                    <td className="px-4 py-2">
                                                        {item.code}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex flex-col gap-0.5 truncate">
                                                                {item.price_discount && (
                                                                    <div className="w-25 font-medium">
                                                                        {vndFormat(
                                                                            Number(
                                                                                item.price_discount,
                                                                            ),
                                                                        )}
                                                                    </div>
                                                                )}

                                                                <div
                                                                    className={clsx(
                                                                        '',
                                                                        {
                                                                            'text-gray-500 line-through':
                                                                                item.discount !==
                                                                                null,
                                                                        },
                                                                    )}
                                                                >
                                                                    {vndFormat(
                                                                        Number(
                                                                            item.price,
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {!item.discount && (
                                                                <div className="text-center">
                                                                    --------
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-2">
                                                        <div className="flex">
                                                            <ChevronsDown
                                                                size={20}
                                                                className="text-red-600"
                                                            />
                                                            <span>
                                                                {item.discount}%
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-1.75">
                                                        <div className="flex w-20 justify-center">
                                                            <BadgeVariant
                                                                role={
                                                                    item.is_default
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {item.qty}
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        {item.qty_sold}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {/* variants mobile */}
                            {variantData?.length > 0 && (
                                <div className="mt-4 rounded-xl border border-gray-200 md:hidden">
                                    {variantData.map((item) => (
                                        <div className="border-b border-gray-200 p-2 last-of-type:border-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <p>Mã: {item.code}</p>
                                                    <div className="">
                                                        <BadgeVariant
                                                            role={
                                                                item.is_default
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div>
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
                                                            className={clsx(
                                                                '',
                                                                {
                                                                    'text-gray-500 line-through':
                                                                        item.discount !==
                                                                        null,
                                                                },
                                                            )}
                                                        >
                                                            {vndFormat(
                                                                Number(
                                                                    item.price,
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="my-2 border-gray-100" />

                                            <div className="mt-1 space-y-1 font-medium">
                                                <div>Kho: ({item.qty})</div>
                                                <div>
                                                    Đã bán: ({item.qty_sold})
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* empty variants */}
                            {variantData?.length === 0 && !loadingVariant && (
                                <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl bg-gray-100">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                                        <SlidersHorizontal size={18} />
                                    </div>
                                    <p>
                                        Sản phẩm này hiện chưa có cấu hình nào
                                    </p>
                                    <ButtonCreateLink route="/admin/products/variants/create" />
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading="Danh sách sản phẩm" />
                    <ButtonCreateLink route="/admin/products/create" />
                </div>

                {/* filter & search */}
                <div className="mt-4 flex flex-col items-center justify-between md:flex-row">
                    {/* filter & search */}
                    <div className="flex w-full flex-1 flex-col gap-2 md:flex-row">
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

                        {/* filter */}
                        <Select
                            name="filter-category"
                            onChange={(e) =>
                                handleQueryFilter({
                                    filter_category: e.target.value,
                                })
                            }

                            value={filter_category ?? ''}
                        >
                            <option value="">Theo danh mục</option>
                            {products_categories?.length > 0 &&
                                products_categories.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                        disabled={item.parent_id === 0}
                                        className={clsx('', {
                                            'font-medium text-gray-900':
                                                item.parent_id === 0,
                                        })}
                                    >
                                        {item.name}
                                    </option>
                                ))}

                            {products_categories?.length === 0 && (
                                <option value="">
                                    Chưa danh có danh mục nào !
                                </option>
                            )}
                        </Select>

                        {/* button reset on desktop */}
                        {(filter_category || filter_status || search) && (
                            <ButtonResetFilter route="/admin/products"/>
                        )}
                    </div>

                    {/* stats */}
                    <FilterTabGroup data={filterTabData} />

                    {/* button reset on mobile */}
                    {(filter_category || filter_status || search) && (
                        <ButtonResetFilterMobile route="/admin/products"/>
                    )}
                </div>

                {products.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-2">Sản phẩm</td>
                                    <td className="px-4 py-2">Ngày tạo</td>
                                    <td className="px-4 py-2">Người tạo</td>
                                    <td className="px-4 py-2">Trạng thái</td>
                                    <td className="px-4 py-2 text-center">
                                        Tùy chỉnh sản phẩm
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-gray-200 last-of-type:border-0"
                                    >
                                        <td className="px-4 py-1.75">
                                            <div className="flex items-center gap-5">
                                                <a
                                                    target="blank"
                                                    href={
                                                        item.main_image
                                                            ?.file_url
                                                    }
                                                    className="h-20 w-20"
                                                >
                                                    <img
                                                        src={
                                                            item.main_image
                                                                ?.file_url
                                                        }
                                                        alt={
                                                            item.main_image
                                                                ?.file_name
                                                        }
                                                        className="h-full w-full rounded-lg object-cover"
                                                    />
                                                </a>
                                                <div className="flex flex-col gap-1.5">
                                                    <p className="w-50 truncate font-medium">
                                                        {item.name}
                                                    </p>
                                                    <p className="w-fit truncate rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                                        {item.category?.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="w-30 truncate">
                                                {item.created_at}
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="w-30 truncate">
                                                {item.user?.name}
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="w-25">
                                                <Badge status={item.status} />
                                            </div>
                                        </td>
                                        <td className="px-4 py-1.75">
                                            <div className="flex h-6.75 gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="text-xs!"
                                                    animatePress={true}
                                                    onClick={() =>
                                                        handleOpenModal(item.id)
                                                    }
                                                >
                                                    <SlidersHorizontal
                                                        size={15}
                                                        className="text-gray-500"
                                                    />
                                                    Cấu hình & Giá
                                                </Button>
                                                <ButtonEditLink
                                                    route={`/admin/products/${item.id}/edit`}
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
                        <div className="inline-flex w-full flex-col gap-2 md:hidden">
                            {products.data.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex h-fit w-full justify-between border-b border-gray-200 p-3"
                                >
                                    <div className="relative flex justify-between">
                                        {item.status === 'active' && (
                                            <div className="absolute bottom-5 left-15 h-3 w-3 rounded-full bg-green-600"></div>
                                        )}
                                        {item.status === 'inactive' && (
                                            <div className="absolute bottom-5 left-15 h-3 w-3 rounded-full bg-red-600"></div>
                                        )}

                                        <div className="flex w-full items-center gap-3">
                                            <a
                                                target="blank"
                                                href={item.main_image?.file_url}
                                                className="h-18 w-18"
                                            >
                                                <img
                                                    src={
                                                        item.main_image
                                                            ?.file_url
                                                    }
                                                    alt={
                                                        item.main_image
                                                            ?.file_name
                                                    }
                                                    className="h-full w-full rounded-lg object-cover"
                                                />
                                            </a>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="w-40 truncate font-medium">
                                                    {item.name}
                                                </p>
                                                <p className="w-fit truncate rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                                    {item.category?.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex w-full flex-col gap-1.5">
                                            <Button
                                                variant="outline"
                                                className="text-xs!"
                                                animatePress={true}
                                                onClick={() =>
                                                    handleOpenModal(item.id)
                                                }
                                            >
                                                <SlidersHorizontal
                                                    size={15}
                                                    className="text-gray-500"
                                                />
                                                Cấu hình & Giá
                                            </Button>
                                            <ButtonEditLink
                                                route={`/admin/products/${item.id}/edit`}
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
                {products?.data.length === 0 && (
                    <EmptyData>
                        <ButtonCreateLink route="/admin/products/create" />
                    </EmptyData>
                )}

                {/* pagination */}
                {products.data?.length > 0 && (
                    <Pagination
                        firstUrl={products.first_page_url}
                        lastUrl={products.last_page_url}
                        prevUrl={products.prev_page_url}
                        nextUrl={products.next_page_url}
                        currentPage={products.current_page}
                        lastPage={products.last_page}
                    />
                )}
            </section>
        </>
    );
}
