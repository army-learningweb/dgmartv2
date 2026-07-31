import { Head, useForm, router } from "@inertiajs/react"
import { Plus, Pen, Trash } from "lucide-react"
import React, { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Fragment } from "react"
import { vndFormat } from "@/lib/currency_format"
import clsx from "clsx"

import Button from "@/components/ui/Button"
import FilterTab from "@/components/Admin/TableManager/FilterTab"
import ModalCreate from "@/components/Admin/Modal/ModalCreate"
import ModalEdit from "@/components/Admin/Modal/ModalEdit"
import Input from "@/components/ui/Input"
import EmptyData from "@/components/Admin/Empty/EmptyData"

import { CreateProductConfigType, EditProductConfigType } from "@/types/module/product_config"
import { ReadProductConfigType } from "@/types/module/product_config"

export default function ReadConfig({ configs, total }: ReadProductConfigType) {
    const { data, setData, post, patch, errors, processing, reset, clearErrors, } = useForm<CreateProductConfigType>({
        id: '',
        name: '',
        price_include: '',
        group: ''
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
    const handleOpenModalEdit = (config: EditProductConfigType) => {
        setData({
            id: config.id,
            name: config.name,
            price_include: config.price_include ?? '',
            group: config.group,
        });
        setIdUpdate(config.id);
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
        post('/admin/products/configs/store', {
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

    // Nút tạo nhanh
    const [isOpenQuickCreate, setIsOpenQuickCreate] = useState<boolean>(false);
    useEffect(() => {
        const handleOpenQuickCreate = (e: Event) => {
            const scrollY = window.scrollY;
            if (scrollY >= 200) {
                setIsOpenQuickCreate(true)
            } else {
                setIsOpenQuickCreate(false)
            }
        }

        window.addEventListener("scroll", handleOpenQuickCreate);
        return () => window.removeEventListener("scroll", handleOpenQuickCreate);
    }, [])

    return (
        <>
            <Head title="Danh sách cấu hình" />

            {/* Modal */}
            <ModalCreate
                onClose={handleCloseModalCreate}
                isOpen={openModalCreate}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title="Thêm mới cấu hình"
                labelSubmit="Thêm mới"
                formSubmitId="createConfig"
                processing={processing}
            >
                <form onSubmit={handleCreate} id="createConfig">
                    <div>
                        <Input type="text" name="group" label="Nhóm cấu hình" error={errors.group} value={data.group} onChange={(e) => setData('group', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: RAM, CPU,... (Dùng để nhóm các cấu hình cùng loại)</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="name" label="Cấu hình" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: 8GB, Đỏ, GTX-5060,...</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="number" name="price_include" label="Giá đi kèm" error={errors.price_include} value={data.price_include} onChange={(e) => setData('price_include', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Để trống nếu không có</p>
                    </div>
                </form>
            </ModalCreate>

            {/* Modal */}
            <ModalEdit
                onClose={handleCloseModalEdit}
                isOpen={openModalEdit}
                customSize="w-[90%] md:w-[30%] min-h-[40%]"
                title="Cập nhật cấu hình"
                labelSubmit="Cập nhật"
                formSubmitId="editConfigs"
                processing={processing}
            >
                <form onSubmit={handleEdit} id="editConfigs">
                    <div>
                        <Input type="text" name="group" label="Nhóm cấu hình" error={errors.group} value={data.group} onChange={(e) => setData('group', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: RAM, CPU,... (Dùng để nhóm các cấu hình cùng loại)</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="text" name="name" label="Cấu hình" error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: 8GB, Đỏ, GTX-5060,...</p>
                    </div>

                    <div className='mt-2'>
                        <Input type="number" name="price_include" label="Giá đi kèm" error={errors.price_include} value={data.price_include} onChange={(e) => setData('price_include', e.target.value)} autoComplete="on" />
                        <p className='mt-1 text-gray-500'>VD: Để trống nếu không có</p>
                    </div>
                </form>
            </ModalEdit>

            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <h1 className="mt-px text-lg font-medium tracking-tight">
                        Danh sách cấu hình
                    </h1>
                    <Button
                        onClick={handleOpenModalCreate}
                        animatePress={true}
                        size="small"
                    >
                        <Plus size={15} />
                        <span>Thêm mới cấu hình</span>
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

                {/* quick create */}
                <div onClick={handleOpenModalCreate}
                    className={clsx("fixed right-5 top-5 md:right-10 md:top-5 bg-blue-600 text-white h-10 w-10 rounded-xl flex items-center justify-center cursor-pointer hover:brightness-110 active:translate-y-0.5 transition-all duration-150 ease-out", {
                        "opacity-0 scale-95": !isOpenQuickCreate,
                        "opacity-100 scale-100": isOpenQuickCreate
                    })}>
                    <Plus size={18} />
                </div>

                {/* data */}
                {configs && (
                    <div className="mt-4 pb-2 h-full overflow-hidden rounded-xl border border-gray-200">
                        {/* desktop */}
                        <table className="hidden w-full md:table">
                            <thead className="border-b border-gray-200 bg-gray-100 font-medium text-gray-800">
                                <tr>
                                    <td className="px-5 py-2">Nhóm & cấu hình</td>
                                    <td className="px-5 py-2">Giá đi kèm</td>
                                    <td className="px-5 py-2">Ngày tạo</td>
                                    <td className="px-5 py-2">Cập nhật</td>
                                    <td className="px-5 py-2">Tùy chỉnh</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(configs).map(([group, items]) => (
                                    <Fragment key={group}>
                                        <tr className='font-semibold'>
                                            <td className='py-4 px-3'>
                                                <div className='bg-blue-50 text-blue-700 p-0.75 px-2 rounded-md w-fit'>{group.toUpperCase()}</div>
                                            </td>
                                        </tr>
                                        {items.map(item => (
                                            <tr key={item.id} className='border-b border-gray-200 last-of-type:border-0 '>
                                                <td className='px-5 py-2 w-60 truncate'>{item.name}</td>
                                                <td className='px-5 py-2 w-65 truncate'>
                                                    {item.price_include !== null && (
                                                        vndFormat(Number(item.price_include))
                                                    )}

                                                    {item.price_include === null && (
                                                        <>------------</>
                                                    )}
                                                </td>
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
                            {Object.entries(configs).map(([group, items]) => (
                                <Fragment key={group}>
                                    <div className='px-2 py-1 bg-blue-50 text-blue-700 rounded-md my-3 first:mt-0 font-medium w-fit'>{group.toUpperCase()}</div>
                                    {items.map(item => (
                                        <div key={item.id} className='px-1 mt-3 flex justify-between border-b border-gray-200 h-20'>
                                            <div className='mt-3'>
                                                <div className='w-30 truncate'>{item.name}</div>
                                                <div className='text-gray-500 w-30 truncate'>
                                                    {item.price_include !== null && (
                                                        vndFormat(Number(item.price_include))
                                                    )}

                                                    {item.price_include === null && (
                                                        <>-----------</>
                                                    )}
                                                </div>
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
                {Object.entries(configs)?.length === 0 && (
                    <EmptyData>
                        <Button
                            onClick={handleOpenModalCreate}
                            animatePress={true}
                            size="small"
                        >
                            <Plus size={15} />
                            <span>Thêm mới cấu hình</span>
                        </Button>
                    </EmptyData>
                )}
            </section>
        </>
    )
}