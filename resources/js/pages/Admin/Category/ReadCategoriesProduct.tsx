import { Plus, Pen, Trash, FileText, Folder } from "lucide-react"
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
import Badge from "@/components/ui/Badge"
import { Fragment } from "react"

import { ReadCategoriesProductType } from "@/types/module/product_category"
import { CreateCategoriesProductType } from "@/types/module/product_category"
import { EditCategoriesPostType } from "@/types/module/product_category"

export default function ReadCategoriesProduct({ categories, parent_categories, total }: ReadCategoriesProductType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateCategoriesProductType>({
        id: '',
        name: '',
        parent_id: '0',
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
    const handleOpenModalEdit = async (category: EditCategoriesPostType) => {
        setData({
            id: category.id,
            name: category.name,
            status: category.status,
            parent_id: category.parent_id
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
        post('/admin/products/categories/store', {
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
        patch(`/admin/products/categories/${idUpdate}/update`, {
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
            router.delete(`/admin/products/categories/${id}/delete`, {
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
                title="Thêm mới danh mục"
                labelSubmit="Thêm mới"
                formSubmitId="createProductCategory"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createProductCategory">
                    <div className='mt-1'>
                        <Input type="text" name="name" label="Tên danh mục" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                    </div>
                    <div className="mt-2">
                        <Select label="Danh mục cha" name="parent_id" value={data.parent_id} onChange={(e) => setData("parent_id", e.target.value)}>
                            <option value="">-Chọn danh mục cha-</option>
                            {parent_categories?.length > 0 && (
                                parent_categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            )}
                            {parent_categories?.length === 0 && (
                                <option value="">Hiện chưa có danh mục cha nào !</option>
                            )}
                        </Select>
                    </div>
                    <p className="mt-2 text-green-700 p-2 bg-gray-50 rounded-lg">Để trống để khởi tạo danh mục cha.</p>
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
                        <Select label="Danh mục cha" name="parent_id" value={data.parent_id} onChange={(e) => setData("parent_id", e.target.value)}>
                            <option value="">-Chọn danh mục cha-</option>
                            {parent_categories?.length > 0 && (
                                parent_categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))
                            )}
                            {parent_categories?.length === 0 && (
                                <option value="">Hiện chưa có danh mục cha nào !</option>
                            )}
                        </Select>
                    </div>
                    <p className="mt-2 text-green-700 p-2 bg-gray-50 rounded-lg">Để trống để khởi tạo danh mục cha.</p>
                    <div className="mt-2">
                        <Select label="Trạng thái" name="status" value={data.status} onChange={(e) => setData("status", e.target.value as 'active' | 'inactive')}>
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Vô hiệu hóa</option>
                        </Select>
                    </div>
                    <p className="mt-2 text-green-700 p-2 bg-gray-50 rounded-lg">Slug (URL Friendly) sẽ được hệ thống tự tạo theo tên danh mục.</p>
                </form>
            </ModalEdit>

            <Head title="Danh mục sản phẩm" />

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium tracking-tight">
                        Danh mục sản phẩm
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
                                    <td className="px-5 py-2">Slug</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Trạng thái</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <Fragment key={category.id}>
                                        {/* danh mục cha */}
                                        <tr className="border-b border-gray-200">
                                            <td className="px-5 py-4">
                                                <div className="flex gap-2 items-center w-40 truncate">
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
                                                <div className="flex h-6.75 gap-2 w-40">
                                                    <Button onClick={() => handleOpenModalEdit(category)} variant="outline" size="small" animatePress={true}>
                                                        <Pen size={13} className="text-gray-400" />
                                                        <span>Cập nhật</span>
                                                    </Button>
                                                    <Button onClick={() => handleDelete(category.id)} variant="outline" size="small" animatePress={true}>
                                                        <Trash size={13} className="text-gray-400" />
                                                        <span>Xóa</span>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* danh mục con */}
                                        {category.childs?.length > 0 && (
                                            category.childs.map(item => (
                                                <tr key={item.id} className="border-b border-gray-200">
                                                    <td className="px-5 py-4">
                                                        <div className="ms-2.5 border-l border-gray-300 w-40 truncate pl-4">
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
                                                        <div className="flex h-6.75 gap-2 w-40">
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
                                            ))
                                        )}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>

                        {/* mobile */}
                        {/* <div className="md:hidden inline-flex flex-col gap-2 w-full">
                                            {roles.map(item => (
                                                <div key={item.id} className="border-b border-gray-200 p-3 w-full flex justify-between h-22">
                                                    <div className="mt-3">
                                                        <p className="w-30 truncate">{item.name}</p>
                                                        <p className="text-gray-500 w-40 truncate">{item.desc}</p>
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
                                        </div> */}
                    </div>
                )}


                {/* empty */}
                {/* {categories?.length === 0 && (
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
                )} */}

            </section>
        </>
    )
}