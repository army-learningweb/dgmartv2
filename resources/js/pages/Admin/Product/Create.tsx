import { Head, Link, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import { useEffect, useState } from "react";
import { Upload, Images } from "lucide-react"
import { motion } from "motion/react"

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";
import FileUpload from "@/components/Admin/TableManager/FileUpload";
import SimpleBreadcrum from "@/components/Admin/TableManager/SimpleBreadcrum";

import { ReadProductType } from "@/types/module/products";
import { CreateProductType } from "@/types/module/products";
import clsx from "clsx";

export default function Create({ product_categories }: ReadProductType) {
    const { data, setData, post, errors, processing, clearErrors } = useForm<CreateProductType>({
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
        post("/admin/products/store", {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                clearErrors();
                router.visit(`/admin/products`);
            },
        })
    }

    interface FilesProps {
        file_url: string;
        file_name: string;
        file_size: number;
        file_order: number;
    }

    const [filesReview, setFilesReview] = useState<FilesProps[]>([])
    const handleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files) {
            const filesArr = Array.from(files);
            if (filesArr.length > 4) {
                alert("Upload tối đã 4 ảnh");
                return
            }
            setFilesReview(prev => {

                const filesArrType: FilesProps[] = filesArr.map((file,index) => ({
                    file_url: URL.createObjectURL(file),
                    file_name: file.name,
                    file_size: file.size,
                    file_order: prev.length + index
                }))

                const reminingSlot = 4 - prev.length

                if (reminingSlot >= 1) {
                    const fileAlowed = filesArrType.slice(0, reminingSlot);
                    return [...prev, ...fileAlowed]
                }

                return [...prev, ...filesArrType]
            })
        }
    }

    useEffect(() => {
        return () => {
            if (filesReview.length > 0) {
                filesReview.map(file => URL.revokeObjectURL(file.file_url))
            }
        }
    }, [])

    // Thu hồi file
    const handleRemoveFile = (url: string) => {
        setFilesReview(prev => prev.filter(file => file.file_url != url))
        setFilesReview(prev => prev.map((file,index) => (
            {...file, file_order : index}
        )))
    }

    const [fileHover, setFileHover] = useState<string | null>(null)

    // Hover vào file
    const handleMouseEnterFile = (url: string) => {
        setFileHover(url);
    }

    // Out file
    const handleMouseLeaveFile = () => {
        setFileHover(null);
    }

    // Kéo file
    const handleDragFile = (e:any, file_order : number) => {
        e.dataTransfer.setData("file_order", file_order.toString());
    }

    // Thả file
    const handleDropFile = (e:any, file_order : number) => {
        const dragFileOrder = Number(e.dataTransfer.getData("file_order"));
        const dropFileOrder = Number(file_order);

        if(dragFileOrder === dropFileOrder) return;

        let configPositionFiles = [...filesReview];
        configPositionFiles.splice(dragFileOrder,1);

        const fileDrag = filesReview.filter(file => file.file_order === dragFileOrder)[0];     
        configPositionFiles.splice(dropFileOrder,0,fileDrag);

        const completePositionFiles = configPositionFiles.map((file,newIndex) => (
            {...file, file_order : newIndex}
        ))

        setFilesReview(completePositionFiles);
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

                            <div className="md:mt-2">
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
                                <MCEeditor value={data.content} onChange={(content) => setData("content", content)} />
                            </div>

                        </div>

                        <div className="md:w-[30%] md:shrink-0 mt-2">
                            <div className="sticky top-5">
                                <div>
                                    <FileUpload onSetData={setData} error={errors.file} />
                                </div>
                                
                                <hr className="my-3 border-gray-100"/>
                                
                                {filesReview.length < 4 && (
                                    <div className="font-medium mt-2 flex justify-between items-center">
                                    <label htmlFor="files" className="gap-1 active:translate-y-px transition-all duration-150 cursor-pointer flex items-center justify-center py-1 px-2 text-xs font-medium border border-gray-300 bg-white rounded-md ">
                                        <Upload size={12} />
                                        <div className="">Upload ảnh chi tiết (còn {4 - filesReview.length} lần)</div>
                                    </label>
                                    <input onChange={handleFilesUpload} multiple type="file" name="files" id="files" className="hidden" />
                                </div>
                                )}
                                

                                <div className="mt-2 h-fit border-gray-500 bg-gray-100 rounded-xl p-1 flex items-center">
                                    {filesReview?.length > 0 && (
                                        <div className="grid grid-cols-4 gap-1 w-full">
                                            {filesReview.map((file, index) => (
                                                <motion.div
                                                    layout
                                                    
                                                    draggable
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDragStart={(e) => handleDragFile(e,file.file_order)}
                                                    onDrop={(e) => handleDropFile(e,file.file_order)}

                                                    onMouseEnter={() => handleMouseEnterFile(file.file_url)} 
                                                    onMouseLeave={handleMouseLeaveFile}
                                                    key={file.file_url} className={clsx("bg-white shadow-sm w-21 h-20 border rounded-lg overflow-hidden", {
                                                        'border-gray-100': fileHover !== file.file_url,
                                                        'border-gray-400': fileHover === file.file_url
                                                    })}>

                                                    <img src={file.file_url} alt={file.file_name} className="w-full h-hull object-cover"/>
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

                                {filesReview?.length > 0 && (
                                    <div className="flex flex-col">
                                        {filesReview.map((file, index) => (
                                            <motion.div
                                                layout

                                                draggable
                                                onDragOver={(e) => e.preventDefault()}
                                                onDragStart={(e) => handleDragFile(e,file.file_order)}
                                                onDrop={(e) => handleDropFile(e,file.file_order)}
  
                                                onMouseEnter={() => handleMouseEnterFile(file.file_url)} 
                                                onMouseLeave={handleMouseLeaveFile}

                                                key={file.file_url}
                                                className={clsx("flex justify-between items-center gap-2 mt-2 rounded-lg py-1 px-2", {
                                                    'bg-gray-50': fileHover !== file.file_url,
                                                    'bg-gray-100': fileHover === file.file_url
                                                })}>
                                                <div className="py-1.75 text-black rounded-lg text-xs font-medium flex gap-1 items-center">
                                                    <div className="w-59 truncate">{file?.file_name}</div>
                                                    <div className="text-gray-500">({Math.round(file?.file_size / (1024 * 2))}MB)</div>
                                                </div>
                                                <div onClick={() => handleRemoveFile(file.file_url)} className="tracking-tight text-red-600 text-xs font-medium cursor-pointer">
                                                    Thu hồi
                                                </div>
                                            </motion.div>
                                        ))}
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