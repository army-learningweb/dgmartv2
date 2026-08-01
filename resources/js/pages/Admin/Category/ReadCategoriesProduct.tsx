import { Folder, CornerDownRight } from 'lucide-react';
import { Head, useForm, router } from '@inertiajs/react';
import { Fragment } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';

import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Badge from '@/components/ui/Badge';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import Modal from '@/components/Admin/Modal/Modal';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import Title from '@/components/Admin/TableManager/Title';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';

import { useModal } from '@/hooks/use-modal';

import { ReadCategoriesProductType } from '@/types/module/product_category';
import { CreateCategoriesProductType } from '@/types/module/product_category';
import { EditCategoriesPostType } from '@/types/module/product_category';

export default function ReadCategoriesProduct({ categories, parent_categories, total }: ReadCategoriesProductType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors } = useForm<CreateCategoriesProductType>({
        id: '',
        name: '',
        parent_id: '0',
        status: 'active',
    });

    // Modal hooks
    const { openModal, isEditModal, setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal } = useModal({ reset, clearErrors });

    // Mở modal edit
    const handleEdit = async (category: EditCategoriesPostType) => {
        setData({
            id: category.id,
            name: category.name,
            status: category.status,
            parent_id: category.parent_id,
        });
        setOpenModal(true);
        setIsEditModal(true);
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/products/categories/store', {
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
        patch(`/admin/products/categories/${data.id}/update`, {
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
        if (confirm('Bạn có chắc muốn xóa danh mục này, lưu ý cấp danh mục trước khi xóa ?',)) {
            let toastID: string;
            router.delete(`/admin/products/categories/${id}/delete`, {
                preserveScroll: true,
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
                onError: (error) => {
                    toast.error(error.message, { id: toastID });
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
                formSubmitId="categoryProduct"
                processing={processing}
            >
                <form onSubmit={!isEditModal ? handleCreate : handleUpdate} id="categoryProduct" >
                    <div className="mt-1">
                        <Input type="text" name="name" label="Tên danh mục" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                    </div>
                    <div className="mt-2">
                        <Select className={clsx('', { 'pointer-events-none opacity-50': data.parent_id == '0' && isEditModal, })}
                            label="Danh mục cha"
                            name="parent_id"
                            value={data.parent_id}
                            onChange={(e) => setData('parent_id', e.target.value)}
                        >
                            <option value="">-Chọn danh mục cha-</option>
                            {parent_categories?.length > 0 &&
                                parent_categories.map((category) => (
                                    <option key={category.id} value={category.id}> {category.name} </option>
                                ))}

                            {parent_categories?.length === 0 && (
                                <option value=""> Hiện chưa có danh mục cha nào !</option>
                            )}
                        </Select>
                    </div>

                    {!isEditModal && (
                        <p className="mt-2 rounded-lg bg-gray-50 p-2 text-green-700">
                            Để mặc định để khởi tạo danh mục cha.
                        </p>
                    )}

                    {data.parent_id == '0' && isEditModal && (
                        <p className="mt-2 rounded-lg bg-amber-50 p-2 text-amber-700">
                            Danh mục cha không thể sửa đổi !
                        </p>
                    )}

                    <div className="mt-2">
                        <Select
                            label="Trạng thái"
                            name="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value as 'active' | 'inactive',)}
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Vô hiệu hóa</option>
                        </Select>
                    </div>
                    <p className="mt-2 rounded-lg bg-gray-50 p-2 text-green-700">
                        Slug (URL Friendly) sẽ được hệ thống tự tạo theo tên
                        danh mục
                    </p>
                </form>
            </Modal>

            <Head title="Danh mục sản phẩm" />

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Danh mục sản phẩm (${total})`} />
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
                                    <td className="px-5 py-2">Slug</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Trạng thái</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <Fragment key={category.id}>
                                        {/* danh mục cha */}
                                        <tr className="border-b border-gray-100">
                                            <td className="px-5 py-4">
                                                <div className="flex w-40 items-center gap-2 truncate">
                                                    <Folder className="fill-amber-500" strokeWidth={1} size={19.5} />
                                                    <div>{category.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="w-40 truncate">
                                                    {category.slug}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="w-35">
                                                    {category.created_at}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="w-35">
                                                    {category.updated_at}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="w-30">
                                                    <Badge status={category.status} />
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex h-6.75 w-40 gap-2">
                                                    <ButtonEdit onEdit={() => handleEdit(category)} />
                                                    <ButtonDelete onDelete={() => handleDelete(category.id)} />
                                                </div>
                                            </td>
                                        </tr>

                                        {/* danh mục con */}
                                        {category.childs?.length > 0 &&
                                            category.childs.map((item) => (
                                                <tr key={item.id} className="border-b border-gray-100">
                                                    <td className="px-5 py-4">
                                                        <div className="ms-2.5 flex w-40 gap-2 truncate">
                                                            <CornerDownRight size={18} strokeWidth={1.5} />
                                                            <div>{item.name}</div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="w-40 truncate">
                                                            {item.slug}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="w-35">
                                                            {item.created_at}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="w-35">
                                                            {item.updated_at}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="w-30">
                                                            <Badge status={item.status} />
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex h-6.75 w-40 gap-2">
                                                            <ButtonEdit onEdit={() => handleEdit(category)} />
                                                            <ButtonDelete onDelete={() => handleDelete(category.id)} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        <div className="inline-flex w-full flex-col gap-2 p-3 md:hidden">
                            {categories.map((category) => (
                                <Fragment key={category.id}>
                                    <div className="flex h-22.5 gap-2 border-b border-gray-200 py-2">
                                        <div className="relative flex flex-1 items-center gap-2 truncate">
                                            <Folder className="fill-amber-500" strokeWidth={1} size={19.5} />
                                            <div className='w-30 truncate'>{category.name}</div>

                                            {category.status === 'active' && (
                                                <div className="absolute bottom-6 left-3 h-3 w-3 rounded-full bg-green-600"></div>
                                            )}
                                            {category.status === 'inactive' && (
                                                <div className="absolute bottom-6 left-3 h-3 w-3 rounded-full bg-red-600"></div>
                                            )}

                                        </div>
                                        <div className="flex h-6.75 w-24 flex-col gap-2">
                                            <ButtonEdit onEdit={() => handleEdit(category)} />
                                            <ButtonDelete onDelete={() => handleDelete(category.id)} />
                                        </div>
                                    </div>

                                    {category.childs.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex h-22.5 gap-2 border-b border-gray-200 py-2"
                                        >
                                            <div className="relative ms-2 mt-5.5 flex h-5 flex-1 items-center gap-2 truncate border-l border-gray-300 pl-6">
                                                {item.name}
                                            </div>
                                            <div className="flex h-6.75 w-24 flex-col gap-2">
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
                {categories?.length === 0 && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    );
}
