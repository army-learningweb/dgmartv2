import { Head, Link, useForm, router } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import FileUpload from "@/components/Admin/TableManager/FileUpload";
import Select from "@/components/ui/Select";
import MCEeditor from "@/components/Admin/MCEeditor/Editor";

import { ReadPostCategoriesType } from "@/types/module/post";
import { CreateProductType } from "@/types/module/products";

export default function Create({ post_categories }: ReadPostCategoriesType) {
    const { data, setData, post, errors, processing, clearErrors } = useForm<CreateProductType>({
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

    return (
        <>
            <Head title="Thêm mới sản phẩm" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <div className="mt-px text-lg font-medium tracking-tight flex gap-2">
                        <Link href="/admin/posts" className="text-gray-400 font-normal hover:underline">Danh sách sản phẩm</Link>/
                        <div>Thêm mới sản phẩm</div>
                    </div>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="mt-2">

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-[70%]">
                            <div className="md:mt-2">
                                
                            </div>

                            <div className="mt-2">
                                <div className="font-semibold mb-2">Nội dung chi tiết sản phẩm</div>
                                <MCEeditor value={data.content} onChange={(content) => setData("content", content)} />
                            </div>
                        </div>

                        <div className="md:flex-1 mt-2">
                            <div className="sticky top-5">
                                <div>
                                    <FileUpload onSetData={setData} error={errors.file} />
                                </div>

                                <div className="mt-2">
                                    <Select label="Danh mục sản phẩm" name="category_id" onChange={(e) => setData("category_id", e.target.value)} error={errors.category_id} showError={false}>
                                        <option value="">-Chọn danh mục sản phẩm-</option>
                                        {post_categories?.length > 0 && (
                                            post_categories.map(category => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                        )}
                                        {post_categories?.length === 0 && (
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