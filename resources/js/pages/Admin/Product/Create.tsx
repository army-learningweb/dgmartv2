import { Head, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";
import FileUpload from "@/components/Admin/UploadFile/FileUpload";
import FilesUpload from "@/components/Admin/UploadFile/FilesUpload";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";

import { ReadProductType } from "@/types/module/products";
import { CreateProductType } from "@/types/module/products";
import ButtonBackLink from "@/components/Admin/TableManager/ButtonBackLink";


export default function Create({ product_categories }: ReadProductType) {
    const { data, setData, post, errors, processing, clearErrors, reset } = useForm<CreateProductType>({
        file: null,
        files: null,
        name: "",
        desc: "",
        content: "",
        status: "",
        category_id: ""
    });

    const [filesReview, setFilesReview] = useState<any[]>([]);

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData("files", filesReview.map(file => file.file));
        post("/admin/products/store", {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success("Thêm mới thành công");
                router.visit("/admin/products");
            },
        })
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
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 md:shrink-0">
                            <div className="mt-2">
                                <Input type="text" name="name" label="Tên sản phẩm" error={errors.name} value={data.name} onBlur={() => clearErrors('name')} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                            </div>

                            <div className="mt-2">
                                <Textarea label="Mô tả ngắn" name="desc" error={errors.desc} className="h-20!" value={data.desc} onBlur={() => clearErrors('desc')} onChange={(e) => setData("desc", e.target.value)} />
                            </div>

                            <div className="mt-2">
                                <MCEeditor onBlur={() => clearErrors("content")} error={errors.content} value={data.content} onChange={(content) => setData("content", content)} typeImageContent="product" />
                            </div>
                        </div>

                        <div className="md:w-[30%] md:shrink-0 mt-2">
                            <div className="sticky top-5">
                                <div>
                                    <FileUpload
                                        onSetData={setData}
                                        onClearError={clearErrors}
                                        error={errors.file}
                                    />
                                </div>

                                <div className="mt-2">
                                    <FilesUpload
                                        onSetData={setData}
                                        setFilesReview={setFilesReview}
                                        filesReview={filesReview}
                                        errors={errors}
                                        onClearErrors={clearErrors}
                                    />
                                </div>

                                <div className="mt-2">
                                    <Select label="Danh mục sản phẩm" name="category_id" onBlur={() => clearErrors("category_id")} onChange={(e) => setData("category_id", e.target.value)} error={errors.category_id}>
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
                                    <ButtonBackLink route="/admin/products" />

                                    <Button size="small" processing={processing} processingLabel="Đang xử lí..." animatePress={true}>
                                        Thêm mới
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}