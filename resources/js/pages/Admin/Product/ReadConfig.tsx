import { Head, useForm, router } from "@inertiajs/react"
import { Fragment, useEffect } from "react"
import toast from "react-hot-toast"

import EmptyData from "@/components/Admin/Empty/EmptyData"
import Modal from "@/components/Admin/Modal/Modal"
import Title from "@/components/Admin/TableManager/Title"
import ButtonCreate from "@/components/Admin/TableManager/ButtonCreate"
import ButtonEdit from "@/components/Admin/TableManager/ButtonEdit"
import ButtonDelete from "@/components/Admin/TableManager/ButtonDelete"
import ButtonQuickCreate from "@/components/Admin/TableManager/ButtonQuickCreate"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import ShortCutHint from '@/components/Admin/TableManager/Hint';

import { useModal } from "@/hooks/use-modal"
import { useShortCut } from "@/hooks/use-shortcut"

import { CreateProductConfigType, EditProductConfigType } from "@/types/module/product_config"
import { ReadProductConfigType } from "@/types/module/product_config"


export default function ReadConfig({ configs, total, groupConfigs }: ReadProductConfigType) {

    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateProductConfigType>({
        id: '',
        name: '',
        group_id: ''
    });

    // Modal hooks
    const { openModal, isEditModal, setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal, } = useModal({ reset, clearErrors });

    // ShortCut hooks
    useShortCut({openModal, handleOpenModal, handleCloseModal})

    // Modal Edit Mode
    const handleEdit = (config: EditProductConfigType) => {
        setData({
            id: config.id,
            name: config.name,
            group_id: config.group_id,
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
    const handleDelete = (id: string | number | null) => {
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
            <Head title="Thông tin cấu hình" />

            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[30%] md:min-h-[40%]"
                title={
                    !isEditModal ? 'Thêm mới cấu hình' : 'Chỉnh sửa thông tin'
                }
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="config"
                processing={processing}
            >
                <form
                    onSubmit={!isEditModal ? handleCreate : handleUpdate}
                    id="config"
                >
                    <div>
                        <Select
                            label="Nhóm cấu hình"
                            name="group_id"
                            onChange={(e) =>
                                setData('group_id', e.target.value)
                            }
                            onBlur={() => clearErrors('group_id')}
                            error={errors.group_id}
                            value={data.group_id ?? ''}
                        >
                            <option value="">-Chọn nhóm cấu hình-</option>
                            {groupConfigs?.length > 0 &&
                                groupConfigs.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            {groupConfigs?.length === 0 && (
                                <option value="">
                                    Hiện chưa có nhóm cấu hình nào !
                                </option>
                            )}
                        </Select>
                    </div>

                    <div className="mt-2">
                        <Textarea
                            onBlur={() => clearErrors('name')}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            value={data.name}
                            label="Cấu hình"
                            name="name"
                            className="h-15!"
                        />
                    </div>
                </form>
            </Modal>

            {/* quick create */}
            <ButtonQuickCreate onOpenModal={handleOpenModal} />

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Thông tin cấu hình (${total})`} />
                    <div className="flex items-center gap-2">
                        <ShortCutHint />
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </div>
                </div>

                {/* data */}
                {Object.values(configs)?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200 pb-2">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">
                                        Nhóm & cấu hình
                                    </td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(configs).map(
                                    ([group, items]) => (
                                        <Fragment key={group}>
                                            <tr className="font-semibold">
                                                <td className="px-3 pt-4">
                                                    <div className="w-fit rounded-lg border border-gray-100 bg-blue-50 px-3 py-2 text-blue-700">
                                                        {group.toUpperCase()}
                                                    </div>
                                                </td>
                                            </tr>
                                            {items.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="border-b border-gray-200 last-of-type:border-0"
                                                >
                                                    <td className="px-5 py-3">
                                                        <div className="w-120 truncate">
                                                            {item.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-3">
                                                        {item.created_at}
                                                    </td>
                                                    <td className="w-55 truncate px-5 py-3">
                                                        {item.updated_at}
                                                    </td>
                                                    <td className="px-5 py-3">
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
                            {Object.entries(configs).map(([group, items]) => (
                                <Fragment key={group}>
                                    <div className="mt-5 w-fit rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700">
                                        {group.toUpperCase()}
                                    </div>
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="mt-4 flex h-20 justify-between border-b border-gray-200 px-1"
                                        >
                                            <div className="mt-6">
                                                <div className="w-50 truncate">
                                                    {item.name}
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
                                                        handleDelete(item.id)
                                                    }
                                                />
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
    );
}