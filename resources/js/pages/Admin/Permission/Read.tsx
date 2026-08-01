import { Head, useForm, router } from '@inertiajs/react';
import { Fragment } from 'react';
import toast from 'react-hot-toast';;

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import Modal from '@/components/Admin/Modal/Modal';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import Title from '@/components/Admin/TableManager/Title';

import { useModal } from '@/hooks/use-modal';

import { ReadPermissionType } from '@/types/module/permission';
import { CreatePermissionType } from '@/types/module/permission';
import { EditPermissionType } from '@/types/module/permission';

export default function Read({ permissions, total }: ReadPermissionType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreatePermissionType>({
        id: '',
        name: '',
        desc: '',
        module: '',
    });

    const {openModal, isEditModal,setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal } = useModal({ reset, clearErrors });

    // Modal Edit Mode
    const handleEdit = (permission: EditPermissionType) => {
        setData({
            id: permission.id,
            name: permission.name,
            desc: permission.desc,
            module: permission.module,
        });
        setOpenModal(true);
        setIsEditModal(true);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/users/permissions/store', {
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
        patch(`/admin/users/permissions/${data.id}/update`, {
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
        if (confirm('Bạn có chắc muốn xóa quyền này ?')) {
            let toastID: string;
            router.delete(`/admin/users/permissions/${id}/delete`, {
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
            <Head title="Quyền" />

            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title={!isEditModal ? 'Thêm mới quyền' : 'Chỉnh sửa thông tin'}
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="createPermission"
                processing={processing}
            >
                <form onSubmit={!isEditModal ? handleCreate : handleUpdate} id="createPermission">
                    <div>
                        <Input type="text" name="module" label="Module" error={errors.module} value={data.module} onChange={(e) => setData('module', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>Nhóm các thao tác có chung module liên quan (vd:Post, Product,...)</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="name" label="Tên quyền" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Create, Edit, Update,...</p>
                    </div>

                    <div className='mt-2'>
                        <Textarea name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                    </div>
                </form>
            </Modal>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Quản lí quyền (${total})`} />
                    <ButtonCreate onOpenModal={handleOpenModal} />
                </div>

                {/* data */}
                {permissions && (
                    <div className="mt-4 pb-1 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Nhóm & tên quyền</td>
                                    <td className="px-5 py-2">Mô tả</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(permissions).map(([module, items]) => (
                                    <Fragment key={module}>
                                        <tr className='font-semibold'>
                                            <td className='py-4 px-3'>
                                                <div className='bg-blue-50 text-blue-700 p-0.75 px-2 rounded-lg w-fit mt-4'>Module {module}</div>
                                            </td>
                                        </tr>
                                        {items.map(item => (
                                            <tr key={item.id} className='border-b border-gray-200 last-of-type:border-0'>
                                                <td className='px-5 py-2 w-60 truncate'>{item.name}</td>
                                                <td className='px-5 py-2 w-65 truncate'>{item.desc}</td>
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
                            {Object.entries(permissions).map(([module, items]) => (
                                <Fragment key={module}>
                                    <div className='px-2 py-1 bg-blue-50 text-blue-700 rounded-md my-3 first:mt-0 font-medium w-fit'>Module {module}</div>
                                    {items.map(item => (
                                        <div key={item.id} className='px-1 mt-3 flex justify-between border-b border-gray-200 h-20'>
                                            <div className='mt-3'>
                                                <div className='w-30 truncate'>{item.name}</div>
                                                <div className='text-gray-500 w-30 truncate'>({item.desc})</div>
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
                {!permissions && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    );
}
