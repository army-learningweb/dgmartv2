import { Head, useForm, router } from "@inertiajs/react"
import toast from "react-hot-toast";
import { useState, Fragment } from "react";
import { Cog } from 'lucide-react';
import axios from "axios";
import clsx from "clsx";

import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";
import ButtonBackLink from "@/components/Admin/TableManager/ButtonBackLink";
import Button from "@/components/ui/Button";
import { vndFormat } from "@/lib/currency_format";

import { CreateVariantDataType } from '@/types/module/product_variant';
import { CreateVariantType } from "@/types/module/product_variant";
import { ReadConfigType } from "@/types/module/product_variant";

export default function CreateVariant({ products, productConFigTypes }: CreateVariantDataType) {
    const { data, setData, post, errors, processing, clearErrors, } = useForm<CreateVariantType>({
        product_id: '',
        code: '',
        price: '',
        discount: '',
        qty: '',
        is_default: 'default',
        status: 'active',
        config_id : null
    });

    // Thêm
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const config_ids = configData.map(config => config.id);
        setData("config_id",config_ids);
        post("/admin/products/variants/store", {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Thêm mới thành công");
                router.visit("/admin/products/variants");
            },
        })
    }

    // get configs
    const [configs, setConfigs] = useState<ReadConfigType>({})
    const handleGetConfigs = async (typeId: string) => {
        if (!typeId) {
            setConfigs({});
            return;
        }
        try {
            const res = await axios.get(`/admin/products/variants/${typeId}/getConfigs`);
            const data = res.data;
            setConfigs(data)
        }
        catch (error) {
            toast.error("Lỗi không thể lấy cấu hình");
        }
    }

    //
    interface configDataState {
        group: string;
        id: number;
    }

    const [configData, setConfigData] = useState<configDataState[]>([]);
    const handleConfigData = (group: string, id: number) => {
        setConfigData(prev => {
            const existsConfig = prev.some(config => config.group === group);
            if(existsConfig){
                return prev.map(config => config.group === group ? {...config, id: id} : config);
            }else{
                return [...prev, {group, id}]
            }
        })
    }

    return (
        <>
            <Head title="Thêm cấu hình và biến thể" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <SimpleBreadcrum prevRoute="/admin/products/variants" prevPage="Cấu hình và biến thể" currentPage="Thêm cấu hình và biến thể" />
                </div>

                {/* form */}
                <form onSubmit={handleSubmit}>
                    <div className='flex gap-4'>
                        <div className="w-[31%]">
                            <div className="sticky top-5">
                                <div className='mt-2'>
                                    <Select
                                        label="Loại cấu hình"
                                        name="types"
                                        onChange={(e) => handleGetConfigs(e.target.value)}
                                    >
                                        <option value="">-Chọn loại cấu hình-</option>
                                        {productConFigTypes?.length > 0 && (
                                            productConFigTypes.map(type => (
                                                <option key={type.id} value={type.id}>{type.name}</option>
                                            ))
                                        )}
                                        {productConFigTypes?.length === 0 && (
                                            <option value="">Chưa có loại cấu hình nào</option>
                                        )}
                                    </Select>
                                </div>

                                <div className="mt-2">
                                    <Select
                                        onChange={(e) => setData('product_id', e.target.value)}
                                        label="Sản phẩm"
                                        name="product_id"
                                        error={errors.product_id}
                                        value={data.product_id}>
                                        <option value="">-Chọn sản phẩm-</option>

                                        {Object.values(products)?.length > 0 && (
                                            Object.entries(products).map(([group, productItems]) => (
                                                <Fragment key={group}>
                                                    <option value={group} className='font-medium text-black' disabled>{group}</option>
                                                    {productItems.map(product => (
                                                        <option key={product.id} value={product.id}>{product.name}</option>
                                                    ))}
                                                </Fragment>
                                            ))
                                        )}

                                        {Object.values(products)?.length == 0 && (
                                            <option value="">Chưa có sản phẩm nào</option>
                                        )}

                                    </Select>
                                </div>
                                <div className='mt-2'>
                                    <Select
                                        label="Vai trò cấu hình"
                                        name="is_default"
                                        value={data.is_default}
                                        onChange={(e) => setData('is_default', e.target.value as 'default' | 'variant',)}
                                    >
                                        <option value="default">Chọn làm mặc định</option>
                                        <option value="variant">Chọn làm biến thể</option>
                                    </Select>
                                </div>

                                <div className='mt-2'>
                                    <Input
                                        type="text"
                                        name="code"
                                        label="Mã"
                                        error={errors.code}
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        onBlur={() => clearErrors('code')} autoComplete="on" />
                                </div>
                                <div className='mt-2'>
                                    <Input
                                        type="text"
                                        name="qty"
                                        label="Số lượng"
                                        error={errors.qty}
                                        value={data.qty}
                                        onChange={(e) => setData('qty', e.target.value)}
                                        onBlur={() => clearErrors('qty')} autoComplete="on" />
                                </div>
                                <div className='mt-2'>
                                    <Input
                                        type="number"
                                        name="price"
                                        label="Giá máy cơ bản"
                                        error={errors.price}
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        onBlur={() => clearErrors('price')} autoComplete="on" />
                                </div>
                                <div className='mt-2'>
                                    <Input
                                        type="number"
                                        name="discount"
                                        label="Giảm giá %"
                                        error={errors.discount}
                                        value={data.discount}
                                        onChange={(e) => setData('discount', e.target.value)}
                                        onBlur={() => clearErrors('discount')} autoComplete="on" />
                                </div>

                                <div className="mt-4 flex justify-end gap-2">
                                    <ButtonBackLink route="/admin/products/variants" />

                                    <Button size="small" processing={processing} processingLabel="Đang xử lí..." animatePress={true}>
                                        Thêm mới
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className={clsx("border border-gray-100 bg-gray-100 mt-2 rounded-xl h-156 overflow-hidden overflow-y-auto", {
                                "flex items-center justify-center": Object.values(configs)?.length === 0,
                            })}>
                                {Object.values(configs)?.length > 0 && (
                                    <div className="h-full w-full p-1 rounded-lg">
                                        {Object.entries(configs).map(([group, configItems]) => (
                                            <div key={group} className="p-4 mb-1 rounded-lg border-b border-gray-200 bg-white shadow">
                                                <div className="my-4 text-blue-600 font-medium first-of-type:mt-0">{group.toUpperCase()}</div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {configItems.map(config => (
                                                        <label key={config.id} htmlFor={config.name} className="border border-gray-200 p-3 flex items-center gap-2 rounded-lg">
                                                            <input type="radio" name={group} id={config.name} value={config.id} onChange={() => handleConfigData(group, config.id)} />
                                                            <div className="flex items-center justify-between w-full">
                                                                <span className="w-50 truncate">{config.name}</span>
                                                                <span>{vndFormat(config.price_include)}</span>
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {Object.values(configs)?.length === 0 && (
                                    <div className="text-center font-medium text-gray-500 flex flex-col items-center justify-center gap-2">
                                        <div className="bg-gray-200 p-1.5 rounded-lg"><Cog size={25} /></div>
                                        <div>
                                            <p>Chưa chọn loại cấu hình</p>
                                            <p>Các cấu hình sản phẩm sẽ được hiển thị tại đây</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}