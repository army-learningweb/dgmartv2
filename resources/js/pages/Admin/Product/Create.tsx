import { Head, Link, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";
import axios from "axios";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";
import FileUpload from "@/components/Admin/TableManager/FileUpload";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";

import { ReadProductType } from "@/types/module/products";
import { useState } from "react";

export default function Create({ product_categories, types }: ReadProductType) {
    const { data, setData, post, errors, processing, clearErrors } = useForm({
        file: null,
        code: "",
        name: "",
        desc: "",
        qty_stock: "",
        content: "",
        price: "",
        disscount: "",
        status: "",
        category_id: ""
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/admin/products/store", {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                clearErrors();
                toast.success('Thêm mới thành công');
                router.visit(`/admin/products`);
            },
        })
    }

    // Lấy cấu hình
    const [dataConfigs,setDataConfigs] = useState(null)
    const handleGetConfigs = async (typeId: string) => {
        if(!typeId) return;
        try {
            const res = await axios.get(`/admin/products/${typeId}/getConfigs`);
        }catch (error) {
            toast.error("Lỗi, không thể lấy cấu hình !");
        }


}

return (
    <>
        <Head title="Thêm mới sản phẩm" />
        <section>
            {/* title */}
            <div className="flex items-center justify-between">
                <SimpleBreadcrum prevRoute="/admin/products" prevPage="Danh sách sản phẩm" currentPage="Thêm mới sản phẩm" />
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="mt-2">

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-[70%]">
                        <div className="mt-2">
                            <Input type="text" name="name" label="Tên sản phẩm" error={errors.name} showError={false} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                        </div>

                        <div className="md:mt-2">
                            <Textarea label="Mô tả ngắn" name="desc" error={errors.desc} className="h-20!" value={data.desc} onChange={(e) => setData("desc", e.target.value)} />
                        </div>

                        <div className="mt-2">
                            <Select onChange={(e) => handleGetConfigs(e.target.value)} name="optionTypes" label="Tùy chọn loại cấu hình cho sản phẩm">
                                <option value="">-Chọn loại cấu hình-</option>
                                {types?.length > 0 && (
                                    types.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))
                                )}
                                {types?.length === 0 && (
                                    <option value="">Hiện chưa có loại cấu hình nào !</option>
                                )}
                            </Select>
                        </div>

                        {/* <div className="mt-2">
                                <div className="font-semibold mb-2">Mô tả chi tiết sản phẩm</div>
                                <MCEeditor value={data.content} onChange={(content) => setData("content", content)} />
                            </div> */}

                    </div>

                    <div className="md:flex-1 mt-2">
                        <div className="sticky top-5">
                            <div>
                                <FileUpload onSetData={setData} error={errors.file} />
                            </div>

                            <div className="mt-2">
                                <Input type="text" name="code" label="Mã sản phẩm" error={errors.code} showError={false} value={data.code} onChange={(e) => setData('code', e.target.value)} autoComplete="on" />
                            </div>


                            <div className="mt-2">
                                <Select label="Danh mục sản phẩm" name="category_id" onChange={(e) => setData("category_id", e.target.value)} error={errors.category_id} showError={false}>
                                    <option value="">-Chọn danh mục sản phẩm-</option>
                                    {product_categories?.length > 0 && (
                                        product_categories.map(category => (
                                            <option key={category.id} value={category.id} disabled={category.parent_id == "0"} className={`${category.parent_id == "0" ? 'font-medium text-black' : ''}`}>
                                                {category.name}
                                            </option>
                                        ))
                                    )}
                                    {product_categories?.length === 0 && (
                                        <option value="">Hiện chưa có danh mục sản phẩm nào !</option>
                                    )}
                                </Select>
                            </div>

                            <div className="mt-2">
                                <Select label="Trạng thái" name="status" onChange={(e) => setData("status", e.target.value)}>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Vô hiệu hóa</option>
                                </Select>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <Button type="button" size="small" animatePress={true} variant="secondary">
                                    <Link href="/admin/products">Quay về</Link>
                                </Button>
                                <Button size="small" processing={processing} processingLabel="Đang xử lí..." animatePress={true}>Thêm mới</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    </>
)
}