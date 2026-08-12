import { Head, router } from '@inertiajs/react';
import { ChevronsDown, ArrowDownUp } from 'lucide-react';
import toast from 'react-hot-toast';

import Title from '@/components/Admin/TableManager/Title';
import ButtonCreateLink from '@/components/Admin/TableManager/ButtonCreateLink';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEditLink from '@/components/Admin/TableManager/ButtonEditLink';
import BadgeVariant from '@/components/Admin/TableManager/BadgeVariant';
import Pagination from '@/components/Admin/Pagination/Pagination';
import Button from '@/components/ui/Button';

import { ReadVariantType } from '@/types/module/product_variant';
import { vndFormat } from '@/lib/currency_format';
import clsx from 'clsx';;

export default function ReadVariant({ variants }: ReadVariantType) {

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
            <Head title="Cấu hình, biến thể" />

            <section>
                <div className="flex justify-between items-center">
                    <Title heading="Cấu hình & biến thể" />
                    <ButtonCreateLink route="/admin/products/variants/create" />
                </div>

                {/* data */}
                {variants.data?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-4 py-1">Sản phẩm</td>
                                    <td className="px-4 py-1">
                                        <div className='flex gap-2 items-center'>
                                            <span>Giá</span>
                                            <Button size='small' variant='outline' animatePress={true}>
                                                <ArrowDownUp size={15} strokeWidth={2} />
                                            </Button>
                                        </div>

                                    </td>
                                    <td className="px-4 text-center">
                                        <div className='mr-3'>
                                            Vai trò
                                        </div>
                                    </td>
                                    <td className="px-4 py-1 text-center">Kho</td>
                                    <td className="px-4 py-1 text-center">Đã bán</td>
                                    <td className="px-4 py-1 text-center">Tùy chỉnh biến thể</td>
                                </tr>
                            </thead>
                            <tbody>
                                {variants.data.map((item) => (
                                    <tr key={item.id} className="transition-alls border-b border-gray-200 duration-150 last-of-type:border-0">
                                        {/* product */}
                                        <td className="px-4 py-0.75">
                                            <div className='flex gap-5 items-center'>
                                                <div className='w-20 h-20'>
                                                    <img src={item.main_image.file_url} alt={item.main_image.file_name} className='w-full h-full object-cover' />
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <div className="font-medium w-50 truncate">
                                                        {item.product.name}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        Mã: {item.code}
                                                    </div>
                                                </div>
                                            </div>

                                        </td>

                                        {/* price & price_discount */}
                                        <td className="px-4 py-0.75">
                                            <div className='flex items-center gap-3'>
                                                <div className="flex flex-col gap-0.5 w-25 truncate">
                                                    {item.price_discount && (
                                                        <div className='font-medium'>
                                                            {vndFormat(Number(item.price_discount))}
                                                        </div>
                                                    )}

                                                    <div className={clsx("", {
                                                        "line-through text-gray-500": item.discount !== null
                                                    })}>
                                                        {vndFormat(Number(item.price))}
                                                    </div>
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

                                        {/* role */}
                                        <td className="px-4 py-0.75">
                                            <div className="w-30 flex justify-center">
                                                <BadgeVariant role={item.is_default} />
                                            </div>
                                        </td>

                                        {/* qty */}
                                        <td className="px-4 py-0.75">
                                            <div className="w-30 truncate text-center">
                                                {item.qty}
                                            </div>
                                        </td>

                                        {/* qty_sold */}
                                        <td className="px-4 py-0.75">
                                            <div className="w-30 truncate text-center">
                                                {item.qty_sold}
                                            </div>
                                        </td>

                                        {/* setting */}
                                        <td className="px-4 py-0.75">
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
    )
}