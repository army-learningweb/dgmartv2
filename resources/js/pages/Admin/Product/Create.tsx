import { Head, Link, useForm } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import { useEffect, useState } from "react";
import { Upload, Images } from "lucide-react"
import { motion } from "motion/react"

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";
import FileUpload from "@/components/Admin/File/FileUpload";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";

import { ReadProductType } from "@/types/module/products";
import { CreateProductType } from "@/types/module/products";
import clsx from "clsx";
import toast from "react-hot-toast";

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

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setData("files" , filesReview.map(file => file.file));
        post("/admin/products/store",{
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                clearErrors();
                toast.success("Thêm mới thành công");
                reset();
            },
        })
    }

    const [filesReview, setFilesReview] = useState<any[]>([]);

    // Upload file review
    const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if(files){
            const filesArr = Array.from(files);
            if(filesArr?.length > 4) return alert("Upload tối đa 4 ảnh")
            setFilesReview(prev => {
                const convertFiles = filesArr.map(file => ({
                    file: file,
                    id: Date.now() + Math.random(),
                    name: file.name,
                    url: URL.createObjectURL(file),
                    size: file.size,
                }))
                const remaningFiles = 4 - prev.length
                if(remaningFiles >= 1){
                    const allowedFile = convertFiles.slice(0,remaningFiles);
                    return [...prev, ...allowedFile];
                }
                return [...prev, ...convertFiles];
            })
        }
    }

    // Thu hồi file
    const handleRemoveFile = (url: string) => {
        setFilesReview(prev => prev.filter(file => file.url != url))
    }

    // Drag file
    const handleDrag = (e:any, order : number) => {
        e.dataTransfer.setData("order" , order.toString());
    }

    // Drop file
    const handleDrop = (e:any, order : number) => {
        const DragOrder = e.dataTransfer.getData("order");
        const DropOrder = order;
        if(DragOrder === DropOrder) return;

        const tempFilesReview = [...filesReview];
        const [moveFile] = tempFilesReview.splice(DragOrder,1);
        tempFilesReview.splice(DropOrder,0,moveFile);

        setFilesReview(tempFilesReview)
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
                        <div className="flex-1 md:shrink-0">
                            <div className="mt-2">
                                <Input type="text" name="name" label="Tên sản phẩm" error={errors.name} showError={false} value={data.name} onChange={(e) => setData('name', e.target.value)} autoComplete="on" />
                            </div>

                            <div className="mt-2">
                                <Textarea label="Mô tả ngắn" name="desc" error={errors.desc} className="h-20!" value={data.desc} onChange={(e) => setData("desc", e.target.value)} />
                            </div>

                            <div className="mt-1">
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

                            <div className="mt-2">
                                <div className="font-semibold mb-2">Mô tả chi tiết sản phẩm</div>
                                <MCEeditor value={data.content} onChange={(content) => setData("content", content)} typeImageContent="product"/>
                            </div>
                        </div>

                        <div className="md:w-[30%] md:shrink-0 mt-2">
                            <div className="sticky top-5">
                                <FileUpload onSetData={setData} error={errors.file} />
                                
                                <hr className="my-3 border-gray-100"/>
                                
                                {/* img review */}
                                <div className="mt-2 h-fit border-gray-500 bg-gray-100 rounded-xl p-1 flex items-center">
                                    {filesReview?.length > 0 && (
                                        <div className="grid grid-cols-4 gap-1 w-full">
                                            {filesReview.map((file, index) => (
                                                <motion.div draggable layout drag
                                                    onDragOver={(e) => e.preventDefault()}  
                                                    onDragStart={(e) => handleDrag(e,index)}
                                                    onDrop={(e) => handleDrop(e,index)}
                                                    key={file.id} className={clsx("bg-white shadow-sm w-21 h-20 rounded-lg overflow-hidden", {
                                                        
                                                    })}>
                                                    <img src={file.url} alt={file.name} className="w-full h-hull object-cover"/>
                                                </motion.div>
                                            ))}

                                            {Array.from({ length: 4 - filesReview.length }).map((item,index) => (
                                                <div key={index} className={`w-21 h-20 flex items-center justify-center gap-1.25 bg-gray-200 rounded-lg`}>
                                                    <Images size={18} className="text-gray-500" />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {filesReview?.length === 0 && (
                                        <div className="grid grid-cols-4 gap-1 w-full">
                                            {Array.from({ length: 4 }).map((item,index) => (
                                                <div key={index} className="w-21 h-20 flex gap-1 items-center justify-center bg-gray-200 rounded-lg">
                                                    <Images size={18} className="text-gray-500" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                
                                {/* remove review */}
                                {filesReview?.length > 0 && (
                                    <div className="flex flex-col">
                                        {filesReview.map((file, index) => (
                                            <motion.div layout 
                                                key={file.id} 
                                                className={clsx("flex justify-between items-center gap-2 mt-2 rounded-lg py-1 px-2", {

                                                })}>
                                                <div className="w-70 truncate py-1.75 text-black rounded-lg text-xs font-medium flex gap-1 items-center">
                                                    {file.name}
                                                </div>
                                                <div onClick={() => handleRemoveFile(file.url)} className="tracking-tight text-red-600 text-xs font-medium cursor-pointer">
                                                    Thu hồi
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* upload button */}
                                {filesReview?.length < 4 && (
                                    <div className="font-medium mt-2 flex justify-between items-center">
                                        <label htmlFor="files" className="gap-1 active:translate-y-px transition-all duration-150 cursor-pointer flex items-center justify-center py-1 px-2 text-xs font-medium border border-gray-300 bg-white rounded-md ">
                                            <Upload size={12} />
                                            <div className="">Upload ảnh chi tiết</div>
                                        </label>
                                        <input onChange={handleFilesUpload} multiple type="file" name="files" id="files" className="hidden" />
                                    </div>
                                )}

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