import { Head, useForm, router } from "@inertiajs/react"
import { Plus, Pen, Trash } from "lucide-react"
import React, { useState } from "react"
import toast from "react-hot-toast"
import Button from "@/components/ui/Button"
import FilterTab from "@/components/Admin/TableManager/FilterTab"
import ModalCreate from "@/components/Admin/Modal/ModalCreate"
import ModalEdit from "@/components/Admin/Modal/ModalEdit"
import Input from "@/components/ui/Input"
import EmptyData from "@/components/Admin/Empty/EmptyData"

import { ReadProductConfigTypeS } from "@/types/module/product_config_type"
import { CreateProductConfigTypeS } from "@/types/module/product_config_type"
import { EditProductConfigTypeS } from "@/types/module/product_config_type"
import { ConfigType } from "@/types/module/product_config_type"
import axios from "axios"

export default function ReadConfigType({ types, configs }: ReadProductConfigTypeS) {

    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateProductConfigTypeS>({
        id: '',
        name: '',
        desc: '',
        configs: []
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
    const handleOpenModalEdit = async(configType: EditProductConfigTypeS) => {
        try {
            const res = await axios.get(`/admin/products/configsTypes/${configType.id}/getConfigs`)
            setData({
                id: configType.id,
                name: configType.name,
                desc: configType.desc,
                configs: [...res.data]
            });
            setIdUpdate(configType.id);
            setOpenModalEdit(true);
        }
        catch (error) {
            toast.error("Lỗi chưa thể cập nhật loại này, vui lòng thử lại sau")
            setOpenModalEdit(false);
        }
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
        post('/admin/products/configsTypes/store', {
            preserveScroll: true,
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
        patch(`/admin/products/configs/${idUpdate}/update`, {
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

    // Check all group
    const handleCheckAll = (configTypes: ConfigType[], checked: boolean) => {
        const idConfigs = configTypes.map(item => item.id);
        setData("configs",
            checked
                ? [...new Set([...data.configs, ...idConfigs])]
                : data.configs.filter(id => !idConfigs.includes(id))
        );
    }

    return (
        <>
            <Head title="Danh sách loại cấu hình" />

            {/* Modal */}
            <ModalCreate
                onClose={handleCloseModalCreate}
                isOpen={openModalCreate}
                customSize="w-[90%] md:w-[60%] min-h-[40%]"
                title="Thêm loại cấu hình"
                labelSubmit="Thêm mới"
                formSubmitId="createConfigType"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createConfigType">
                    <div>
                        <Input type="text" name="name" label="Tên loại" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Laptop, Phụ kiện,...</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Cấu hình cho sản phẩm Laptop</p>
                    </div>

                    <div className="mt-2">
                        <div className="flex gap-2">
                            <span className="font-medium">Chọn cấu hình</span>
                            <span className="text-gray-500">(Loại này có cấu hình gì?)</span>
                            {errors.configs && (
                                <span className="text-red-600">{errors.configs}</span>
                            )}
                        </div>

                        {Object.keys(configs)?.length > 0 && (
                            <div className="mt-2 max-h-75 overflow-y-auto border-b border-gray-200">
                                {Object.entries(configs).map(([group, configTypes]) => (
                                    <div key={group} className="border border-gray-200 rounded-lg mb-2 pt-1 pb-2 px-3">
                                        <div className="mt-2 mb-4 w-fit py-1 rounded-lg flex gap-2 itemsc-enter">
                                            <input 
                                                onChange={(e) => handleCheckAll(configTypes, e.target.checked)} 
                                                type="checkbox" name="checkAll" id={group} value={group} 
                                                checked={configTypes.every(item => data.configs?.includes(item.id))}/>
                                            <label htmlFor={group} className="font-medium text-blue-600 select-none">{group}</label>
                                        </div>

                                        <div className="grid grid-cols-6 gap-y-4">
                                            {configTypes.map(item => (
                                                <div key={item.id} className="flex gap-2 items-center">
                                                    <div>
                                                        <input onChange={(e) => {
                                                            setData("configs", e.target.checked
                                                                ? [...data.configs, item.id]
                                                                : data.configs.filter(id => id !== item.id)
                                                            )
                                                        }}
                                                            checked={data.configs.includes(item.id)}
                                                            type="checkbox" name="configs" id={item.id} />
                                                    </div>
                                                    <label className="mb-0.75 select-none" htmlFor={item.id}>{item.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </ModalCreate>

            <ModalEdit
                onClose={handleCloseModalEdit}
                isOpen={openModalEdit}
                customSize="w-[90%] md:w-[60%] min-h-[40%]"
                title="Cập nhật cấu hình"
                labelSubmit="Cập nhật"
                formSubmitId="createConfigType"
                processing={processing}
            >
                <form onSubmit={handleEdit} id="createConfigType">
                    <div>
                        <Input type="text" name="name" label="Tên loại" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Laptop, Phụ kiện,...</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="desc" label="Mô tả" error={errors.desc} value={data.desc} onChange={(e) => setData('desc', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Cấu hình cho sản phẩm Laptop</p>
                    </div>

                    <div className="mt-2">
                        <div className="flex gap-2">
                            <span className="font-medium">Chọn cấu hình</span>
                            <span className="text-gray-500">(Loại này có cấu hình gì?)</span>
                            {errors.configs && (
                                <span className="text-red-600">{errors.configs}</span>
                            )}
                        </div>

                        {Object.keys(configs)?.length > 0 && (
                            <div className="mt-2 max-h-75 overflow-y-auto border-b border-gray-200">
                                {Object.entries(configs).map(([group, configTypes]) => (
                                    <div key={group} className="border border-gray-200 rounded-lg mb-2 pt-1 pb-2 px-3">
                                        <div className="mt-2 mb-4 w-fit py-1 rounded-lg flex gap-2 itemsc-enter">
                                            <input 
                                                onChange={(e) => handleCheckAll(configTypes, e.target.checked)} 
                                                type="checkbox" name="checkAll" id={group} value={group} 
                                                checked={configTypes.every(item => data.configs?.includes(item.id))}/>
                                            <label htmlFor={group} className="font-medium text-blue-600 select-none">{group}</label>
                                        </div>

                                        <div className="grid grid-cols-6 gap-y-4">
                                            {configTypes.map(item => (
                                                <div key={item.id} className="flex gap-2 items-center">
                                                    <div>
                                                        <input onChange={(e) => {
                                                            setData("configs", e.target.checked
                                                                ? [...data.configs, item.id]
                                                                : data.configs.filter(id => id !== item.id)
                                                            )
                                                        }}
                                                            checked={data.configs?.includes(item.id)}
                                                            type="checkbox" name="configs" id={item.id} />
                                                    </div>
                                                    <label className="mb-0.75 select-none" htmlFor={item.id}>{item.name}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </form>
            </ModalEdit>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium tracking-tight">
                        Danh sách loại cấu hình
                    </h1>
                    <Button
                        onClick={handleOpenModalCreate}
                        animatePress={true}
                        size="small"
                    >
                        <Plus size={15} />
                        <span>Thêm loại cấu hình</span>
                    </Button>
                </div>

                {/* stats */}
                <div className="mt-4 flex items-center justify-between">
                    {/* stats */}
                    <div className="hidden gap-1 rounded-xl bg-gray-100 p-1 tracking-tight md:grid md:grid-cols-1">
                        <FilterTab
                            isActive={true}
                            countData="0"
                            label="Tất cả"
                        />
                    </div>
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
                                {types.map(item => (
                                    <tr key={item.id} className="border-b border-gray-200 last-of-type:border-0">
                                        <td className="px-5 py-3 w-50 truncate">{item.name}</td>
                                        <td className="px-5 py-3 w-80 truncate">{item.desc}</td>
                                        <td className="px-5 py-3 w-55 truncate">{item.created_at}</td>
                                        <td className="px-5 py-3 w-55 truncate">{item.updated_at}</td>
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
            </section>
        </>
    )
}