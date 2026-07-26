import { Head, useForm, router } from '@inertiajs/react';
import { Pen, Trash, Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Fragment } from 'react';

import Button from '@/components/ui/Button';
import ModalCreate from '@/components/Admin/Modal/ModalCreate';
import ModalEdit from '@/components/Admin/Modal/ModalEdit';
import Input from '@/components/ui/Input';
import FilterTab from '@/components/Admin/TableManager/FilterTab';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import Textarea from '@/components/ui/Textarea';

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

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [idUpdate, setIdUpdate] = useState<null | string>(null);

    // Mở modal create
    const handleOpenModalCreate = () => {
        setOpenModalCreate(true);
    }

    // Đóng modal create
    const handleCloseModalCreate = () => {
        setOpenModalCreate(false);
        reset();
        setTimeout(() => {
            clearErrors();
        }, 300);
    };

    // Mở modal edit
    const handleOpenModalEdit = (permission: EditPermissionType) => {
        setData({
            id: permission.id,
            name: permission.name,
            desc: permission.desc,
            module: permission.module,
        });
        setIdUpdate(permission.id);
        setOpenModalEdit(true);
    };

    // Đóng modal edit
    const handleCloseModalEdit = () => {
        setOpenModalEdit(false);
        reset();
        setTimeout(() => {
            clearErrors();
        }, 300);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/users/permissions/store', {
            onSuccess: () => {
                setOpenModalCreate(false);
                reset();
                clearErrors();
                toast.success('Thêm mới thành công');
            },
        });
    };

    // Sửa
    const handleEdit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        patch(`/admin/users/permissions/${idUpdate}/update`, {
            preserveScroll: true,
            onSuccess: () => {
                setOpenModalEdit(false);
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
            <ModalCreate
                onClose={handleCloseModalCreate}
                isOpen={openModalCreate}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title="Thêm mới quyền"
                labelSubmit="Thêm mới"
                formSubmitId="createPermission"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createPermission">
                    <div>
                        <Input type="text" name="module" label="Module" error={errors.module} value={data.module} onChange={(e) => setData('module', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Post, Product,...</p>
                        <p className='mt-1 text-gray-500'>Dùng để nhóm các thao tác của chung 1 Module</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="name" label="Tên quyền" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Create, Edit, Update,...</p>
                    </div>

                    <div className='mt-2'>
                        <Textarea name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Thêm mới bài viết</p>
                    </div>
                </form>
            </ModalCreate>

            <ModalEdit
                onClose={handleCloseModalEdit}
                isOpen={openModalEdit}
                customSize="w-[90%] md:w-[30%] min-h-[50%]"
                title="Cập nhật thông tin"
                labelSubmit="Cập nhật"
                formSubmitId="editPermission"
                processing={processing}
            >
                <form onSubmit={handleEdit} id="editPermission">
                    <div>
                        <Input type="text" name="module" label="Module" error={errors.module} value={data.module} onChange={(e) => setData('module', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Post, Product,...</p>
                        <p className='mt-1 text-gray-500'>Dùng để nhóm các thao tác của chung 1 Module</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="name" label="Tên quyền" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Create, Edit, Update,...</p>
                    </div>

                    <div className='mt-2'>
                        <Textarea name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Thêm mới bài viết</p>
                    </div>
                </form>
            </ModalEdit>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium tracking-tight">
                        Quản lí quyền
                    </h1>
                    <Button
                        onClick={handleOpenModalCreate}
                        animatePress={true}
                        size="small"
                    >
                        <Plus size={15} />
                        <span>Thêm mới quyền</span>
                    </Button>
                </div>

                {/* stats */}
                <div className="mt-4 flex items-center justify-between">
                    {/* stats */}
                    <div className="hidden gap-1 rounded-xl bg-gray-100 p-1 tracking-tight md:grid md:grid-cols-1">
                        <FilterTab
                            isActive={true}
                            countData={total}
                            label="Tất cả"
                        />
                    </div>
                </div>

                {/* data */}
                {permissions && (
                    <div className="mt-4 pb-4 h-full overflow-hidden rounded-xl border border-gray-200">
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
                                                <div className='bg-blue-50 text-blue-700 p-0.75 px-2 rounded-md w-fit'>Module {module}</div>
                                            </td>
                                        </tr>
                                        {items.map(item => (
                                            <tr key={item.id} className='border-b border-gray-200'>
                                                <td className='px-5 py-2 w-60 truncate'>{item.name}</td>
                                                <td className='px-5 py-2 w-65 truncate'>{item.desc}</td>
                                                <td className='px-5 py-2 w-60 truncate'>{item.created_at}</td>
                                                <td className='px-5 py-2 w-55 truncate'>{item.updated_at}</td>
                                                <td className='px-5 py-2'>
                                                    <div className="flex h-6.75 gap-2">
                                                        <Button onClick={() => handleOpenModalEdit(item)} variant="outline" size="small" animatePress={true}>
                                                            <Pen size={13} className="text-gray-400" />
                                                            <span>Cập nhật</span>
                                                        </Button>
                                                        <Button onClick={() => handleDelete(item.id)} variant="outline" size="small" animatePress={true}>
                                                            <Trash size={13} className="text-gray-400" />
                                                            <span>Xóa</span>
                                                        </Button>
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
                                                <Button onClick={() => handleOpenModalEdit(item)} variant="outline" size="small" animatePress={true}>
                                                    <Pen size={13} className="text-gray-400" />
                                                    <span>Cập nhật</span>
                                                </Button>
                                                <Button onClick={() => handleDelete(item.id)} variant="outline" size="small" animatePress={true}>
                                                    <Trash size={13} className="text-gray-400" />
                                                    <span>Xóa</span>
                                                </Button>
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
                        <Button
                            onClick={handleOpenModalCreate}
                            animatePress={true}
                            size="small"
                        >
                            <Plus size={15} />
                            <span>Thêm mới quyền</span>
                        </Button>
                    </EmptyData>
                )}
            </section>
        </>
    );
}
