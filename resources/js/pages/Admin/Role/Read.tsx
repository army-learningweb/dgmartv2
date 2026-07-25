import { Head, useForm, router } from "@inertiajs/react"
import { Plus, Pen, Trash } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

import Button from "@/components/ui/Button"
import ModalCreate from "@/components/Admin/Modal/ModalCreate"
import ModalEdit from "@/components/Admin/Modal/ModalEdit"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import FilterTab from "@/components/Admin/TableManager/FilterTab"

import { ReadRoleType } from '@/types/module/role';
import { CreateRoleType } from '@/types/module/role';
import { EditRoleType } from '@/types/module/role';

export default function Read({ roles, total }: ReadRoleType) {

    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateRoleType>({
        id: '',
        name: '',
        desc: '',
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
    const handleOpenModalEdit = (role: EditRoleType) => {
        setData({
            id: role.id,
            name: role.name,
            desc: role.desc,
        });
        setIdUpdate(role.id);
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
        post('/admin/users/roles/store', {
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
        patch(`/admin/users/roles/${idUpdate}/update`, {
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
            })
        }
    };


    return (
        <>
            <Head title="Vai trò" />

            {/* Modal */}
            <ModalCreate
                onClose={handleCloseModalCreate}
                isOpen={openModalCreate}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title="Thêm mới vai trò"
                labelSubmit="Thêm mới"
                formSubmitId="createRole"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createRole">
                    <div className='mt-2'>
                        <Input type="text" name="name" label="Tên vai trò" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Admin,Post Manager...</p>
                    </div>

                    <div className='mt-2'>
                        <Textarea name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Quản lí toàn bộ hệ thống</p>
                    </div>
                </form>
            </ModalCreate>

            <ModalEdit
                onClose={handleCloseModalEdit}
                isOpen={openModalEdit}
                customSize="w-[90%] md:w-[30%] min-h-[50%]"
                title="Cập nhật thông tin"
                labelSubmit="Cập nhật"
                formSubmitId="editRole"
                processing={processing}
            >
                <form onSubmit={handleEdit} id="editRole">
                   <div className='mt-2'>
                        <Input type="text" name="name" label="Tên vai trò" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Admin,Post Manager...</p>
                    </div>

                    <div className='mt-2'>
                        <Textarea name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Quản lí toàn bộ hệ thống</p>
                    </div>
                </form>
            </ModalEdit>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium tracking-tight">
                        Quản lí vai trò
                    </h1>
                    <Button
                        onClick={handleOpenModalCreate}
                        animatePress={true}
                        size="small"
                    >
                        <Plus size={15} />
                        <span>Thêm mới vai trò</span>
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
                                {roles.map(item => (
                                    <tr className="border-b border-gray-200 last-of-type:border-0">
                                        <td className="px-5 py-3">{item.name}</td>
                                        <td className="px-5 py-3">{item.desc}</td>
                                        <td className="px-5 py-3">{item.created_at}</td>
                                        <td className="px-5 py-3">{item.updated_at}</td>
                                        <td className="px-5 py-3">
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
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </>
    )
}