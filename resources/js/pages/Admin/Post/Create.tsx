import { Head, Link, useForm, router, usePage } from "@inertiajs/react"
import Textarea from "@/components/ui/Textarea"
import toast from "react-hot-toast";
import { TriangleAlert } from "lucide-react";

import Button from "@/components/ui/Button";
import FileUpload from "@/components/Admin/TableManager/FileUpload";
import Select from "@/components/ui/Select";

import { ReadPostCategoriesType } from "@/types/module/post";
import { CreatePostType } from "@/types/module/post";

export default function Create({post_categories, total} : ReadPostCategoriesType) {
    const { data, setData, post, errors, processing, reset, clearErrors, } = useForm<CreatePostType>({
        file: null,
        title: '',
        desc: '',
        content: '',
        status: 'active',
        category_id: '',
    });

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/admin/posts/store", {
            onSuccess: () => {
                reset();
                clearErrors();
                toast.success('Thêm mới thành công');

                let lastVisitPage = Math.round(Number(total) / 5);
                if(Number(total) % 2 != 0) lastVisitPage += 1;
                router.visit(`/admin/posts?page=${lastVisitPage}`);
            },
        })
    } 

    return (
           <>
            <Head title="Thêm mới bài viết" />
            <section>
                {/* title */}
                <div className="flex items-center justify-between">
                    <div className="mt-px text-lg font-medium tracking-tight flex gap-2">
                        <Link href="/admin/posts" className="text-gray-400 font-normal hover:underline">Danh sách bài viết</Link>/
                        <div>Thêm mới bài viết</div>
                    </div>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="mt-2">

                    {Object.keys(errors).length > 0 && (
                        <ul className="rounded-lg bg-red-50 p-4 text-red-700">
                            {Object.values(errors).map((error, index) => (
                                <li
                                    key={index}
                                    className="mt-1 flex items-center gap-2 first-of-type:mt-0"
                                >
                                    <TriangleAlert
                                        size={16}
                                        strokeWidth={1.7}
                                    />
                                    {error}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex gap-4">
                        <div className="w-[50%] mt-2 overflow-hidden">
                            <FileUpload onSetData={setData} error={errors.file}/>
                        </div>
                        <div className="flex-1">
                            <div className="mt-2">
                                <Textarea onChange={(e) => setData("title",e.target.value) } label="Tiêu đề" name="title" error={errors.title} showError={false} className="h-26.5!" />
                            </div>

                            <div className="mt-2">
                                <Textarea onChange={(e) => setData("desc",e.target.value)} label="Mô tả" name="desc" error={errors.title} showError={false} className="h-26.5!" />
                            </div>
                            
                            <div className="mt-2">
                                <Select label="Danh mục bài viết" name="category_id" onChange={(e) => setData("category_id",e.target.value)} error={errors.category_id} showError={false}>
                                    <option value="">-Chọn danh mục bài viết-</option>
                                    {post_categories?.length > 0 && (
                                        post_categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))
                                    )}
                                    {post_categories?.length === 0 && (
                                        <option value="">Hiện chưa có danh mục bài viết nào !</option>
                                    )}
                                </Select>
                            </div>

                            <div className="mt-2">
                                <Select label="Trạng thái" name="status" onChange={(e) => setData("status",e.target.value)}>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Vô hiệu hóa</option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <Textarea onChange={(e) => setData("content", e.target.value)} label="Nội dung bài viết" name="content" error={errors.content} showError={false} className="h-90!" />
                    </div>

                    <div className="mt-2 flex justify-end">
                        <Button processing={processing} processingLabel="Đang xử lí..." animatePress={true}>Thêm mới</Button>
                    </div>
                </form>
            </section>
        </>
    )
}