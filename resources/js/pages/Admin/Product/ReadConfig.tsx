import { Head, useForm, router } from "@inertiajs/react"
import { Fragment } from "react"
import toast from "react-hot-toast"

import Input from "@/components/ui/Input"
import EmptyData from "@/components/Admin/Empty/EmptyData"

import Modal from "@/components/Admin/Modal/Modal"
import Title from "@/components/Admin/TableManager/Title"
import ButtonCreate from "@/components/Admin/TableManager/ButtonCreate"
import ButtonEdit from "@/components/Admin/TableManager/ButtonEdit"
import ButtonDelete from "@/components/Admin/TableManager/ButtonDelete"
import ButtonQuickCreate from "@/components/Admin/TableManager/ButtonQuickCreate"

import { useModal } from "@/hooks/use-modal"
import { vndFormat } from "@/lib/currency_format"

import { CreateProductConfigType, EditProductConfigType } from "@/types/module/product_config"
import { ReadProductConfigType } from "@/types/module/product_config"

export default function ReadConfig({ configs, total }: ReadProductConfigType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateProductConfigType>({
        id: '',
        name: '',
        price_include: '',
        group: ''
    });

    // Modal hooks
    const { openModal, isEditModal, setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal, } = useModal({ reset, clearErrors });

    // Modal Edit Mode
    const handleEdit = (config: EditProductConfigType) => {
        setData({
            id: config.id,
            name: config.name,
            price_include: config.price_include ?? '',
            group: config.group,
        });
        setOpenModal(true);
        setIsEditModal(true);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/products/configs/store', {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false);
                reset();
                clearErrors();
                toast.success('Thêm mới thành công');
            },
        });
    };

    // Sửa
    const handleUpdate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(`/admin/products/configs/${data.id}/update`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModal(false);
                reset();
                clearErrors();
                toast.success('Cập nhật thành công');
            },
        });
    };

    // Xóa
    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc muốn xóa cấu hình này ?')) {
            let toastID: string;
            router.delete(`/admin/products/configs/${id}/delete`, {
                preserveScroll: true,
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
            })
        }
    };

    return (
        <>
            <Head title="Danh sách cấu hình" />

            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title={!isEditModal ? 'Thêm mới cấu hình' : 'Chỉnh sửa thông tin'}
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="config"
                processing={processing}
            >
                <form onSubmit={!isEditModal ? handleCreate : handleUpdate} id="config">
                    <div>
                        <Input type="text" name="group" label="Nhóm cấu hình" error={errors.group} value={data.group} onChange={(e) => setData('group', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: RAM, CPU,... (Dùng để nhóm các cấu hình cùng loại)</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="name" label="Cấu hình" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: 8GB, Đỏ, GTX-5060,...</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="number" name="price_include" label="Giá đi kèm" error={errors.price_include} value={data.price_include} onChange={(e) => setData('price_include', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>(Không bắt buộc)</p>
                    </div>
                </form>
            </Modal>


            <section>
                {/* quick create */}
                <ButtonQuickCreate onOpenModal={handleOpenModal} />

                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Danh sách cấu hình (${total})`} />
                    <ButtonCreate onOpenModal={handleOpenModal} />
                </div>

                {/* data */}
                {configs && (
                    <div className="mt-4 pb-2 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Nhóm & cấu hình</td>
                                    <td className="px-5 py-2">Giá đi kèm</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(configs).map(([group, items]) => (
                                    <Fragment key={group}>
                                        <tr className='font-semibold'>
                                            <td className='py-4 px-3'>
                                                <div className='bg-blue-50 text-blue-700 p-0.75 px-2 rounded-md w-fit'>{group.toUpperCase()}</div>
                                            </td>
                                        </tr>
                                        {items.map(item => (
                                            <tr key={item.id} className='border-b border-gray-200 last-of-type:border-0 '>
                                                <td className='px-5 py-2 w-60 truncate'>{item.name}</td>
                                                <td className='px-5 py-2 w-65 truncate'>
                                                    {item.price_include !== null && (
                                                        vndFormat(Number(item.price_include))
                                                    )}
                                                    {item.price_include === null && (
                                                        <>------------</>
                                                    )}
                                                </td>
                                                <td className='px-5 py-2 w-60 truncate'>{item.created_at}</td>
                                                <td className='px-5 py-2 w-55 truncate'>{item.updated_at}</td>
                                                <td className='px-5 py-2'>
                                                    <div className="flex h-6.75 gap-2">
                                                        <ButtonEdit onEdit={() => handleEdit(item)} />
                                                        <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>

                        {/* modile */}
                        <div className='block md:hidden p-3'>
                            {Object.entries(configs).map(([group, items]) => (
                                <Fragment key={group}>
                                    <div className='px-2 py-1 bg-blue-50 text-blue-700 rounded-md my-3 first:mt-0 font-medium w-fit'>{group.toUpperCase()}</div>
                                    {items.map(item => (
                                        <div key={item.id} className='px-1 mt-3 flex justify-between border-b border-gray-200 h-20'>
                                            <div className='mt-3'>
                                                <div className='w-30 truncate'>{item.name}</div>
                                                <div className='text-gray-500 w-30 truncate'>
                                                    {item.price_include !== null && (
                                                        vndFormat(Number(item.price_include))
                                                    )}

                                                    {item.price_include === null && (
                                                        <>-----------</>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-col h-6.75 gap-2">
                                                <ButtonEdit onEdit={() => handleEdit(item)} />
                                                <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                            </div>
                                        </div>
                                    ))}
                                </Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {Object.entries(configs)?.length === 0 && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    )
}