import { Head, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import { ChevronsDown } from 'lucide-react';

import Title from '@/components/Admin/TableManager/Title';
import ButtonCreateLink from '@/components/Admin/TableManager/ButtonCreateLink';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEditLink from '@/components/Admin/TableManager/ButtonEditLink';
import BadgeVariant from '@/components/Admin/TableManager/BadgeVariant';

import { ReadVariantType } from '@/types/module/product_variant';
import { vndFormat } from '@/lib/currency_format';
import clsx from 'clsx';

export default function ReadVariant({ variants }: ReadVariantType) {
    console.log(variants);

    // Xóa
    const handleDelete = (id: string | number) => {

        console.log(id);
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
                    toast.error(`${error}`)
                }
            });
        }
    };

    return (
        <>
            <Head title="Cấu hình và biến thể" />

            <section>
                <div className="flex justify-between items-center">
                    <Title heading="Cấu hình và biến thể" />
                    <ButtonCreateLink route="/admin/products/variants/create" />
                </div>

                {/* data */}
                {variants.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-2">Sản phẩm</td>
                                    <td className="px-4 py-2">Giá</td>
                                    <td className="px-4 py-2 text-center">Số lượng</td>
                                    <td className="px-4 py-2 text-center">Đã bán</td>
                                    <td className="px-4 py-2">Vai trò</td>
                                    <td className="px-4 py-2">Người tạo</td>
                                    <td className="px-4 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {variants.data.map((item) => (
                                    <tr key={item.id} className="transition-alls border-b border-gray-200 duration-150 last-of-type:border-0">
                                        {/* product */}
                                        <td className="px-4 py-3">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="truncate font-medium">
                                                    {item.product.name}
                                                </div>
                                                <div className="text-gray-500">
                                                    Mã: {item.code}
                                                </div>
                                            </div>
                                        </td>

                                        {/* price & price_discount */}
                                        <td className="px-4 py-3">
                                            <div className='flex items-center gap-10'>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className={clsx("", {
                                                        "line-through text-gray-500": item.discount !== null
                                                    })}>
                                                        {vndFormat(Number(item.price))}
                                                    </div>

                                                    {item.price_discount && (
                                                        <div>
                                                            {vndFormat(Number(item.price_discount))}
                                                        </div>
                                                    )}

                                                </div>

                                                {item.discount && (
                                                    <div className='flex'>
                                                        <ChevronsDown size={20} className='text-red-600' />
                                                        <span>{item.discount}%</span>
                                                    </div>
                                                )}

                                                {!item.discount && (
                                                    <div className='text-center'>--------</div>
                                                )}

                                            </div>

                                        </td>

                                        {/* qty */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate text-center">
                                                {item.qty}
                                            </div>
                                        </td>

                                        {/* qty_sold */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate text-center">
                                                {item.qty_sold}
                                            </div>
                                        </td>

                                        {/* role */}
                                        <td className="px-4 py-3">
                                            <div className="w-25">
                                                <BadgeVariant role={item.is_default} />
                                            </div>
                                        </td>

                                        {/* user */}
                                        <td className="px-4 py-3">
                                            <div className="w-30 truncate">
                                                {item.user.name}
                                            </div>
                                        </td>

                                        {/* setting */}
                                        <td className="px-4 py-3">
                                            <div className="flex h-6.75 gap-2">
                                                <ButtonEditLink route={`/admin/products/variants/${item.id}/edit`} />
                                                <ButtonDelete onDelete={() => handleDelete(item.id)} />
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
                {/* {users.data?.length > 0 && (
                                    <Pagination
                                        firstUrl={users.first_page_url}
                                        lastUrl={users.last_page_url}
                                        prevUrl={users.prev_page_url}
                                        nextUrl={users.next_page_url}
                                        currentPage={users.current_page}
                                        lastPage={users.last_page}
                                    />
                                )} */}
            </section>
        </>
    )
}