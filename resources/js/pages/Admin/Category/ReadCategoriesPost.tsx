import { Plus, Pen, Trash, FileText } from "lucide-react"
import Button from "@/components/ui/Button"
import { Head, useForm, router } from "@inertiajs/react"
import { useState } from "react"
import toast from "react-hot-toast"

import FilterTab from "@/components/Admin/TableManager/FilterTab"
import ModalCreate from "@/components/Admin/Modal/ModalCreate"
import ModalEdit from "@/components/Admin/Modal/ModalEdit"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import EmptyData from "@/components/Admin/Empty/EmptyData"

import { ReadCategoriesPostType } from "@/types/module/post_category"
import { CreateCategoriesPostType } from "@/types/module/post_category"
import { EditCategoriesPost } from "@/types/module/post_category"
import Badge from "@/components/ui/Badge"

export default function ReadCategoriesPost({ categories, total }: ReadCategoriesPostType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateCategoriesPostType>({
        id: '',
        name: '',
        status: 'active',
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
    const handleOpenModalEdit = async (category: EditCategoriesPost) => {
        setData({
            id: category.id,
            name: category.name,
            status: category.status
        });
        setIdUpdate(category.id);
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
        post('/admin/posts/categories/store', {
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
        patch(`/admin/posts/categories/${idUpdate}/update`, {
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
        if (confirm('Bạn có chắc muốn xóa danh mục này ?')) {
            let toastID: string;
            router.delete(`/admin/posts/categories/${id}/delete`, {
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
            {/* Modal */}
            <ModalCreate
                onClose={handleCloseModalCreate}
                isOpen={openModalCreate}
                customSize="w-[90%] md:w-[30%] min-h-[20%]"
                title="Thêm mới vai trò"
                labelSubmit="Thêm mới"
                formSubmitId="createRole"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createRole">
                    <div className='mt-1'>
                        <Input type="text" name="name" label="Tên danh mục" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                    </div>
                    <div className="mt-2">
                        <Select label="Trạng thái" name="status" value={data.status} onChange={(e) => setData("status", e.target.value as 'active' | 'inactive')}>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Vô hiệu hóa</option>
                        </Select>
                    </div>
                    <p className="mt-2 text-green-700 p-2 bg-gray-50 rounded-lg">Slug (URL Friendly) sẽ được hệ thống tự tạo theo tên danh mục.</p>
                </form>
            </ModalCreate>

            <ModalEdit
                onClose={handleCloseModalEdit}
                isOpen={openModalEdit}
                customSize="w-[90%] md:w-[30%] min-h-[20%]"
                title="Cập nhật thông tin"
                labelSubmit="Cập nhật"
                formSubmitId="editCategoriesPost"
                processing={processing}
            >
                <form onSubmit={handleEdit} id="editCategoriesPost">
                    <div className='mt-1'>
                        <Input type="text" name="name" label="Tên danh mục" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                    </div>
                    <div className="mt-2">
                        <Select label="Trạng thái" name="status" value={data.status} onChange={(e) => setData("status", e.target.value as 'active' | 'inactive')}>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Vô hiệu hóa</option>
                        </Select>
                    </div>
                    <p className="mt-2 text-green-700 p-2 bg-gray-50 rounded-lg">Slug (URL Friendly) sẽ được hệ thống tự tạo theo tên danh mục.</p>
                </form>
            </ModalEdit>

            <Head title="Danh mục bài viết" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium tracking-tight">
                        Danh mục bài viết
                    </h1>
                    <Button
                        onClick={handleOpenModalCreate}
                        animatePress={true}
                        size="small"
                    >
                        <Plus size={15} />
                        <span>Thêm mới danh mục</span>
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
                {categories?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Danh mục</td>
                                    <td className="px-5 py-2">Slug (Friendly URL)</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Trạng thái</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(item => (
                                    <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0">
                                        <td className="px-5 py-3 w-60 truncate">
                                            <div className="flex items-center gap-2">
                                                <FileText strokeWidth={1} className="fill-blue-500" />
                                                <div>{item.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 w-60 truncate">{item.slug}</td>
                                        <td className="px-5 py-3 w-45 truncate">{item.created_at}</td>
                                        <td className="px-5 py-3 w-45 truncate">{item.updated_at}</td>
                                        <td className="px-5 py-3">
                                            <div className="w-25">
                                                <Badge status={item.status} />
                                            </div>
                                        </td>
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

                        {/* mobile */}
                        <div className="md:hidden inline-flex flex-col gap-2 w-full">
                            {categories.map(item => (
                                <div key={item.id} className="border-b border-gray-200 p-3 w-full flex justify-between h-22">
                                    <div className="mt-3 relative">
                                        <div className="flex items-center gap-4">
                                            <FileText strokeWidth={1} className="fill-blue-500" />
                                            <div>
                                                <p className="w-30 truncate">{item.name}</p>
                                                <p className="text-gray-500 w-40 truncate">{item.slug}</p>
                                            </div>
                                        </div>
                                        {item.status === 'active' && (
                                            <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-green-600"></div>
                                        )}
                                        {item.status === 'inactive' && (
                                            <div className="absolute left-4 top-6 h-3 w-3 rounded-full bg-red-600"></div>
                                        )}
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
                        </div>
                    </div>
                )}

                {/* empty */}
                {categories?.length === 0 && (
                    <EmptyData>
                        <Button
                            onClick={handleOpenModalCreate}
                            animatePress={true}
                            size="small"
                        >
                            <Plus size={15} />
                            <span>Thêm mới danh mục</span>
                        </Button>
                    </EmptyData>
                )}
                
            </section>
        </>
    )
}