import { Head, useForm, router } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Modal from '@/components/Admin/Modal/Modal';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import Title from '@/components/Admin/TableManager/Title';

import { useModal } from '@/hooks/use-modal';

import { ReadRoleType } from '@/types/module/role';
import { CreateRoleType } from '@/types/module/role';
import { EditRoleType } from '@/types/module/role';
import { Permission } from '@/types/module/permission';

export default function Read({ roles, permissions, total }: ReadRoleType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors } = useForm<CreateRoleType>({
        id: '',
        name: '',
        desc: '',
        permissions: [],
    });

    // Modal hooks
    const { openModal, isEditModal, setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal } = useModal({ reset, clearErrors });

    // Modal edit mode
    const handleEdit = async (role: EditRoleType) => {
        try {
            const res = await axios.get(`/admin/users/roles/${role.id}/getPermissions`);
            setData({
                id: role.id,
                name: role.name,
                desc: role.desc,
                permissions: [...res.data],
            });
            setOpenModal(true);
            setIsEditModal(true);
        } catch (error) {
            toast.error('Lỗi không thể cập nhật, vui lòng thử lại sau !');
        }
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/users/roles/store', {
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
        patch(`/admin/users/roles/${data.id}/update`, {
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
        if (confirm('Bạn có chắc muốn xóa vai trò này ?')) {
            let toastID: string;
            router.delete(`/admin/users/roles/${id}/delete`, {
                preserveScroll: true,
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
            });
        }
    };

    // Chọn nhiều
    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>, moduleItems: Permission[]) => {
        const checked = e.target.checked;
        const moduleIds = moduleItems.map(item => item.id);
        setData("permissions", checked
            ? [...new Set([...data.permissions, ...moduleIds])]
            : data.permissions.filter(id => !moduleIds.includes(id))
        );
        clearErrors('permissions');
    };

    // Chọn 1
    const handleCheckSingle = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
        const checked = e.target.checked;
        setData('permissions', checked
            ? [...data.permissions, itemId,]
            : data.permissions.filter((id) => id !== itemId,)
        );
        clearErrors('permissions');
    }

    return (
        <>
            <Head title="Vai trò" />

            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[40%] min-h-[50%]"
                title={!isEditModal ? 'Thêm mới vai trò' : 'Chỉnh sửa thông tin'}
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="createRole"
                processing={processing}
            >
                <form onSubmit={!isEditModal ? handleCreate : handleUpdate} id="createRole" >
                    <div className="mt-1">
                        <Input type="text" name="name" label="Tên vai trò" error={errors.name} value={data.name} onBlur={() => clearErrors('name')} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className="mt-1 text-gray-500">
                            VD: Admin,Post Manager...
                        </p>
                    </div>

                    <div className="mt-2">
                        <Textarea name="desc" label="Mô tả" error={errors.desc} value={data.desc} onBlur={() => clearErrors('desc')} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                    </div>

                    <div className="mt-2">
                        <div className="flex gap-2">
                            <span className="font-semibold text-gray-800">
                                Chọn quyền{' '}
                            </span>
                            <span className="text-gray-500">
                                (Vai trò này có quyền gì?)
                            </span>
                            {errors.permissions && (<div className="text-red-600">({errors.permissions})</div>)}
                        </div>

                        <div className="max-h-48 overflow-y-auto pb-2">
                            {Object.values(permissions)?.length > 0 && (
                                <>
                                    {Object.entries(permissions).map(([module, moduleItems]) => (
                                        <div key={module} className="mt-2 rounded-lg border border-gray-200 px-4 py-1">
                                            <div className="flex items-center gap-2 py-2">
                                                <input onChange={(e) => handleCheckAll(e, moduleItems)}
                                                    type="checkbox"
                                                    name="checkAll"
                                                    id={module}
                                                    checked={moduleItems.every(item => data.permissions.includes(item.id))}
                                                />
                                                <label htmlFor={module} className="mb-0.5 font-medium text-blue-600 select-none">
                                                    Module {module}
                                                </label>
                                            </div>

                                            <div className="mt-2 grid grid-cols-4 py-1">
                                                {moduleItems.map((item) => (
                                                    <div key={item.id} className="flex gap-2">
                                                        <input checked={data.permissions.includes(item.id,)}
                                                            onChange={(e) => { handleCheckSingle(e, item.id) }}
                                                            type="checkbox"
                                                            name="permissions"
                                                            id={item.id}
                                                            className="border-gray-200 bg-white"
                                                        />
                                                        <label htmlFor={item.id} className="select-none">
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Quản lí vai trò (${total})`} />
                    <ButtonCreate onOpenModal={handleOpenModal} />
                </div>

                {/* data */}
                {roles?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Tên vai trò</td>
                                    <td className="px-5 py-2">Mô tả</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0">
                                        <td className="w-60 truncate px-5 py-3">
                                            {item.name}
                                        </td>
                                        <td className="w-65 truncate px-5 py-3">
                                            {item.desc}
                                        </td>
                                        <td className="w-60 truncate px-5 py-3">
                                            {item.created_at}
                                        </td>
                                        <td className="w-60 truncate px-5 py-3">
                                            {item.updated_at}
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex h-6.75 gap-2">
                                                <ButtonEdit onEdit={() => handleEdit(item)} />
                                                <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="inline-flex w-full flex-col gap-2 md:hidden">
                            {roles.map((item) => (
                                <div key={item.id} className="flex h-22 w-full justify-between border-b border-gray-200 p-3">
                                    <div className="mt-3">
                                        <p className="w-30 truncate">
                                            {item.name}
                                        </p>
                                        <p className="w-40 truncate text-gray-500">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="flex h-6.75 flex-col gap-2">
                                        <ButtonEdit onEdit={() => handleEdit(item)} />
                                        <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {roles?.length === 0 && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    );
}
