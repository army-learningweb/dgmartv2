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

import { ReadConfigType } from "@/types/module/product_variant";
import { EditVariantDataType } from "@/types/module/product_variant";
import { EditVariantType } from "@/types/module/product_variant";

export default function EditVariant({ products, productConFigTypes, variant, dataConfig, configChecked }: EditVariantDataType) {

    const { data, setData, patch, errors, processing, clearErrors, } = useForm<EditVariantType>({
        product_id: variant.product_id,
        type_id: variant.type_id,
        code: variant.code,
        price: variant.price,
        discount: variant.discount ?? '',
        qty: variant.qty ?? '',
        is_default: variant.is_default,
        config_id: [],
        
    });

    // Cập nhật
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>, id:string|number) => {
        e.preventDefault();
        const config_ids = configData.map(config => config.id);
        setData("config_id", config_ids);
        patch(`/admin/products/variants/${id}/update`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Cập nhật thành công");
                router.visit("/admin/products/variants");
            },
        })
    }

    // get configs
    const [configs, setConfigs] = useState<ReadConfigType>(dataConfig ?? {})
    const handleGetConfigs = async (typeId: string | number) => {
        if (!typeId) {
            setConfigs({});
            return;
        }
        try {
            const res = await axios.get(`/admin/products/variants/${typeId}/getConfigs`);
            const data = res.data;
            setConfigs(data)
            setData('type_id', typeId);
        } catch (error) {
            toast.error("Lỗi không thể lấy cấu hình !");
        }
    }

    // checked configs
    interface configDataState {
        group: string;
        id: string | number;
    }

    const prevDataChecked = configChecked.map(item => {
        return {
            group: item.group.name,
            id: item.id
        }
    })

    const [configData, setConfigData] = useState<configDataState[]>(prevDataChecked ?? []);
    const handleConfigData = (group: string, id: number) => {
        setConfigData(prev => {
            const existsConfig = prev.some(config => config.group === group);
            if (existsConfig) {
                return prev.map(config => config.group === group ? { ...config, id: id } : config);
            } else {
                return [...prev, { group, id }]
            }
        })
    }

    return (
        <>
            <Head title="Chỉnh sửa cấu hình và biến thể" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <SimpleBreadcrum
                        prevRoute="/admin/products/variants"
                        prevPage="Cấu hình & biến thể"
                        currentPage="Chỉnh sửa"
                    />
                </div>

                {/* form */}
                <form onSubmit={(e) => handleSubmit(e, variant.id)}>
                    <div className="flex flex-col gap-7 md:flex-row">
                        <div className="order-2 md:order-1 md:w-[31%]">
                            <div className="sticky top-8">
                                {/* type config */}
                                <div className="mt-2 hidden md:block">
                                    <Select
                                        label="Loại cấu hình"
                                        name="types"
                                        onChange={(e) =>
                                            handleGetConfigs(e.target.value)
                                        }
                                        onBlur={() => clearErrors('config_id')}
                                        defaultValue={data.type_id ?? ''}
                                        className={clsx('', {
                                            'border-red-600 ring-3 ring-red-600/20 focus:border-red-600 focus:ring-red-600/20':
                                                errors.config_id,
                                            'focus:border-gray-400/70 focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50':
                                                !errors.config_id,
                                        })}
                                    >
                                        <option value="">
                                            -Chọn loại cấu hình-
                                        </option>
                                        {productConFigTypes?.length > 0 &&
                                            productConFigTypes.map((type) => (
                                                <option
                                                    key={type.id}
                                                    value={type.id}
                                                >
                                                    {type.name}
                                                </option>
                                            ))}
                                        {productConFigTypes?.length === 0 && (
                                            <option value="">
                                                Chưa có loại cấu hình nào
                                            </option>
                                        )}
                                    </Select>

                                    {errors.config_id && (
                                        <div className="mt-2 text-red-600">
                                            {errors.config_id}
                                        </div>
                                    )}
                                </div>

                                {/* product */}
                                <div className="md:mt-2">
                                    <Select
                                        onChange={(e) =>
                                            setData(
                                                'product_id',
                                                e.target.value,
                                            )
                                        }
                                        onBlur={() => clearErrors('product_id')}
                                        label="Sản phẩm"
                                        name="product_id"
                                        error={errors.product_id}
                                        value={data.product_id ?? ''}
                                        disabled={true}
                                        className="cursor-not-allowed bg-red-600/20"
                                    >
                                        <option value="">
                                            -Chọn sản phẩm-
                                        </option>

                                        {Object.values(products)?.length > 0 &&
                                            Object.entries(products).map(
                                                ([group, productItems]) => (
                                                    <Fragment key={group}>
                                                        <option
                                                            value={group}
                                                            className="font-medium text-black"
                                                            disabled
                                                        >
                                                            {group}
                                                        </option>
                                                        {productItems.map(
                                                            (product) => (
                                                                <option
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    value={
                                                                        product.id
                                                                    }
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </option>
                                                            ),
                                                        )}
                                                    </Fragment>
                                                ),
                                            )}

                                        {Object.values(products)?.length ==
                                            0 && (
                                            <option value="">
                                                Chưa có sản phẩm nào
                                            </option>
                                        )}
                                    </Select>
                                </div>

                                {/* role */}
                                <div className="mt-2">
                                    <Select
                                        label="Vai trò cấu hình"
                                        name="is_default"
                                        value={data.is_default}
                                        onChange={(e) =>
                                            setData(
                                                'is_default',
                                                e.target.value as
                                                    'default' | 'variant',
                                            )
                                        }
                                        onBlur={() => clearErrors('is_default')}
                                        className={clsx('', {
                                            'border-red-600 ring-3 ring-red-600/20 focus:border-red-600 focus:ring-red-600/20':
                                                errors.is_default ||
                                                Object.values(errors)[0],
                                            'focus:border-gray-400/70 focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50':
                                                !errors.is_default ||
                                                Object.values(errors)[0],
                                        })}
                                    >
                                        <option value="">
                                            -Chọn vai trò cấu hình-
                                        </option>
                                        <option value="default">
                                            Chọn làm mặc định
                                        </option>
                                        <option value="variant">
                                            Chọn làm biến thể
                                        </option>
                                    </Select>
                                </div>

                                {/* code */}
                                <div className="mt-2">
                                    <Input
                                        type="text"
                                        name="code"
                                        label="Mã"
                                        placeholder="DG#123"
                                        error={errors.code}
                                        value={data.code}
                                        onChange={(e) =>
                                            setData('code', e.target.value)
                                        }
                                        onBlur={() => clearErrors('code')}
                                        autoComplete="on"
                                    />
                                </div>

                                {/* qty */}
                                <div className="mt-2">
                                    <Input
                                        type="text"
                                        name="qty"
                                        label="Số lượng"
                                        error={errors.qty}
                                        value={data.qty}
                                        onChange={(e) =>
                                            setData('qty', e.target.value)
                                        }
                                        onBlur={() => clearErrors('qty')}
                                        autoComplete="on"
                                    />
                                </div>

                                {/* price */}
                                <div className="mt-2">
                                    <Input
                                        type="number"
                                        name="price"
                                        label="Giá"
                                        error={errors.price}
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        onBlur={() => clearErrors('price')}
                                        autoComplete="on"
                                    />
                                </div>

                                {/* sales_off */}
                                <div className="mt-2">
                                    <Input
                                        type="number"
                                        name="discount"
                                        label="Giảm giá %"
                                        error={errors.discount}
                                        value={data.discount}
                                        onChange={(e) =>
                                            setData('discount', e.target.value)
                                        }
                                        onBlur={() => clearErrors('discount')}
                                        autoComplete="on"
                                    />
                                </div>
                                
                                {/* button */}
                                <div className="mt-4 flex justify-end gap-2">
                                    <ButtonBackLink route="/admin/products/variants" />

                                    <Button
                                        size="small"
                                        processing={processing}
                                        processingLabel="Đang xử lí..."
                                        animatePress={true}
                                    >
                                        Cập nhật
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* configs */}
                        <div className="flex-1 md:mt-7 order-1 md:order-2">
                            <div className="mt-2">
                                <Select
                                    label="Loại cấu hình"
                                    name="types"
                                    onChange={(e) =>
                                        handleGetConfigs(e.target.value)
                                    }
                                    onBlur={() => clearErrors('config_id')}
                                    defaultValue={data.type_id ?? ''}
                                    className={clsx('', {
                                        'border-red-600 ring-3 ring-red-600/20 focus:border-red-600 focus:ring-red-600/20':
                                            errors.config_id,
                                        'focus:border-gray-400/70 focus:ring-3 focus:ring-gray-300/70 focus:ring-offset-blue-50':
                                            !errors.config_id,
                                    })}
                                >
                                    <option value="">
                                        -Chọn loại cấu hình-
                                    </option>
                                    {productConFigTypes?.length > 0 &&
                                        productConFigTypes.map((type) => (
                                            <option
                                                key={type.id}
                                                value={type.id}
                                            >
                                                {type.name}
                                            </option>
                                        ))}
                                    {productConFigTypes?.length === 0 && (
                                        <option value="">
                                            Chưa có loại cấu hình nào
                                        </option>
                                    )}
                                </Select>

                                {errors.config_id && (
                                    <div className="mt-2 text-red-600">
                                        {errors.config_id}
                                    </div>
                                )}
                            </div>

                            {Object.values(configs)?.length > 0 && (
                                <div className="mt-1.5 h-full w-full rounded-lg">
                                    {Object.entries(configs).map(
                                        ([group, configItems]) => (
                                            <div key={group} className="mb-5">
                                                <div className="rounded-lg border border-gray-100 bg-gray-100 p-2 font-medium first-of-type:mt-0">
                                                    {group.toUpperCase()}
                                                </div>
                                                <div className="my-4 grid grid-cols-2 gap-2">
                                                    {configItems.map(
                                                        (config) => (
                                                            <label
                                                                key={config.id}
                                                                htmlFor={
                                                                    config.name
                                                                }
                                                                className={clsx(
                                                                    'flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-2 hover:border-gray-400',
                                                                    {
                                                                        'border-gray-400':
                                                                            configData.some(
                                                                                (
                                                                                    item,
                                                                                ) =>
                                                                                    item.id ===
                                                                                    config.id,
                                                                            ),
                                                                    },
                                                                )}
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    name={group}
                                                                    id={
                                                                        config.name
                                                                    }
                                                                    value={
                                                                        config.id
                                                                    }
                                                                    onChange={() =>
                                                                        handleConfigData(
                                                                            group,
                                                                            config.id,
                                                                        )
                                                                    }
                                                                    checked={configData.some(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item.id ===
                                                                            config.id,
                                                                    )}
                                                                />
                                                                <div className="mb-0.5 w-85 truncate">
                                                                    {
                                                                        config.name
                                                                    }
                                                                </div>
                                                            </label>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            {Object.values(configs)?.length === 0 && (
                                <div className="flex h-150 flex-col items-center justify-center gap-2 text-center font-medium text-gray-500">
                                    <div className="rounded-lg bg-gray-200 p-1.5">
                                        <Cog size={25} />
                                    </div>
                                    <div>
                                        <p>Chưa chọn loại cấu hình</p>
                                        <p>
                                            Các cấu hình sản phẩm sẽ được hiển
                                            thị tại đây
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
}