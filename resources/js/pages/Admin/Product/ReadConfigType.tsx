import { Head, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Input from '@/components/ui/Input';
import EmptyData from '@/components/Admin/Empty/EmptyData';
import Modal from '@/components/Admin/Modal/Modal';
import ButtonCreate from '@/components/Admin/TableManager/ButtonCreate';
import ButtonDelete from '@/components/Admin/TableManager/ButtonDelete';
import ButtonEdit from '@/components/Admin/TableManager/ButtonEdit';
import Title from '@/components/Admin/TableManager/Title';

import { useModal } from '@/hooks/use-modal';

import { ReadProductConfigTypeS } from '@/types/module/product_config_type';
import { CreateProductConfigTypeS } from '@/types/module/product_config_type';
import { EditProductConfigTypeS } from '@/types/module/product_config_type';
import { ConfigType } from '@/types/module/product_config_type';

export default function ReadConfigType({ types, configs, total }: ReadProductConfigTypeS) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateProductConfigTypeS>({
        id: '',
        name: '',
        desc: '',
        configs: [],
    });

    // Modal hooks
    const { openModal, isEditModal, setOpenModal, setIsEditModal, handleOpenModal, handleCloseModal, } = useModal({ reset, clearErrors });

    // Modal Edit Mode
    const handleEdit = async (configType: EditProductConfigTypeS) => {
        try {
            const res = await axios.get(`/admin/products/configs/type/${configType.id}/getConfigs`);
            setData({
                id: configType.id,
                name: configType.name,
                desc: configType.desc,
                configs: [...res.data],
            });
            setOpenModal(true);
            setIsEditModal(true);

        } catch (error) {
            toast.error('Lỗi chưa thể cập nhật, vui lòng thử lại sau !');
            setOpenModal(false);
        }
    };

    // Thêm
    const handleCreate = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/admin/products/configs/type/store', {
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
        patch(`/admin/products/configs/type/${data.id}/update`, {
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
            router.delete(`/admin/products/configs/type/${id}/delete`, {
                onStart: () => {
                    toastID = toast.loading('Đang xóa...');
                },
                onSuccess: () => {
                    toast.success('Xóa thành công', { id: toastID });
                },
            });
        }
    };

    // Checkall
    const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>, configItems: ConfigType[]) => {
        const idConfigs = configItems.map((item) => item.id);
        const checked = e.target.checked;
        setData('configs', checked
            ? [...new Set([...data.configs, ...idConfigs])]
            : data.configs.filter((id) => !idConfigs.includes(id)),
        );
        clearErrors("configs");
    };

    // CheckSingle
    const handleCheckSingle = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
        const checked = e.target.checked;
        setData('configs', checked
            ? [...data.configs, itemId]
            : data.configs.filter((id,) => id !== itemId));
        clearErrors("configs");
    }

    return (
        <>
            <Head title="Loại cấu hình" />

            {/* Modal */}
            <Modal
                onClose={handleCloseModal}
                isOpen={openModal}
                customSize="w-[90%] md:w-[60%] min-h-[40%]"
                title={!isEditModal ? 'Thêm loại cấu hình' : 'Chỉnh sửa thông tin'}
                labelSubmit={!isEditModal ? 'Thêm mới' : 'Cập nhật'}
                formSubmitId="createConfigType"
                processing={processing}
            >
                <form onSubmit={!isEditModal ? handleCreate : handleUpdate} id="createConfigType">
                    <div>
                        <Input type="text" 
                            name="name" 
                            label="Tên loại" 
                            error={errors.name} 
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)} 
                            onBlur={() => clearErrors("name")} 
                            autoComplete="on" 
                            placeholder='Laptop'
                        />
                    </div>

                    <div className="mt-2">
                        <Input type="text" 
                            name="desc" 
                            label="Mô tả" 
                            error={errors.desc} 
                            value={data.desc} 
                            onChange={(e) => setData('desc', e.target.value)} 
                            onBlur={() => clearErrors("desc")} 
                            autoComplete="on" 
                            placeholder='Cấu hình cho sản phẩm Laptop'
                        />
                    </div>

                    <div className="mt-2">
                        <div className="flex flex-col md:flex-row gap-2">
                            <span className="font-medium">Chọn cấu hình</span>
                            <span className="text-gray-500"> (Loại này có cấu hình gì?) </span>
                            {errors.configs && (
                                <span className="text-red-600">
                                    ({errors.configs})
                                </span>
                            )}
                        </div>
                        
                        {/* config */}
                        {Object.keys(configs)?.length > 0 && (
                            <div className="mt-2 max-h-85 overflow-y-auto">
                                {Object.entries(configs).map(
                                    ([group, configItems]) => (
                                        <div key={group} className="rounded-lg border border-gray-200 p-3 mb-3" >
                                            <div className="itemsc-enter flex w-fit gap-2 rounded-lg py-1">
                                                <input onChange={(e) => handleCheckAll(e, configItems)}
                                                    checked={configItems.every((item) => data.configs?.includes(item.id,))}
                                                    type="checkbox"
                                                    name="checkAll"
                                                    id={group}
                                                    value={group}
                                                />
                                                <label htmlFor={group} className="font-medium text-blue-600 select-none">{group} </label>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mt-3">
                                                {configItems.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-2" >
                                                        <div>
                                                            <input onChange={(e) => handleCheckSingle(e, item.id)}
                                                                checked={data.configs.includes(item.id)}
                                                                type="checkbox"
                                                                name="configs"
                                                                id={item.id}
                                                            />
                                                        </div>
                                                        <label className="mb-0.75 select-none w-95 truncate" htmlFor={item.id}> {item.name} </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}
                    </div>
                </form>
            </Modal>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <Title heading={`Loại cấu hình (${total})`} />
                    <ButtonCreate onOpenModal={handleOpenModal} />
                </div>

                {/* data */}
                {types?.length > 0 && (
                    <div className="mt-4 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Tên loại</td>
                                    <td className="px-5 py-2">Mô tả</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {types.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0" >
                                        <td className="w-50 truncate px-5 py-3">
                                            {item.name}
                                        </td>
                                        <td className="w-80 truncate px-5 py-3">
                                            {item.desc}
                                        </td>
                                        <td className="w-55 truncate px-5 py-3">
                                            {item.created_at}
                                        </td>
                                        <td className="w-55 truncate px-5 py-3">
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
                        <div className="md:hidden inline-flex flex-col gap-2 w-full">
                            {types.map(item => (
                                <div key={item.id} className="border-b border-gray-200 p-3 w-full flex justify-between h-22">
                                    <div className="mt-3">
                                        <p className="w-30 truncate">{item.name}</p>
                                        <p className="text-gray-500 w-40 truncate">{item.desc}</p>
                                    </div>

                                    <div className="flex flex-col h-6.75 gap-2">
                                        <ButtonEdit onEdit={() => handleEdit(item)} />
                                        <ButtonDelete onDelete={() => handleDelete(item.id)} />
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                )}

                {/* empty */}
                {types?.length === 0 && (
                    <EmptyData>
                        <ButtonCreate onOpenModal={handleOpenModal} />
                    </EmptyData>
                )}
            </section>
        </>
    );
}
