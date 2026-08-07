import { FileText } from 'lucide-react';
import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';

import EmptyData from '@/components/Admin/Empty/EmptyData';
import Modal from '@/components/Admin/Modal/Modal';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import Title from '@/components/Admin/TableManager/Title';

import { useModal } from '@/hooks/use-modal';

import { ReadCategoriesPostType } from '@/types/module/post_category';
import { CreateCategoriesPostType } from '@/types/module/post_category';
import { EditCategoriesPost } from '@/types/module/post_category';

export default function ReadCategoriesPost({ categories, total, }: ReadCategoriesPostType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateCategoriesPostType>({
        id: '',
        name: '',
        status: 'active'
    });

    // Modal hooks
    const { openModal, isEditModal, setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal, } = useModal({ reset, clearErrors });

    // Modal edit mode
    const handleEdit = async (category: EditCategoriesPost) => {
        setData({
            id: category.id,
            name: category.name,
            status: category.status,
        });
        setOpenModal(true);
        setIsEditModal(true);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/posts/categories/store', {
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
        patch(`/admin/posts/categories/${data.id}/update`, {
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
            });
        }
    };

    return (
        <>
            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[30%] min-h-[20%]"
                title={!isEditModal ? 'Thêm mới danh mục' : 'Chỉnh sửa thông tin'}
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="createCategory"
                processing={processing}
            >
                <form onSubmit={!isEditModal ? handleCreate : handleUpdate} id="createCategory" >
                    <div className="mt-1">
                        <Input type="text" name="name" label="Tên danh mục" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} onBlur={() => clearErrors("name")} autoComplete="on" />
                    </div>
                    <div className="mt-2">
                        <Select label="Trạng thái" name="status" value={data.status} onChange={(e) => setData('status', e.target.value as 'active' | 'inactive',)}>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Vô hiệu hóa</option>
                        </Select>
                    </div>
                    <p className="mt-2 rounded-lg bg-gray-50 p-2 text-green-700">
                        Slug (URL Friendly) sẽ được hệ thống tự tạo theo tên
                        danh mục.
                    </p>
                </form>

            </Modal>

            <Head title="Danh mục bài viết" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Danh mục bài viết (${total})`} />
                    <ButtonCreate onOpenModal={handleOpenModal} />
                </div>

                {/* data */}
                {categories?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Danh mục</td>
                                    <td className="px-5 py-2"> Slug (Friendly URL)</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Trạng thái</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0" >
                                        <td className="w-60 truncate px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <FileText strokeWidth={1} className="fill-blue-500" />
                                                <div>{item.name}</div>
                                            </div>
                                        </td>
                                        <td className="w-60 truncate px-5 py-3.5">
                                            {item.slug}
                                        </td>
                                        <td className="w-45 truncate px-5 py-3.5">
                                            {item.created_at}
                                        </td>
                                        <td className="w-45 truncate px-5 py-3.5">
                                            {item.updated_at}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="w-25">
                                                <Badge status={item.status} />
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
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
                            {categories.map((item) => (
                                <div key={item.id} className="flex h-22 w-full justify-between border-b border-gray-200 p-3" >
                                    <div className="relative mt-3">
                                        <div className="flex items-center gap-4">
                                            <FileText strokeWidth={1} className="fill-blue-500" />
                                            <div>
                                                <p className="w-30 truncate">
                                                    {item.name}
                                                </p>
                                                <p className="w-40 truncate text-gray-500">
                                                    {item.slug}
                                                </p>
                                            </div>
                                        </div>
                                        {item.status === 'active' && (
                                            <div className="absolute top-6 left-4 h-3 w-3 rounded-full bg-green-600"></div>
                                        )}
                                        {item.status === 'inactive' && (
                                            <div className="absolute top-6 left-4 h-3 w-3 rounded-full bg-red-600"></div>
                                        )}
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
                {categories?.length === 0 && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    );
}
