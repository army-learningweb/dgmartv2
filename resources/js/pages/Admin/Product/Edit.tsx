import { Head, Link, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";
import { useState } from "react";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";
import FileUpload from "@/components/Admin/File/FileUpload";
import FilesUpload from "@/components/Admin/File/FilesUpload";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";

import { EditProductType } from "@/types/module/products";
import { ReadEditProductType } from "@/types/module/products";

export default function Edit({product_categories, product, sub_media}: ReadEditProductType) {
    
    const { data, setData, post, errors, processing, clearErrors, reset } = useForm<EditProductType>({
        file: null,
        file_id: product.main_image?.object_id,
        files: null,
        files_id: sub_media ?? [],
        name: product.name,
        desc: product.desc,
        content: product.content,
        status: product.status,
        category_id: product.category_id,
        
    });
    
    const [filesReview, setFilesReview] = useState<any[]>(product.medias ?? []);
    
    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>,id:string) => {
        e.preventDefault();
        setData("files", filesReview.map(file => file.file));

        post(`/admin/products/${id}/update`, {
            preserveState: true,
            onSuccess: () => {
                toast.success("Cập nhật thành công");
                router.visit("/admin/products");
            },
        })
    }

    return (
        <>
            <Head title="Chỉnh sửa sản phẩm" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <SimpleBreadcrum prevRoute="/admin/products" prevPage="Danh sách sản phẩm" currentPage="Chỉnh sửa sản phẩm" />
                </div>

                {/* form */}
                <form onSubmit={(e) => handleSubmit(e,product.id)} className="mt-2">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 md:shrink-0">
                            <div className="mt-2">
                                <Input type="text" name="name" label="Tên sản phẩm" error={errors.name} value={data.name} onClearError={clearErrors} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                            </div>

                            <div className="mt-2">
                                <Textarea label="Mô tả ngắn" name="desc" error={errors.desc} className="h-20!" value={data.desc} onClearError={clearErrors} onChange={(e) => setData("desc", e.target.value)} />
                            </div>

                            <div className="mt-1">
                                <Select label="Danh mục sản phẩm" name="category_id" value={data.category_id} onClearError={clearErrors} onChange={(e) => setData("category_id", e.target.value)} error={errors.category_id}>
                                    <option value="">-Chọn danh mục sản phẩm-</option>
                                    {product_categories?.length > 0 && (
                                        product_categories.map(category => (
                                            <option key={category.id}                                               
                                                value={category.id} 
                                                disabled={category.parent_id == "0"} 
                                                className={`${category.parent_id == "0" ? 'font-medium text-black' : ''}`}>
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
                                <Select label="Trạng thái" name="status" value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Vô hiệu hóa</option>
                                </Select>
                            </div>

                            <div className="mt-2">
                                <div className="font-semibold mb-2">Mô tả chi tiết sản phẩm</div>
                                <MCEeditor value={data.content} onChange={(content) => setData("content", content)} typeImageContent="product" />
                            </div>
                        </div>

                        <div className="md:w-[30%] md:shrink-0 mt-2">
                            <FileUpload 
                                onSetData={setData} 
                                error={errors.file} 
                                onClearError={clearErrors}
                                file_url={product.main_image?.file_url}
                                file_name={product.main_image?.file_name} 
                            />
                                
                            <hr className="my-3 border-gray-100" />

                            <FilesUpload 
                                onSetData={setData}
                                setFilesReview={setFilesReview} 
                                filesReview={filesReview} 
                                errors={errors} 
                                onClearErrors={clearErrors}
                                subImageDataOrder={data.files_id}
                            />

                            <div className="mt-4 flex justify-end gap-2">
                                <Button type="button" size="small" animatePress={true} variant="secondary">
                                    <Link href="/admin/products">Quay về</Link>
                                </Button>
                                <Button size="small" processing={processing} processingLabel="Đang xử lí..." animatePress={true}>Cập nhật</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}