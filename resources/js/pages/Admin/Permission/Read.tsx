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
import ShortCutHint from '@/components/Admin/TableManager/Hint';

import { useModal } from '@/hooks/use-modal';
import { useShortCut } from '@/hooks/use-shortcut';

import { ReadPermissionType } from '@/types/module/permission';
import { CreatePermissionType } from '@/types/module/permission';
import { EditPermissionType } from '@/types/module/permission';

export default function Read({ permissions, total }: ReadPermissionType) {
    const {
        data,
        setData,
        post,
        patch,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm<CreatePermissionType>({
        id: '',
        name: '',
        slug: '',
        desc: '',
        module: '',
    });

    // Modal hooks
    const {
        openModal,
        isEditModal,
        setOpenModal,
        setIsEditModal,
        handleOpenModal,
        handleCloseModal,
    } = useModal({ reset, clearErrors });

    /// Shortcut hooks
    useShortCut({ openModal, handleCloseModal, handleOpenModal });

    // Modal Edit Mode
    const handleEdit = (permission: EditPermissionType) => {
        setData({
            id: permission.id,
            name: permission.name,
            slug: permission.slug,
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
            });
        }
    };

    return (
        <>
            <Head title="Quyền" />

            {/* Modal */}
            <Modal
                formSubmitId="createPermission"
                onClose={handleCloseModal}
                isOpen={openModal}
                title={!isEditModal ? 'Thêm mới quyền' : 'Chỉnh sửa thông tin'}
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                processing={processing}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
            >
                <form
                    onSubmit={!isEditModal ? handleCreate : handleUpdate}
                    id="createPermission"
                >
                    <div>
                        <Input
                            type="text"
                            name="module"
                            label="Module"
                            error={errors.module}
                            value={data.module}
                            onChange={(e) => setData('module', e.target.value)}
                            onBlur={() => clearErrors('module')}
                            autoComplete="on"
                        />
                        <p className="mt-1 text-gray-500">
                            Nhóm các thao tác có chung module liên quan
                            (vd:Post, Product,...)
                        </p>
                    </div>

                    <div className="mt-2">
                        <Input
                            type="text"
                            name="name"
                            label="Tên quyền"
                            error={errors.name}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            onBlur={() => clearErrors('name')}
                            autoComplete="on"
                        />
                        <p className="mt-1 text-gray-500">
                            VD: Create, Edit, Update,...
                        </p>
                    </div>

                    <div className="mt-2">
                        <Input
                            type="text"
                            name="slug"
                            label="Slug"
                            error={errors.slug}
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            onBlur={() => clearErrors('slug')}
                            autoComplete="on"
                        />
                        <p className="mt-1 text-gray-500">VD: post.create</p>
                        <p className="mt-1 text-gray-500">
                            Slug là định danh của quyền, dùng để kiểm tra phân
                            quyền User
                        </p>
                    </div>

                    <div className="mt-2">
                        <Textarea
                            name="desc"
                            label="Mô tả"
                            error={errors.desc}
                            value={data.desc}
                            onChange={(e) => setData('desc', e.target.value)}
                            onBlur={() => clearErrors('desc')}
                            autoComplete="on"
                        />
                    </div>
                </form>
            </Modal>

            <section className='pb-4 md:pb-0'>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Quản lí quyền (${total})`} />

                    <div className="flex items-center gap-2">
                        <ShortCutHint />
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </div>
                </div>

                {/* data */}
                {permissions && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200 pb-1">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">
                                        Nhóm & tên quyền
                                    </td>
                                    <td className="px-5 py-2">Mô tả</td>
                                    <td className="px-5 py-2">Slug</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(permissions).map(
                                    ([module, items]) => (
                                        <Fragment key={module}>
                                            <tr className="font-semibold">
                                                <td className="px-3 py-4">
                                                    <div className="mt-4 w-fit rounded-lg bg-blue-50 p-0.75 px-2 text-blue-700">
                                                        Module {module}
                                                    </div>
                                                </td>
                                            </tr>
                                            {items.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-200 last-of-type:border-0"
                                                >
                                                    <td className="w-55 truncate px-5 py-2">
                                                        {item.name}
                                                    </td>
                                                    <td className="w-55 truncate px-5 py-2">
                                                        {item.desc}
                                                    </td>
                                                    <td className="w-50 truncate px-5 py-2">
                                                        {item.slug}
                                                    </td>
                                                    <td className="w-40 truncate px-5 py-2">
                                                        {item.created_at}
                                                    </td>
                                                    <td className="w-40 truncate px-5 py-2">
                                                        {item.updated_at}
                                                    </td>
                                                    <td className="px-5 py-2">
                                                        <div className="flex h-6.75 gap-2">
                                                            <ButtonEdit
                                                                onEdit={() =>
                                                                    handleEdit(
                                                                        item,
                                                                    )
                                                                }
                                                            />
                                                            <ButtonDelete
                                                                onDelete={() =>
                                                                    handleDelete(
                                                                        item.id,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </Fragment>
                                    ),
                                )}
                            </tbody>
                        </table>

                        {/* modile */}
                        <div className="block p-3 md:hidden">
                            {Object.entries(permissions).map(
                                ([module, items]) => (
                                    <Fragment key={module}>
                                        <div className="my-3 w-fit rounded-md bg-blue-50 px-2 py-1 font-medium text-blue-700 first:mt-0">
                                            Module {module}
                                        </div>
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="mt-3 flex h-20 justify-between border-b border-gray-200 px-1"
                                            >
                                                <div className="mt-3">
                                                    <div className="w-30 truncate">
                                                        {item.name}
                                                    </div>
                                                    <div className="w-30 truncate text-gray-500">
                                                        ({item.desc})
                                                    </div>
                                                </div>

                                                <div className="flex h-6.75 flex-col gap-2">
                                                    <ButtonEdit
                                                        onEdit={() =>
                                                            handleEdit(item)
                                                        }
                                                    />
                                                    <ButtonDelete
                                                        onDelete={() =>
                                                            handleDelete(
                                                                item.id,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </Fragment>
                                ),
                            )}
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
